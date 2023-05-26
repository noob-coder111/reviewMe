import React, { useState, useEffect } from "react";
import { Placeholder } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import admin from "./admin.module.css";
import Button from "react-bootstrap/Button";

const AdminPortal = ({ restaurantData }) => {
  const [user, setUser] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [enableEdit, setEnableEdit] = useState(false);
  const [enableAdd, setEnableAdd] = useState(false);
  const [adminName, setAdminName] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [adminPassword, setAdminPassword] = useState();
  const [restaurantName, setRestaurantName] = useState();
  const [restaurantAddress, setRestaurantAddress] = useState();
  const [restaurantRating, setRestaurantRating] = useState();
  const navigate = useNavigate();
  const url = "https://fake-api-bitcs-task-5.herokuapp.com";

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchdata = async () => {
      await fetch(`${url}/users`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        });
    };
    fetchdata();
  }, []);

  const handleUserDelete = async (i) => {
    setUser([...user.slice(0, i), ...user.slice(i + 1, user.length)]);
    var userID = user[i].id;
    await fetch(`${url}/users/${userID}`, {
      method: "DELETE",
    });
  };
  const handleRestaurantDelete = async (i) => {
    // setRestaurantData([
    //   ...restaurantData.slice(0, i),
    //   ...restaurantData.slice(i + 1, restaurantData.length),
    // ]);
    var userID = restaurantData[i].id;
    await fetch(`${url}/restaurants/${userID}`, {
      method: "DELETE",
    });
    window.location.reload();
  };
  const handleEdit = () => {
    if (!adminName || !adminEmail || !adminPassword) {
      alert("Please Fill all the details");
    } else {
      fetch(`${url}/users/${userData.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userData.accessToken}`,
        },
        body: JSON.stringify({
          name: `${adminName}`,
          email: `${adminEmail}`,
          password: `${adminPassword}`,
        }),
      }).then((response) => response.json());
      navigate("/");
    }
    window.location.reload();
  };

  const addRestaurant = () => {
    if (!restaurantName || !restaurantAddress || !restaurantRating) {
      alert("Please Fill all the Details");
    } else {
      fetch(`${url}/restaurants`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: `${restaurantName}`,
          address: `${restaurantAddress}`,
          avgrating: `${restaurantRating}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);

          alert("New Restaurant added successfully!");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
      setEnableAdd(false);
    }
  };

  return (
    <div>
      <Button
        variant="success"
        className={admin.logoutbtn}
        onClick={handleLogout}
      >
        LogOut
      </Button>
      {!enableEdit ? (
        <div>
          <p>{`Admin: ${userData.user.name}`}</p>
          <p>{`Email: ${userData.user.email}`}</p>
          <button onClick={() => setEnableEdit(true)}>Edit Profile</button>
        </div>
      ) : (
        <div>
          New Name :
          <input
            onChange={(e) => setAdminName(e.target.value)}
            placeholder="Enter New Name"
          />{" "}
          <br />
          New Email :
          <input
            onChange={(e) => setAdminEmail(e.target.value)}
            placeholder="Enter New Email"
          />{" "}
          <br />
          New Password :
          <input
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter New Password"
          />
          <br />
          <button onClick={handleEdit}>Save Changes</button>
          <button onClick={() => setEnableEdit(false)}>Cancel</button>
        </div>
      )}
      <div className={admin.container}>
        <div className={admin.card}>
          <h1>Users</h1>
          {user.map((val, i) => {
            return (
              <li key={i}>
                <p>{`User Name : ${val.name}`}</p>
                <p>{`User Email : ${val.email}`}</p>
                <button onClick={() => handleUserDelete(i)}>Remove user</button>
              </li>
            );
          })}
        </div>
        <div className={admin.card}>
          {!enableAdd ? (
            <button onClick={() => setEnableAdd(true)}>Add Restaurant</button>
          ) : (
            <div>
              <button onClick={addRestaurant}>Save Restaurant</button>
              <br />
              Enter Restaurant Name :
              <input
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Restaurant Name :"
              />{" "}
              <br />
              Enter Address :
              <input
                onChange={(e) => setRestaurantAddress(e.target.value)}
                placeholder="Address :"
              />{" "}
              <br />
              Enter Ratings(/5) :
              <input
                onChange={(e) => setRestaurantRating(e.target.value)}
                placeholder="Ratings :"
              />
              <br />
            </div>
          )}
          <h1>Restaurants</h1>
          {restaurantData.map((restaurant, i) => {
            return (
              <li key={i}>
                <p>{`Restaurant Name : ${restaurant.name}`}</p>
                <p>{`Adresss : ${restaurant.address}`}</p>
                <p>{`Average Rating : ${restaurant.avgrating}`}</p>
                <button onClick={() => handleRestaurantDelete(i)}>
                  Remove Restaurant
                </button>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
