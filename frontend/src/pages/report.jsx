import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useReportStore from "../store/reportStore";
import Details from "../components/details";

const Report = () => {
  const { id } = useParams();
  const { report, fetchReport } = useReportStore();

  console.log(report);
  
  console.log(id);
  
  useEffect(() => {
    fetchReport(id);
  }, [id]);

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center ">
      <h1 className="text-2xl font-bold">Report Details</h1>
      {!report?.success && (
        <div className="flex justify-center items-center ">
          <h1 className="text-2xl font-bold">Report not found</h1>
        </div>
      )}

      {report?.success && (
        <>
          <Details claim={report?.data?.claimId} />
          {/* <div className="flex items-center gap-4">
            <p>{report?.data?.report}</p>
          </div> */}
          <div className="flex gap-2 items-center justify-center">
            <span className="status status-error flex items-center animate-bounce"></span>
            <p className="text-error">{report?.data?.report}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
