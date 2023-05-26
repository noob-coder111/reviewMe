import React from "react";
import { useNavigate } from "react-router-dom";
import restaurantlist from './restaurantlist.module.css';

const RestaurantList = ({ restaurantData }) => {
  const navigate = useNavigate();
  const handleShow = () => {
    navigate(`restaurant/${restaurantData.id}`);
  };
  return (
    <div className={restaurantlist.card} >
      <h3>{restaurantData.name}</h3>
      <p>{restaurantData.address}</p>
      <p>{restaurantData.rating}</p>
      <p>{restaurantData.id}</p>
      <button className={restaurantlist.showbtn} onClick={handleShow}>show</button>
    </div>
  );
};

export default RestaurantList;
