import React, { useEffect } from "react";
import useClaimStore from "../store/claimStore";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
const Claims = () => {
  const { claims, fetchClaims, isLoading } = useClaimStore();
  useEffect(() => {
    fetchClaims();
  }, []);


  if (isLoading) return <Loading />;

  return (
    <div className="py-4 px-6">
      <div className="flex flex-col gap-4">
        <header className="my-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Claims</h1>
          <button className="btn btn-neutral">
            <Link to="/create-claim">Create New</Link>
          </button>
        </header>
        {claims?.data?.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-md p-2 flex gap-2 justify-between"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <h1>{item.patientName}</h1>
              <p className="text-sm text-gray-500">@{item.hospitalName}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-success text-white">
                <Link to={`/claims/${item._id}`} className="flex items-center gap-2">
                  <span className="hidden sm:flex">View</span> Claim
                </Link>
              </button>
              {/* <button className="btn btn-primary text-white">
                <Link to={`/reports/${item._id}`} className="flex items-center gap-2">
                  <span className="hidden sm:flex">View</span> Report
                </Link>
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Claims;
