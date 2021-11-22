import "./App.css";
import { Header } from "./global/Header";

import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import PlaceOrder from "./main/PlaceOrder";
import UpdatePredicted from "./main/UpdatePredicted";
import Kitchen from "./main/Kitchen";

const App = () =>
  useRoutes([
    { path: "/", element: <PlaceOrder /> },
    { path: "/updatepredicted", element: <UpdatePredicted /> },
    { path: "/kitchen", element: <Kitchen /> },
  ]);

function AppWrapper() {
  return (
    <div className="App">
      <Router>
        <Header />
        <App />
      </Router>
    </div>
  );
}

export default AppWrapper;
