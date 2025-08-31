import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./pages/App.jsx";
import Toys from "./pages/Toys.jsx";
import Swaps from "./pages/Swaps.jsx";
import Users from "./pages/Users.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {window.location.pathname !== "/" && (
        <nav
          style={{
            display: "flex",
            gap: 12,
            padding: 20,
            borderBottom: "1px solid #ddd",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/toys">Toys</Link>
          <Link to="/swaps">Swaps</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<Users />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/swaps" element={<Swaps />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
