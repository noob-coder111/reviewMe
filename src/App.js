import "./App.css";
import Register from "./register";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, Navigate } from "react";
import RestaurantList from "./restaurantlist";
import SingleRestaurant from "./singlerestaurant";
import AdminPortal from "./adminportal";
import Authenticate from "./Authenticate";
import NotFound from "./404";

function App() {
  const [restaurantData, setRestaurantData] = useState([]);
  const url = "https://fake-api-bitcs-task-5.herokuapp.com/restaurants";
  const [callback, setCallback] = useState(false);
  const loggedIn =
    window.localStorage.getItem("userData") || callback ? true : false;
  console.log(loggedIn);

  useEffect(() => {
    const fetchdata = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setRestaurantData(data);
        });
    };
    fetchdata();
  }, []);

  const handleCallback = (status) => {
    setCallback(true);
    console.log(status);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Register handleCallback={handleCallback} />}
        />
        <Route
          path="/register"
          element={<Register handleCallback={handleCallback} />}
        />

        <Route
          path="/admin"
          element={
            <Authenticate loggedIn={loggedIn}>
              {" "}
              <AdminPortal restaurantData={restaurantData} />
            </Authenticate>
          }
        />
        <Route
          path="/main"
          element={
            <Authenticate loggedIn={loggedIn}>
              <Main restaurantData={restaurantData} />
            </Authenticate>
          }
        />
        <Route
          path="/main/restaurant/:id"
          element={
            <Authenticate loggedIn={loggedIn}>
              <SingleRestaurant />
            </Authenticate>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
