import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import React, { useEffect, useState } from "react";
import { getNumberForGraph } from "../api/requests";

Chart.register(...registerables);

const LineGraph = () => {
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 31 }, (_, i) => i.toString()), // Генерируем массив меток для оси x от 0 до 30
    datasets: [
      {
        label: "Данные",
        data: [],
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 1,
        fill: true,
        pointBackgroundColor: "rgba(255, 0, 0, 1)",
      },
    ],
  });

  const chartOptions = {
    maintainAspectRatio: false,
    animation: false,
    updateMode: "none",
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 30,
        title: {
          display: true,
          text: "Время, сек",
        },
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Значение, %",
        },
      },
    },
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const data = await getNumberForGraph(); // Присваиваем данные в переменную
      if (data && data.cpu_usage !== undefined) {
        setChartData((prevChartData) => {
          const newData = [...prevChartData.datasets[0].data, data.cpu_usage]; // Присваиваем данные в новый массив
          if (newData.length > 30) {
            newData.shift();
          } // Если массив данных больше 30, то удаляет первое
          return {
            ...prevChartData,
            datasets: [
              {
                ...prevChartData.datasets[0],
                data: newData,
              },
            ],
          }; // Обновляет данные массива на основе предыдущих
        });
      } else {
        alert(
          "Не удалось получить данные с сервера. Пожалуйста, проверьте соединение."
        );
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="line-graph">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineGraph;
