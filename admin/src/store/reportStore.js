import { create } from "zustand";

const useReportStore = create((set, get) => ({
  reports: [],
  report: null,

  analyzeClaims: () => {
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
      console.log(data);

      set({ report: data });
    } catch (error) {
      console.log(error);
    }
  },

  createReport: async (report) => {
    try {
      console.log("Inside reportStore: ", report);

      const res = await fetch("http://localhost:3000/api/reports", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          claimId: report?.claimId,
          claimStatus: report?.claimStatus,
          remarks: report?.remarks
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      set((state) => ({
        reports: [...state.reports, data],
      }));

      return true;
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useReportStore;
