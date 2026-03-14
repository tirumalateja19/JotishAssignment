import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const itemHeight = 50;
const windowHeight = 500;
const overscan = 10;

const List = () => {
  const [data, setData] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

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
    navigate(`/details/${id}`, { state: { data } });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data.length) return <div>No data available.</div>;

  const numberOfItems = data.length;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);

  let renderedNodesCount = Math.floor(windowHeight / itemHeight) + 2 * overscan;

  renderedNodesCount = Math.min(numberOfItems - startIndex, renderedNodesCount);

  const visibleRows = [];

  for (let i = 0; i < renderedNodesCount; i++) {
    const index = startIndex + i;
    const emp = data[index];

    visibleRows.push(
      <div
        key={emp[3]}
        className="p-5 grid grid-cols-7 border-b py-2 text-sm"
        style={{ height: itemHeight }}
      >
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
      </div>,
    );
  }

  return (
    <div className="p-10">
      <div className="flex items-end justify-end">
        <button
          onClick={handleLogout}
          className="cursor-pointer p-2 rounded-sm bg-red-600 text-black font-bold"
        >
          Logout
        </button>
      </div>
      <h1 className="font-semibold text-3xl text-center pb-5">
        Custom Virtualized List
      </h1>
      <div
        className="overflow-y-scroll border"
        style={{ height: windowHeight }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        <div
          style={{
            height: numberOfItems * itemHeight,
            position: "relative",
          }}
        >
          <div
            style={{
              transform: `translateY(${startIndex * itemHeight}px)`,
            }}
          >
            {visibleRows}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
