import React from "react";
import "./../style/Login.css";
import { scopes } from "../constants";
import logo from "../img/react-logo.png";

const Login = () => {
  return (
    <div className="container-login">
      <img className="img-logo" src={logo} alt="Cannot be loaded" />
      <h1 id="react-app">Spotifly</h1>
      <h5>
        Step 1:- Click on the button below to sign in and authorize your account
        to use the app.
      </h5>
      <h5>Step 2:- That's it!</h5>
      <a
        href={`https://accounts.spotify.com/en/authorize/?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=${scopes}`}
      >
        <button className="btn btn-success">
          <span>Sign In !</span>
        </button>
      </a>
    </div>
  );
};

export default Login;
