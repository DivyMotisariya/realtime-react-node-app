require("dotenv").config();

const db = require("./config");
let foodItem = db.model("FoodItems", {
  name: {
    type: String,
  },
  predQty: {
    type: Number,
  },
  prodQty: {
    type: Number,
  },
  ordQty: {
    type: Number,
  },
});
// const foodItem = db.get("FoodItems");

let { PORT, HOST } = process.env;
PORT = PORT || 8000;
HOST = HOST || "localhost";

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIO(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("New Client Connected", socket.id);

  socket.on("initialData", async () => {
    try {
      let data = await foodItem.find();
      io.sockets.emit("getData", data);
    } catch (error) {
      io.sockets.emit("error", error.message);
    }
  });

  socket.on("putOrder", async (order) => {
    try {
      let { _id, order } = order;
      let data = await foodItem.findOneAndUpdate(
        { _id },
        { $inc: { ordQty: order } },
        { new: true }
      );
      io.sockets.emit("changedData", data);
      socket.emit("changedData", data);
    } catch (error) {
      io.sockets.emit("error", error.message);
    }
  });

  socket.on("markDone", async (_id) => {
    try {
      let data = await foodItem.updateOne(
        { _id },
        { $inc: { ordQty: -1, prodQty: 1 } },
        { new: true }
      );
      io.sockets.emit("changedData", data);
    } catch (error) {
      io.sockets.emit("error", error.message);
    }
  });

  socket.on("changePred", async (order) => {
    try {
      let { _id, predQty } = order;
      let data = await foodItem.updateOne(
        { _id },
        { $set: { predQty } },
        { new: true }
      );
      io.sockets.emit("changedData", data);
    } catch (error) {
      io.sockets.emit("error", error.message);
    }
  });

  socket.on("diconnect", () => console.log("Client Disconnected"));
});

app.get("/", (req, res) =>
  res.status(200).json({ status: true, message: "API ON" })
);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  return next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
server.listen(PORT, () =>
  console.log(`Server started on http://${HOST}:${PORT}`)
);
