import { create } from "zustand";

const useClaimStore = create((set, get) => ({
  claims: [],
  claim: null,
  isLoading: false,
  isError: false,

  fetchClaims: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("http://localhost:3000/api/claims", {
        credentials: "include",
      });
      const data = await res.json();
      set({ claims: data });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        set({ isLoading: false });
      }, 1000);
    }
  },

  createClaim: async (claim) => {
    try {
      console.log("Hello Creating", claim);
      set({ isLoading: true });
      const res = await fetch("http://localhost:3000/api/claims", {
        method: "POST",
        body: JSON.stringify({
          ...claim,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      // set({ claims: [...get().claims, data] });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        set({ isLoading: false });
      }, 1000);
    }
  },
  getClaim: async (id) => {
    try {
      set({ isLoading: true });
      const res = await fetch(`http://localhost:3000/api/claims/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      set({ claim: data.data });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        set({ isLoading: false });
      }, 1000);
    }
  },
}));

export default useClaimStore;
