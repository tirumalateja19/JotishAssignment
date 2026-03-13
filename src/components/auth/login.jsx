import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getLocalStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setLoggedUser } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const SubmitHandler = (e) => {
    e.preventDefault();
    const { admin } = getLocalStorage();

    const validUser = admin.find(
      (a) => a.Username === user && a.Password === password,
    );
    if (validUser) {
      setLoggedUser(validUser);
      localStorage.setItem("loggedUser", JSON.stringify(validUser));
      navigate("/details");
    } else {
      alert("Invalid Username or Password");
    }

    setUser("");
    setPassword("");
  };

  return (
    <div className="bg-black w-full h-screen flex  items-center justify-center ">
      <form
        onSubmit={(e) => {
          SubmitHandler(e);
        }}
      >
        <div className="flex flex-col gap-10 border-2 border-emerald-700 p-15 rounded-2xl w-[24vw]">
          <input
            required
            value={user}
            type="text"
            onChange={(e) => {
              setUser(e.target.value);
            }}
            placeholder="Enter your Username"
            className="outline-none bg-transparent border-2 border-emerald-300 text-white px-6 py-3 rounded-full shadow-xl "
          ></input>
          <input
            required
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your Password"
            className="outline-none bg-transparent border-2 border-emerald-300 text-white px-6 py-3  rounded-full shadow-xl"
          ></input>
          <button
            type="submit"
            className="mt-1.5 px-6 py-2 font-semibold bg-emerald-300 shadow-sm shadow-gray-100 rounded-lg cursor-pointer hover:bg-emerald-500"
          >
            LogIn
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
