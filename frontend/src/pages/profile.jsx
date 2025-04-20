import React from "react";
import useAuthStore from "../store/authStore";

const Profile = () => {
  const { user } = useAuthStore();
  console.log(user);

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <p>User ID: {user?.userId}</p>
        <p>Gender: {user?.gender}</p>
        <p>DOB: {user?.dob}</p>
        {/* <p>Address: {user.address}</p> */}
      </div>
    </div>
  );
};

export default Profile;
