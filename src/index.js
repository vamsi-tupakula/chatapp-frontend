import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinPage from "./components/JoinPage";
import Home from "./components/Home";
import { io } from "socket.io-client";

const socket = io("https://chat-backend-drxn.onrender.com");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<JoinPage socket={socket} />} />
        <Route path="/chat" element={<Home socket={socket} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
