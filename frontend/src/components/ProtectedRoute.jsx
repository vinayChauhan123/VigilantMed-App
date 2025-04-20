import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { user, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    verify();
  }, [checkAuth]);

  if (isLoading) {
    // Return a loadin  g indicator while checking authentication
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
