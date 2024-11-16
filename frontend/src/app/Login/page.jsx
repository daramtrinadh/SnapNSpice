"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./index.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("recipetoken");
    if (token) {
      router.push("/MainHome");
    }
  }, []);

  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signinError, setSigninError] = useState("");

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/recipe/signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful, please log in");
        handleSignInClick();
      } else {
        setSignupError(data.error || "Sign up failed. Please try again later.");
      }
    } catch (error) {
      setSignupError("Error signing up. Please try again.");
      console.error("Signup Error:", error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/recipe/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("recipetoken", data.token);
        localStorage.setItem("recipeUser", JSON.stringify(data.userDetails));
        router.push("/MainHome");
      } else {
        setSigninError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setSigninError("Error signing in. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignupSubmit}>
            <h1 className="login-head">Sign Up</h1>
            <span>Use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              className="login-input"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <button type="submit" className="login-button">Sign Up</button>
            {signupError && <p className="error-message">{signupError}</p>}
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1 className="login-head">Sign In</h1>
            <span>Use your email account</span>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <a href="#" className="login-a">Forgot your password?</a>
            <button type="submit" className="login-button">Sign In</button>
            {signinError && <p className="error-message">{signinError}</p>}
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="login-head">Welcome Back!</h1>
              <p className="login-para">To stay connected with us please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="login-head">Hello, Friend!</h1>
              <p className="login-para">Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
