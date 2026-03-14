import React from "react";
import { useLocation } from "react-router";
import SalaryChart from "./SalaryChart";
import CityMap from "./CityMap";

const Dashboard = () => {
  const { state } = useLocation();
  const data = state?.data;
  return (
    <div>
      <h1>Audit Image</h1>
      <img src={state?.image} alt="merged result" width={500} height={375} />
      <SalaryChart data={data} />
      <CityMap data={data} />
    </div>
  );
};

export default Dashboard;
