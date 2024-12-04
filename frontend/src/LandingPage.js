import React, { useState, useEffect } from "react";
import "./index.css";
import Footer from "./shared/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Landing() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [phase, setPhase] = useState("typing");
  const [allMessagesDisplayed, setAllMessagesDisplayed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateofBirth] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const messages = ["Take Control,", "Get Organized,", "Let's Do!"];

  useEffect(() => {
    let timer;

    if (phase === "typing") {
      const typingDuration = messages[messageIndex].length * 150;
      timer = setTimeout(() => setPhase("stay"), typingDuration);
    } else if (phase === "stay") {
      timer = setTimeout(() => setPhase("next"), 1000);
    } else if (phase === "next") {
      if (messageIndex + 1 < messages.length) {
        timer = setTimeout(() => {
          setMessageIndex((prevIndex) => prevIndex + 1);
          setPhase("typing");
        }, 500);
      } else {
        setAllMessagesDisplayed(true);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, messageIndex, messages.length]);

  const displayMessage = !allMessagesDisplayed ? messages[messageIndex] : "";

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/api/users/login", {
      email,
      password,
    });
    localStorage.setItem("userId", response.data.userID);
    console.log(response);
    navigate("/tasks");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8080/api/users/signup",
      {
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
      }
    );
    setIsLogin(true);
  };

  return (
    <div className="Landing">
      <div className={`ribbon ${allMessagesDisplayed ? "fade-in" : ""}`}>
        <img
          className="corner-logo"
          src="./letsdologo_header.png"
          alt="LetsDo App Logo"
        />
      </div>
      <div className={`typing-text ${phase}`}>{displayMessage}</div>

      <header className={`whoAreWe ${allMessagesDisplayed ? "fade-in" : ""}`}>
        Your personal task manager
      </header>
      <div className={`authFunction ${allMessagesDisplayed ? "fade-in" : ""}`}>
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <input
                name="Email Address"
                placeholder="Email Address"
                id="emailAddress"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                name="Password"
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="input-container">
              <button className="signIn" type="submit">
                Sign in
              </button>
            </div>
            <div className="input-container">
              <button
                type="button"
                className="toggle-button"
                onClick={() => setIsLogin(false)}
              >
                New here? Sign up!
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <h2>New Here? Sign up Below!</h2>
            <div className="input-container">
              <input
                name="First Name"
                id="firstName"
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                name="Last Name"
                id="lastName"
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                name="Email"
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                name="Date of Birth"
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateofBirth(e.target.value)}
                placeholder="Date of Birth"
                required
                title="Please enter your date of birth"
              />
              DoB
            </div>
            <div className="input-container">
              <input
                name="Password"
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="input-container">
              <button className="getStarted" type="submit">
                Get Started
              </button>
            </div>
            <div className="input-container">
              <button
                type="button"
                className="toggle-button2"
                onClick={() => setIsLogin(true)}
              >
                Already have an account? Sign in!
              </button>
            </div>
          </form>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
