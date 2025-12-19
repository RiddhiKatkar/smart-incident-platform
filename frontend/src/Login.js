import "./Login.css";
import { FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [protectedMsg, setProtectedMsg] = useState("");

  const BASE_URL = "http://localhost:8001";

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
       localStorage.setItem("access", data.access);
       setIsLoggedIn(true);
       navigate("/incidents");

      }
 else {
        setMessage("Login failed");
      }
    } catch (error) {
      setMessage("Backend not reachable");
    }
  };

  const callProtectedAPI = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASE_URL}/api/incidents/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setProtectedMsg(JSON.stringify(data));
    } catch (error) {
      setProtectedMsg("Protected API not reachable");
    }
  };

  return (
  <div className="login-container">
    <div className="login-card">
      <h2>
        <FaUserLock style={{ marginRight: "8px", color: "#60a5fa" }} />
        Smart Incident Login
      </h2>


      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      {message && <p className="login-message">{message}</p>}
    </div>
  </div>
);

}

export default Login;



