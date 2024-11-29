import React, { useState, useEffect } from "react";
import "./index.css";

function Landing() {
  const [messageIndex, setMessageIndex] = useState(0); 
  const [phase, setPhase] = useState("typing");
  const [allMessagesDisplayed, setAllMessagesDisplayed] = useState(false);
  const messages = ["Take Control,", "Get Organized,", "    Let's Do!   "]; 

  useEffect(() => {
    let timer;

    if (phase === "typing") {
      timer = setTimeout(() => setPhase("stay"), 2000); 
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

  return (
    <div className="Landing">
      <div className={`typing-text ${phase}`}>
        {displayMessage}
      </div>

      <header className={`whoAreWe ${allMessagesDisplayed ? "fade-in" : ""}`}>
        Your personal task manager
      </header>
      <div className={`authFunction ${allMessagesDisplayed ? "fade-in" : ""}`}>

        <form>
          <div className="input-container">
          <div className="logoTitle">
          <img src="./favicon.ico" alt="landing logo" /> 
          <span className="image-label">LetsDo</span>
          
        </div>
          
            <input
              name="Email Address"
              placeholder="Email Address"
              id="emailAddress"
              type="email"
              required
            />
          </div>
          <div className="input-container">
            <input
              name="Password"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="input-container">
            <button className="signIn" type="submit">
              Sign in
            </button>
          </div>
        </form>
        <form>
          <h2>New Here? Sign up Below!</h2>
          <div className="input-container">
            <input
              name="First Name"
              id="firstName"
              placeholder="First Name"
              type="text"
              required
            />
          </div>
          <div className="input-container">
            <input
              name="Last Name"
              id="lastName"
              placeholder="Last Name"
              type="text"
              required
            />
          </div>
          <div className="input-container">
            <input
              name="Email"
              id="email"
              placeholder="Email"
              type="email"
              required
            />
          </div>
          <div className="input-container">
            <input
              name="Date of Birth"
              id="dateOfBirth"
              type="date"
              placeholder="Date of Birth"
              required title="Please enter you date of birth"
            />DoB
          </div>
          <div className="input-container">
            <input
              name="Password"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="input-container">
            <button className="getStarted" type="submit">
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Landing;
