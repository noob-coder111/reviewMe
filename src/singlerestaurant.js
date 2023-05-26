import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CDBContainer, CDBRating } from "cdbreact";
import { Button } from "react-bootstrap";
import singlerestaurant from "./singlerestaurant.module.css";

const SingleRestaurant = () => {
  const { id } = useParams();
  const [isEdit, setisEdit] = useState(false);
  const [starValue, setStarValue] = useState(0);
  const [singleRestaurant, setSingleRestaurant] = useState([]);
  const [comments, setComments] = useState([]);
  const url = `https://fake-api-bitcs-task-5.herokuapp.com`;
  const userData = JSON.parse(window.localStorage.getItem("userData"));

  // console.log(userData.user.email);

  const handleValue = (event) => {
    fetch(`${url}/feedbacks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        restaurantname: `${singleRestaurant.name}`,
        comment: `${event.target[0].value}`,
        rating: `${starValue}`,
        useremail: `${userData.user.email}`,
        id: `${singleRestaurant.name}+${userData.user.email}`,
        userID: `${userData.user.id}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
    
  };

  const handleEdit = (event) => {
    fetch(`${url}/feedbacks/${singleRestaurant.name}+${userData.user.email}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${userData.accessToken}`,
      },
      body: JSON.stringify({
        comment: `${event.target[0].value}`,
        rating: `${starValue}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
    
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${url}/restaurants/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSingleRestaurant(data);
          fetch(`${url}/feedbacks?restaurantname=${data.name}`)
            .then((res) => res.json())
            .then((newcomment) => {
              setComments(newcomment);
            });
        });
    };
    fetchData();
  }, []);

  var stars = [];
  for (var i = 0; i < singleRestaurant.avgrating; i++) {
    stars.push(
      <i
        className="fa fa-star"
        style={{ color: "gold", marginRight: "10px" }}
      ></i>
    );
  }

  const jsonHasKeyVal = (json, keyname, value) =>
    Object.keys(json).some((key) =>
      typeof json[key] === "object"
        ? jsonHasKeyVal(json[key], keyname, value)
        : key === keyname && json[key] === value
    );

  return (
    <div className={singlerestaurant.card}>
      <h1>{singleRestaurant.name}</h1>
      <h5>Address: {singleRestaurant.address}</h5>
      {/* <h5>Average Rating: {singleRestaurant.avgrating} <i className="fa fa-star" style={{color:'yellow'}}></i></h5> */}
      <div className={singlerestaurant.rating}>{stars}</div>
      <div>
        <div>
          {!jsonHasKeyVal(comments, "useremail", `${userData.user.email}`) ? (
            <div className={singlerestaurant.comment}>
              <p>Please Write your Review by Clicking the Stars</p>
              <CDBContainer>
                <CDBRating
                  feedback
                  data={[
                    { tooltip: "Worst" },
                    { tooltip: "Poor" },
                    { tooltip: "Average" },
                    { tooltip: "Good" },
                    { tooltip: "Excellent" },
                  ]}
                  fillClassName={singlerestaurant.redText}
                  getValue={(value) => setStarValue(value.value)}
                  submitHandler={handleValue}
                />
              </CDBContainer>
            </div>
          ) : (
            ""
          )}
        </div>
        {comments.map((feed, i) => {
          return (
            <li key={i}>
              <div className={singlerestaurant.comment}>
                {isEdit && feed.useremail === userData.user.email ? (
                  <CDBContainer>
                    <CDBRating
                      feedback
                      data={[
                        { tooltip: "Worst" },
                        { tooltip: "Poor" },
                        { tooltip: "Average" },
                        { tooltip: "Good" },
                        { tooltip: "Excellent" },
                      ]}
                      fillClassName={singlerestaurant.redText}
                      getValue={(value) => setStarValue(value.value)}
                      submitHandler={handleEdit}
                    />
                  </CDBContainer>
                ) : (
                  <div>
                    <p>{`By: ${feed.useremail}`}</p>
                    <p>{`Comment: ${feed.comment}`}</p>
                    <p>
                      {`Ratings: ${feed.rating}/5`}
                      <i
                        className="fa fa-star"
                        style={{ color: "gold", marginRight: "10px" }}
                      ></i>
                    </p>
                  </div>
                )}
              </div>
              {feed.useremail === userData.user.email ? (
                <Button
                  variant="success"
                  onClick={() => {
                    setisEdit(true);
                  }}
                >
                  Edit your Review
                </Button>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default SingleRestaurant;
