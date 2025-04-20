import React, { useEffect } from "react";
import useReportStore from "../store/reportStore";
import { Link } from "react-router-dom";
import useClaimStore from "../store/claimStore";
const Reports = () => {
  const { reports, fetchReports } = useReportStore();
  const { claims, fetchClaims } = useClaimStore();

  useEffect(() => {
    fetchReports();
    fetchClaims();
  }, []);


  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your Claims</h1>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer">
            <Link to="/create-claim">Create Claim</Link>
          </button>
        </header>
        {reports?.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-md p-2 flex gap-2 justify-between"
          >
            <div className="flex items-center gap-2">
              <h1>{item.patientName}</h1>
              <p className="text-sm text-gray-500">@{item.hospitalName}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-emerald-500 text-white p-2 rounded-md cursor-pointer">
                <Link to={`/reports/${item._id}`}>View Claim</Link>
              </button>
              <button className="bg-blue-500 text-white p-2 rounded-md cursor-pointer">
                <Link to={`/reports/${item._id}`}>View Report</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
