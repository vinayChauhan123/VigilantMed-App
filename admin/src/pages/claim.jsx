import React, { useEffect } from "react";
import useClaimStore from "../store/claimStore";
import { useNavigate, useParams } from "react-router-dom";
import Details from "../components/details";
import Loading from "../components/Loading";
import { useState } from "react";
import { Link } from "react-router-dom";
import useReportStore from "../store/reportStore";

const Claim = () => {
  const { id } = useParams();
  const { getClaim, claim, isLoading, claimStatus, setClaimStatus } =
    useClaimStore();

  const { fetchReport, report } = useReportStore();
  const navigate = useNavigate();

  const [reportBtn, setReportBtn] = useState(false);
  const [score, setScore] = useState(null);

  console.log("report", report);
  

  // function handleGenerateReport() {
  //   // ML Model will be called here to predict the fraud prediction
  //   // setReport(true);
  //   navigate(`/create-report/${claim?._id}`);
  // }

  useEffect(() => {
    getClaim(id);
    fetchReport(id);
  }, [id]);

  if (report) {
    console.log("HELLOW R");
  }

  const handleCheckClaimStatus = async () => {
    console.log("Checking Claim Status");
    // ML Model will be called here to predict the fraud prediction
    // setClaimStatus("Approved") OR setClaimStatus("Rejected");

    // convert the claims object to array
    console.log("Prediction taking place");
    // const response = await fetch("http://localhost:4000/predict", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ data: claim }), // Example input
    // });
    // const result = await response.json();
    // console.log("Prediction:", result.prediction);
    // setScore(result.prediction);

    setReportBtn(true);
  };

  console.log(report?.data?.claimStatus);
  

  if (isLoading) return <Loading />;

  return (
    <div className="flex-1 py-4 px-6 flex flex-col gap-4 items-center justify-center ">
      <h1 className="text-2xl font-bold">Claim Details</h1>
      {claim && <Details claim={claim} status={report?.data?.claimStatus} remarks={report?.data?.remarks}/>}

      {!report?.success && (
        <>
          {!reportBtn && (
            // <button onClick={handleCheckClaimStatus} className="btn btn-warning ">
            //   Generate Report
            // </button>
            <button
              onClick={handleCheckClaimStatus}
              className="btn btn-warning "
            >
              Check Claim Status
            </button>
          )}
        </>
      )}

      {/* {report && <h1>{report?.claimStatus}</h1>} */}

      {reportBtn && (
        <>
          {" "}
          <h1 className="text-success font-bold uppercase">
            Prediction Score: {score ? score : "100%"}
          </h1>
          <button
            className="btn btn-neutral text-white font-semibold"
            // onClick={handleGenerateReport}
          >
            <Link to={`/create-report/${claim?._id}`}>Generate Report</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default Claim;
