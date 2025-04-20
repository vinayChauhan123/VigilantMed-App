import React, { useEffect } from "react";
import useClaimStore from "../store/claimStore";
import { useNavigate, useParams } from "react-router-dom";
import Details from "../components/details";
import Loading from "../components/Loading";
import useReportStore from "../store/reportStore";

const Claim = () => {
  const { id } = useParams();
  const { getClaim, claim, isLoading } = useClaimStore();
  const { fetchReport, report } = useReportStore();

  const navigate = useNavigate();

  console.log(claim);

  // let report = true;

  useEffect(() => {
    getClaim(id);
    fetchReport(id);
  }, [id]);

  console.log("report: ", report);

  const handleCheckClaimStatus = () => {
    console.log("Checking Claim Status");
    navigate(`/reports/${claim?._id}`);
  };

  if (isLoading) return <Loading />;

  console.log("REMOARks: ",report?.data?.remarks);
  

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center ">
      <h1 className="text-2xl font-bold">Claim Details</h1>
      {claim && <Details claim={claim} status={report?.data?.claimStatus} remarks={report?.data?.remarks}/>}

      {/* {report && (
        <button onClick={handleCheckClaimStatus} className="btn btn-warning ">
          View Report
        </button>
      )} */}
    </div>
  );
};

export default Claim;
