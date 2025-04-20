import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  navigate("/login");

//   useEffect(() => {
//   }, [navigate]);

  return <div>Home</div>;
};

export default Home;
