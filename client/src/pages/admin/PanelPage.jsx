import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const PanelPage = () => {
  const [aggregateUsers, setAggregateUsers] = useState([]);
  const getAggregateUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/getall", {
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res.data);
        setAggregateUsers(res.data.aggregateUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAggregateUsers();
  }, []);

  const state = {
    options: {
      chart: {
        id: "users-bar",
      },
      xaxis: {
        categories: aggregateUsers.map((user) => user._id.date),
      },
    },
    series: [
      {
        name: "Новых пользователей",
        data: aggregateUsers.map((user) => user.count),
      },
    ],
  };

  return (
    <div className="container">
      <h1 className="text-center text-lg text-purple-700">
        Панель администратора
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-lg text-center mx-auto">
            График новых пользователей
          </span>
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="400"
          />
        </div>
      </div>
    </div>
  );
};

export default PanelPage;
