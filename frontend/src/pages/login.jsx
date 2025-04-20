import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result) navigate("/dashboard");
  }
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      {/* <h1 className="text-4xl font-bold">Welcome back to VigilantMed</h1> */}
      <h1 className="text-4xl font-semibold text-center break-words">
        🩺Vigilant
        <span className="relative inline-block">
          <span className="relative z-10 px-2 text-gray-50">MED</span>
          <span className="absolute inset-0 bg-emerald-500/50 -rotate-2 rounded-lg transform -skew-y-1"></span>
        </span>
      </h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 max-w-[400px] w-full "
      >
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
        <button type="submit" className="btn btn-accent rounded-md text-white">
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
