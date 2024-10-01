import { Route, Routes } from "react-router-dom";
import React from "react";
import MainPage from "../../pages/Mainpage/MainPage";
import InteractionsPage from "../../pages/InteractionsPage/InteractionsPage";
import Layout from "../../pages/components/Layout";
const RouteForApp = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="interactions" element={<InteractionsPage />} />
      </Route>
    </Routes>
  );
};

export default RouteForApp;
