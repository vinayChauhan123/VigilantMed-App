import { create } from "zustand";

const useClaimStore = create((set, get) => ({
  claims: [],
  claim: null,

  claimStatus: null,
  setClaimStatus: (status) => set({ claimStatus: status }),
  
  isLoading: false,
  isError: false,

  fetchClaims: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("http://localhost:3000/api/claims", {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      set({ claims: data });
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

  deleteClaim: async (id) => {
    try {
      set({ isLoading: true });
      const res = await fetch(`http://localhost:3000/api/claims/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      set((state) => ({
        claims: {
          ...state.claims,
          data: state.claims.data.filter((claim) => claim._id !== id),
        },
      }));

      console.log(get().claims);
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
