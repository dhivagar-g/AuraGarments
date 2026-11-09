import { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";

function Profile() {
  const { user, updateUser } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState(false);

  const handleUpdateProfile = async () => {
    const success = await updateUser({ name, email });
    if (success) {
      console.log(" Profile updated successfully");
      setEdit(false);
    } else {
      console.log("Failed to update profile");
    }
  };

  useEffect(() => {
    console.log("user in profile", user);
    setName(user?.name);
    setEmail(user?.email);
  }, [user]);

  return (
    <div>
      <h1>Profile Page</h1>
      Name:
      {edit ? (
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      ) : (
        user?.name
      )}
      <br />
      Email:
      {edit ? (
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      ) : (
        user?.email
      )}
      <br />
      <button
        onClick={() => {
          setEdit(true);
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          handleUpdateProfile();
        }}
      >
        Update Profile
      </button>
    </div>
  );
}

export default Profile;
