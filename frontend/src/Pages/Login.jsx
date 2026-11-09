import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    let errorShow = { email: "", password: "" };

    if (email === "") {
      errorShow.email = "please enter email";
    }
    if (password === "") {
      errorShow.password = "please enter password";
    }
    setError(errorShow);

    if (errorShow.email || errorShow.password) {
      return;
    }
    console.log("passed validation");

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log("responsebefore", response);
      const data = await response.json();
      console.log("data", data);
      console.log(data);

      if (!response.ok) {
        alert(data.error);
        return;
      }
      login(
        {
          email,
        },
        data.token,
        data.user,
      );

      if (rememberMe) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
      alert(data.message);
      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Login failed. Please try again.");
    }
  };
  const handleSaved = () => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  };

  useEffect(() => {
    handleSaved();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder=" Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError({ ...error, email: "" });
        }}
      />
      {error.email && <p style={{ color: "red" }}>{error.email}</p>}
      <br />
      <input
        type={showPassword ? "text" : "password"}
        placeholder=" Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError({ ...error, password: "" });
        }}
      />
      {error.password && <p style={{ color: "red" }}>{error.password}</p>}
      <br />
      <input
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => {
          setRememberMe(e.target.checked);
        }}
      />
      <label>Remember Me</label>
      <br />
      <button
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
