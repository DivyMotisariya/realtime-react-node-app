import { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import { socket } from "../global/Header";

const PlaceOrder = () => {
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
    data = data.map((food) => {
      food.order = 0;
      return food;
    });
    setFoodData(data);
  };

  const sendOrder = (_id) => {
    let orderDetails = foodData.filter((food) => food._id === _id)[0];
    console.log(orderDetails);

    socket.emit("putOrder", orderDetails);
    let temp = foodData.map((food) => {
      food.order = 0;
      return food;
    });
    setFoodData(temp);
  };

  const changeQuantity = (evt, _id) => {
    let { value } = evt.target;
    value = parseInt(value);

    if (value < 0) value = 0;

    let temp = foodData.map((food) => {
      if (food._id === _id) food.order = parseInt(value);
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
            onChange={(evt) => changeQuantity(evt, food._id)}
            value={food.order}
            type="number"
            placeholder="Quantity"
          ></input>
        </td>
        <td>
          <Button onClick={() => sendOrder(food._id)}>Order</Button>
        </td>
      </tr>
    ));

  return (
    <Container>
      <h2 className="h2Class">Order Menu</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>{getFoodData()}</tbody>
      </Table>
    </Container>
  );
};

export default PlaceOrder;
