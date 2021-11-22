import React, { useEffect, useState } from "react";
import { socket } from "../global/Header";
import { Button, Container, Table } from "reactstrap";

const Kitchen = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    socket.emit("initialData");
    socket.on("getData", getData);
    socket.on("changeData", changeData);

    return () => {
      socket.off("getData");
      socket.off("changeData");
    };
  }, []);

  const getData = (data) => {
    console.log(data);
    setFoodData(data);
  };

  const changeData = () => socket.emit("initialData");

  const markDone = (id) => socket.emit("markDone", id);

  const getFoodData = () =>
    foodData.map((food) => (
      <tr key={food._id}>
        <td>{food.name}</td>
        <td>{food.ordQty}</td>
        <td>{food.prodQty}</td>
        <td>{food.predQty}</td>
        <td>
          <Button onClick={() => markDone(food._id)}>Done</Button>
        </td>
      </tr>
    ));

  return (
    <Container>
      <h2 className="h2Class">Kitchen Area</h2>
      <Table striped id="table-to-xls">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Created Till Now</th>
            <th>Predicted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{getFoodData()}</tbody>
      </Table>
    </Container>
  );
};

export default Kitchen;
