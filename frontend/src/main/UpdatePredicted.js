import { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import { socket } from "../global/Header";

const UpdatePredicted = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    socket.emit("initialData");
    socket.on("getData", getData);

    return () => {
      socket.off("getData", getData);
    };
  }, []);

  const getData = (data) => {
    console.log(data);
    setFoodData(data);
  };

  const sendPredQty = (_id) => {
    let orderDetails = foodData.filter((food) => food._id === _id)[0];
    console.log(orderDetails);

    socket.emit("changePred", orderDetails);
  };

  const changePredQuantity = (evt, _id) => {
    let { value } = evt.target;
    value = parseInt(value);

    if (value < 0) value = 0;

    let temp = foodData.map((food) => {
      if (food._id === _id) food.predQty = parseInt(value);
      return food;
    });

    setFoodData(temp);
  };

  const getFoodData = () =>
    foodData.map((food) => (
      <tr key={food._id}>
        <td>{food.name}</td>
        <td>
          <input
            onChange={(evt) => changePredQuantity(evt, food._id)}
            value={food.predQty}
            type="number"
            placeholder="Quantity"
            min="0"
          ></input>
        </td>
        <td>
          <Button onClick={() => sendPredQty(food._id)}>Update Qty</Button>
        </td>
      </tr>
    ));

  return (
    <Container>
      <h2 className="h2Class">Update Predicted</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Product</th>
            <th>Predicted Qty</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>{getFoodData()}</tbody>
      </Table>
    </Container>
  );
};

export default UpdatePredicted;
