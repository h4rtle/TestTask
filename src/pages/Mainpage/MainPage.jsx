import React, { useState } from "react";
import LineGraph from "../../components/LineGraph";
import Filter from "../../components/Filter";

const MainPage = () => {
  const [filterTypes, setFilterTypes] = useState({
    warning: false,
    critical: false,
    info: false,
  }); // массив с обЪектом

  return (
    <>
      <h2>Текущая загрузка процессора</h2>
      <LineGraph />

      <h2>Таблица 30-ти последних событий</h2>
      <Filter filterTypes={filterTypes} setFilterTypes={setFilterTypes} />
    </>
  );
};

export default MainPage;
