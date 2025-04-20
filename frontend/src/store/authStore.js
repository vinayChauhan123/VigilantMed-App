import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isError: false,

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("http://localhost:3000/api/users/check", {
        credentials: "include",
      });
      const data = await res.json();
    
      if (data.userId) {
        set({ user: data });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (name, email, password, confirmPassword, dob, gender) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          dob,
          gender,
        }),
        credentials: "include",
      });
      const data = await res.json();

      set({ user: data.userId });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  login: async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      set({ user: data.userId });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  logout: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      set({ user: null });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}));

export default useAuthStore;
