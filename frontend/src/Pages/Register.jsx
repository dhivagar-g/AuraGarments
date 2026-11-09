import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();
      alert(data.message || data.error);
    } catch (error) {
      console.log("Error during registration:", error);
      alert("Registration failed.please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label style={{ marginRight: "12px" }}>Name :</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <br />
      <label style={{ marginRight: "12px" }}>Email :</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <br />
      <label style={{ marginRight: "12px" }}>Password :</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
export default Register;
