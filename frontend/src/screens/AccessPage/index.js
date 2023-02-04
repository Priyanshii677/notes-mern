import axios from "axios";
import React, { useEffect, useState } from "react";
import s from "./AccessPage.module.scss";
import Loader from "../../components/Loader.js";
import ErrorMessage from "../../components/ErrorMessage.js";
const AccessPage = () => {
  const [page, setPage] = useState("loginPage");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimrPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [picture, setPicture] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (page === "createPage") {
      document.getElementById("left1").style.display = "none";
      document.getElementById("right1").style.display = "none";
      document.getElementById("left2").style.display = "flex";
      document.getElementById("right2").style.display = "flex";
    }
    if (page === "loginPage") {
      document.getElementById("left2").style.display = "none";
      document.getElementById("right2").style.display = "none";
      document.getElementById("left1").style.display = "flex";
      document.getElementById("right1").style.display = "flex";
    }
  }, [page]);

  //   useEffect(() => {
  //     const userInfo = localStorage.getItem("userInfo");
  //     if (userInfo) {
  //       history.push("/mynotes");
  //     }
  //   }, [history]);

  const signInHandler = async (e) => {
    console.log("hiiiiii");
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoader(true);

      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data, "ppp");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoader(false);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (password != confimrPassword) {
      setMessage("passwords do not match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoader(true);
        const { data } = await axios.post("/api/users", {
          name,
          email,
          password,
        });
        setLoader(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (err) {
        console.log(err.response.data.message, "error in signup");
        setError(err.response.data.message);
      }
    }
  };
  return (
    <div>
      <div className={s.container}>
        <div className={s.mainContainer}>
          <div className={s.leftContainer1} id='left1'>
            <h1>Welcome Back!</h1>
            <div>
              If you are already a member please login with your personal info
            </div>
            <button
              onClick={() => {
                setPage("createPage");
              }}
            >
              SIGN IN
            </button>
          </div>
          <div className={s.leftContainer2} id='left2'>
            <h1>Sign In</h1>
            <input
              type='email'
              placeholder='Email'
              value={signInEmail}
              onChange={(e) => {
                setSignInEmail(e.target.value);
              }}
            />
            <input
              type='password'
              placeholder='Password'
              value={signInPassword}
              onChange={(e) => {
                setSignInPassword(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                signInHandler(e);
              }}
            >
              SIGN IN
            </button>
          </div>
          <div className={s.rightContainer1} id='right1'>
            <h1>Create Account</h1>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type='text'
              placeholder='Confirm Password'
              value={confimrPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {/* <input type='file' id='img' name='img' accept='image/*' /> */}
            <button
              onClick={(e) => {
                signUpHandler(e);
              }}
            >
              {" "}
              Sign Up
            </button>
          </div>
          <div className={s.rightContainer2} id='right2'>
            <h1>Hello, Friend!</h1>
            <div>
              Enter your personal details and start journey with us and write
              all your feelings in Notebook
            </div>
            <button
              onClick={() => {
                setPage("loginPage");
              }}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
