import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  console.log(dob, gender);
  // DOB
  // GENDER
  // ADD TO SCHEMA

  async function handleRegister(e) {
    e.preventDefault();
    const result = await register(name, email, password, confirmPassword, dob, gender);

    if (result) navigate("/dashboard");
  }
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      {/* <h1 className="text-4xl font-bold">Create an account</h1> */}
      <h1 className="text-4xl font-semibold text-center break-words">
        🩺Vigilant
        <span className="relative inline-block">
          <span className="relative z-10 px-2 text-gray-50">MED</span>
          <span className="absolute inset-0 bg-emerald-500/50 -rotate-2 rounded-lg transform -skew-y-1"></span>
        </span>
      </h1>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4  max-w-[400px] w-full "
      >
        <input
          type="text"
          placeholder="Name"
          className="input w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          className="input w-full"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        {/* radio buttons for gender */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              className="radio"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              className="radio"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <button type="submit" className="btn btn-accent text-white">
          Register
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
