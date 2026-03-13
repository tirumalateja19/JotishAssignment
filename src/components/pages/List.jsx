import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const List = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const URL = "https://backend.jotish.in/backend_dev/gettabledata.php";

  const fetchData = async () => {
    try {
      const res = await axios.post(URL, {
        username: "test",
        password: "123456",
      });

      setData(res.data.TABLE_DATA.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch data.");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDetails = (id) => {
    console.log(id);
    navigate(`/details/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data || data.length === 0) return <div>No data available.</div>;

  return (
    <div>
      <div className="p-10">
        {data.map((emp) => (
          <div key={emp[3]} className="grid grid-cols-7 border-b py-2 text-sm">
            <span>{emp[0]}</span>
            <span>{emp[1]}</span>
            <span>{emp[2]}</span>
            <span>{emp[3]}</span>
            <span>{emp[4]}</span>
            <span>{emp[5]}</span>
            <button
              className="cursor-pointer py-2 bg-amber-200 text-black font-bold"
              onClick={() => handleDetails(emp[3])}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
