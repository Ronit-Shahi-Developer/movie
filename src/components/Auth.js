import React, { useState, useEffect } from "react";
import API from "../ApiService";
import { useCookies } from "react-cookie";


const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoginView, setIsLoginView] = useState(true);

  const [token, setToken] = useCookies(["mr-token"]);

  useEffect(() => {
    console.log(`${process.env.REACT_APP_API_URL}`)

    if (token["mr-token"]) window.location.href = "/movies";
  }, [token]);

const checkToken= (resp) =>{
  if(resp.token){
    setToken("mr-token", resp.token)
  }
}
  const loginClicked = () => {
    console.log("login is is clicked")
    API.loginUser({ username, password })
      .then((resp) => checkToken(resp))

      .catch((error) => console.log(error));
  };

  const registerClicked = () => {
    console.log("register")
    API.registerUser({ username, password })
    .then(() => loginClicked())

      .catch((error) => console.log(error));
  };
  const isDisabled = username.length === 0 || password.length === 0;

  return (
    <div className="App">

<header className="App-header">
           {isLoginView ? <h1>Login User</h1> : <h1>Register</h1>}

      </header>
      <div className="login-container">
      {/* ..................Username................... */}
      <label>Username</label>
      <br />

      <input
        id="username"
        type="text"
        placeholder="username"
        // value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      {/* ...................Password................ */}
      <label>Password</label>
      <br />

      <input
        id="password"
        type="password"
        placeholder="password"
        // value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      {isLoginView 
      ? <button onClick={loginClicked} disabled={isDisabled}>Login</button> 
      : 
      <button onClick={registerClicked} disabled={isDisabled}>Register</button>
      }
      

      {isLoginView ? (
        <p onClick={() => setIsLoginView(false)} >
          {" "}
          You don't have an account, register here.
        </p>
      ) : (
        <p onClick={() => setIsLoginView(true)} >
          {" "}
          You already have an account, login here.
        </p>
      )}
      </div>
    </div>
  );
};

export default Auth;
