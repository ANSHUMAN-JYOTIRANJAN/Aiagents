import React, { useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import currentUser from "./features/currentUser";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/user.slice";
import api from "./utils/axios";
import { googleProvider, auth } from "./utils/firebase";
// const api = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URI || "http://localhost:9000",
//   withCredentials: true,
// });

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      const data = await currentUser();
      if (data) {
        dispatch(setUserData(data));
      }
    };
    getUser();
  }, []);
  return (
    <>
      <Home>Home</Home>
    </>
  );
}

export default App;
