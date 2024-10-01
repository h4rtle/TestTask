import React from "react";
import "./shared/normalize.css";
import "./shared/main.css";
import RouteFroApp from "./app/routes/route";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter basename="">
      <RouteFroApp />
    </BrowserRouter>
  );
};

export default App;
