import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import RestaurantList from "./restaurantlist";
import mainModule from "./main.module.css";

const Main = ({ restaurantData }) => {
  let restaurantContent;
  const [isLoading, setIsLoading] = useState(true);
  const [isFilter, setIsFilter] = useState("");
  const navigate = useNavigate();

  const handleSortName = () => {
    setIsFilter("sortname");
    restaurantData.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    console.log(restaurantData);
  };

  const handleSortRating = () => {
    setIsFilter("sortrating");
    restaurantData.sort(function (a, b) {
      return a.avgrating.localeCompare(b.avgrating);
    });
    console.log(restaurantData);
  };

  if (restaurantData.length > 0) {
    restaurantContent = restaurantData.map((restaurantData) => (
      <RestaurantList key={restaurantData.id} restaurantData={restaurantData} />
    ));
  }

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <div className={mainModule.headerBtn}>
        <Dropdown>
          <div className={mainModule.filterBtn}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>
          </div>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleSortName}>Sort By Name</Dropdown.Item>
            <Dropdown.Item onClick={handleSortRating}>
              Sort By Ratings
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="success" onClick={handleLogout}>
          LogOut
        </Button>
      </div>
      <div>{restaurantContent}</div>
    </div>
  );
};

export default Main;
