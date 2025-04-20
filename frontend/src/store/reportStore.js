import { create } from "zustand";

const useReportStore = create((set, get) => ({
  reports: [],
  report: null,
  approvedReports: 0,
  rejectedReports: 0,

  analyzeClaims:  () => {
    let approved = 0;
    let rejected = 0;

    get().reports?.forEach((report) => {
      if (report.claimStatus === "approved") {
        approved++;
      } else if (report.claimStatus === "rejected") {
        rejected++;
      }
    });

    return { approved, rejected }

    // set({ approvedReports: approved })
    // set({ rejectedReports: rejected })
  },

  fetchReports: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reports", {
        credentials: "include",
      });
      const data = await res.json();

      set({ reports: data.data });
    } catch (error) {
      console.log(error);
    }
  },

  fetchReport: async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/reports/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log("data:", data);
      set({ report: data });
    } catch (error) {
      console.log(error);
    }
  },

}));



export default useReportStore;
