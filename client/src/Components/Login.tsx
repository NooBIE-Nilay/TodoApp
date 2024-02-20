import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log("LOGIN:", data);
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/todos");
    } else {
      console.log(data);
      alert(data.msg || "Invalid username or password");
    }
  };
  return (
    <div style={{ justifyContent: "center", display: "flex", width: "100%" }}>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        New Here? <Link to="/signup">Signup</Link>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};
export default Login;
