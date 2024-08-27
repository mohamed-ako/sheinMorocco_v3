import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "./store";
import {
  selectIsAuthenticated,
  selectAdminError,
  selectAdminStatus,
} from "./store";

export default function Admin() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const adminStatus = useSelector(selectAdminStatus);
  const adminError = useSelector(selectAdminError);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ username, password }));
  };

  React.useEffect(() => {
    if (adminStatus === "succeeded" && isAuthenticated) {
      alert("admin " + username + " is logged in");
      console.log("admin " + username + " is logged in");
    }
    if (adminStatus === "failed" && adminError) {
      alert(adminError);
    }
  }, [adminStatus, isAuthenticated, adminError, username]);

  return (
    <div>
      <>
        <img src="/logo.png" alt="logo" className="logo" />

        <form className="login" onSubmit={loginSubmit}>
          <h2>Login</h2>
          <label>User Name:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userLogin } from "./store"; // Adjust the path to your store
// import { selectCurrentUser } from "./store"; // Import the selector

// const Login = () => {
//   const dispatch = useDispatch();
//   const status = useSelector((state) => state.admin.status);
//   const error = useSelector((state) => state.admin.error);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const currentUser = useSelector(selectCurrentUser); // Use selector to get the current user

//   const handleLogin = async () => {
//     try {
//       await dispatch(userLogin({ username, password }));
//     } catch (err) {
//       console.error("Login failed:", err);
//     }
//   };

//   useEffect(() => {
//     if (status === "succeeded") {
//       // Perform actions after successful login, like redirecting or showing a message
//       console.log("Login successful");
//     }
//   }, [status]);

//   return (
//     <div>
//       {currentUser & (<h1>Welcome, {currentUser}!</h1>)}
//       <input
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={handleLogin}>Login</button>
//       {status === "failed" && <p>Error: {error}</p>}
//     </div>
//   );
// };

// export default Login;
