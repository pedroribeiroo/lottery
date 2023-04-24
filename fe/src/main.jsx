import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import UserProvider from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <div className="bg-[#0E0D30] w-screen h-screen">
        <App />
      </div>
    </UserProvider>
  </React.StrictMode>
);
