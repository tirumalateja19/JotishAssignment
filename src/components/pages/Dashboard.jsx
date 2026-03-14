import React from "react";
import { useLocation } from "react-router";
import SalaryChart from "./SalaryChart";
import CityMap from "./CityMap";

const Dashboard = () => {
  const { state } = useLocation();
  const data = state?.data;
  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Employee Insights Dashboard
      </h1>
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">
            Salary Distribution by City
          </h2>
          <SalaryChart data={data} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Employee City Locations</h2>
          <CityMap data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
