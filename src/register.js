import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";

const Register = (props) => {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [logEmail, setLogEmail] = useState();
  const [logPassword, setLogPassword] = useState("");
  const [logError, setlogError] = useState("");
  const url = "https://fake-api-bitcs-task-5.herokuapp.com";

  const handleLogin = () => {
    if (!logEmail || !logPassword) {
      setlogError("Please Fill all the Details");
    } else {
      fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: `${logEmail}`,
          password: `${logPassword}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          props.handleCallback(true)
          var obj = JSON.stringify(data);
          window.localStorage.setItem("userData", obj);
          if (obj.includes("Incorrect") || obj.includes("Cannot")) {
            setlogError(data);
          } else if (data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/main");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const handleRegister = async () => {
    if (!regName || !regEmail || !regPassword) {
      setlogError("Please Fill all the Details");
    } else {
      fetch(`${url}/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: `${regName}`,
          email: `${regEmail}`,
          password: `${regPassword}`,
          role: `user`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          var obj = JSON.stringify(data);
          if (obj.includes("Email")) {
            setlogError(data);
          } else {
            alert("New user signed up successfully");
            setAccountState("login");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const navigate = useNavigate();

  const [accountState, setAccountState] = useState("signup");
  return (
    <div className={styles.box}>
      {accountState === "signup" ? (
        <div className={styles.content1}>
          <div className={styles.heading}>Create Account</div>
          <div className={styles.input}>
            <div className={styles.title}>Name</div>
            <input
              className={styles.inputbox}
              placeholder="Enter your Name"
              type="text"
              onChange={(e) => {
                setRegName(e.target.value);
              }}
              required={true}
            />
          </div>
          <div className={styles.input}>
            <div className={styles.title}>Email</div>
            <input
              className={styles.inputbox}
              placeholder="Enter Email"
              type="text"
              onChange={(e) => {
                setRegEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles.input}>
            <div className={styles.title}>Password</div>
            <input
              className={styles.inputbox}
              placeholder="Enter a password"
              type="password"
              onChange={(e) => {
                setRegPassword(e.target.value);
              }}
            />
          </div>
          <div style={{ color: "red", fontWeight: 500 }}>
            &nbsp;&nbsp;{logError}
          </div>
          <button className={styles.sign} onClick={handleRegister}>
            Sign Up
          </button>
          <div className={styles.existing}>
            Already have an account?
            <>
              <div>
                <button
                  className={styles.loginsignup}
                  onClick={() => {
                    setAccountState("login");
                  }}
                >
                  Login
                </button>
              </div>
            </>
          </div>
        </div>
      ) : (
        <div className={styles.content2}>
          <div className={styles.heading}>Login to your account</div>
          <div className={styles.input}>
            <div className={styles.title}>Email</div>
            <input
              className={styles.inputbox}
              placeholder="Enter Email"
              type="text"
              onChange={(e) => {
                setLogEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles.input}>
            <div className={styles.title}>Password</div>
            <input
              className={styles.inputbox}
              placeholder="Enter your password"
              type="password"
              onChange={(e) => {
                setLogPassword(e.target.value);
              }}
            />
          </div>

          <div style={{ color: "red", fontWeight: 500 }}>
            &nbsp;&nbsp;{logError}
          </div>
          <div className={styles.input}>
            <button className={styles.sign} onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className={styles.existing}>
            New to MyApp?
            <>
              <div>
                <button
                  className={styles.loginsignup}
                  onClick={() => {
                    setAccountState("signup");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </>
          </div>
        </div>
      )}
      {/* <LoginContext.Provider value={{ loggedIn,setLoggedIn }}>
        {children}
      </LoginContext.Provider> */}
    </div>
  );
};

export default Register;
