import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Header = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const authLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Claims", path: "/claims" },
    // { name: "Reports", path: "/reports" },
  ];

  const nonAuthLinks = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  async function handleLogOut() {
    await logout();
  }

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="border-b border-gray-300 overflow-x-hidden">
      <nav className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center gap-4">
        <Link to="/">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="block sm:hidden">🩺</span>
            <span className="hidden sm:block">🩺VigilantMED</span>
          </h1>
        </Link>
        {/* large screen */}
        <ul className="hidden sm:flex gap-6">
          {user && (
            <div className="flex items-center gap-6">
              {authLinks.map((link) => (
                <li key={link.name}>
                  <NavLink to={link.path}>{link.name}</NavLink>
                </li>
              ))}
              <button
                className="btn btn-error text-white"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          )}

          {!user &&
            nonAuthLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
        </ul>

        {/* small screen */}
        <div className="sm:hidden z-[999]">
          <button
            className="btn btn-ghost z-[999]"
            onClick={() => setIsOpen(!isOpen)}
          >
            Open
          </button>
          <div
            className={`absolute top-0 right-0 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out w-full h-screen bg-white shadow-lg`}
          >
            <button
              className="btn btn-ghost h-[70px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              Close
            </button>
            <ul className="flex flex-col items-center justify-center h-[calc(100vh-70px)] gap-4 p-4">
              {user && (
                <div className="flex flex-col items-center gap-6">
                  {authLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink to={link.path}>{link.name}</NavLink>
                    </li>
                  ))}
                  <button
                    className="btn btn-error text-white"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </div>
              )}

              {!user &&
                nonAuthLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink to={link.path}>{link.name}</NavLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
