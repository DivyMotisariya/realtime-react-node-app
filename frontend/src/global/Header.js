import React from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./header.css";

export const Header = () => {
  return (
    <header>
      <nav>
        <ul className="NavClass">
          <li>
            <NavLink exact to="/">
              Place Order
            </NavLink>
          </li>
          <li>
            <NavLink to="/updatepredicted">Change Predicted</NavLink>
          </li>
          <li>
            <NavLink to="/kitchen">Kitchen</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export const socket = socketIOClient("http://localhost:8000");
