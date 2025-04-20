import React from "react";
import { formatDateTime } from "../utils/date-time";
import { formatText } from "../utils/format-text";
import { providerMapping, physicianMapping } from "../utils/mapping";

const Details = ({ claim, status, remarks }) => {
  // if claimStatus is not in the claim model then try rendering from report
  const diagnosis = Object.keys(claim.diagnosis[0]).map((item) =>
    formatText(item)
  );

  const insuranceProvider = Object.keys(providerMapping).find(
    (key) => providerMapping[key] === claim.insuranceProvider
  );

  const physician = Object.keys(physicianMapping).find(
    (key) => physicianMapping[key] === claim.physician
  );

  return (
    <div className="w-full max-w-[600px] flex flex-col gap-4 border border-gray-300 rounded-md p-4">
      <p>
        Patient Name: <span className="font-bold">{claim.patientName}</span>
      </p>
      <p>
        Hospital Name: <span className="font-bold">{claim.hospitalName}</span>
      </p>
      <p>
        Insurance Provider:{" "}
        <span className="font-bold">{insuranceProvider}</span>
      </p>
      <p>
        Diagnosis:{" "}
        <span className="font-bold">
          {diagnosis.map((item) => item).join(", ")}
        </span>
      </p>
      <p>
        Physician: <span className="font-bold">{physician}</span>
      </p>
      {/* <p>
        Procedure:{" "}
        <span className="font-bold">
          {claim.procedure.map((item) => item).join(", ")}
        </span>
      </p> */}
      <p>
        Admission Date:{" "}
        <span className="font-bold">{formatDateTime(claim.admissionDate)}</span>
      </p>
      <p>
        Discharge Date:{" "}
        <span className="font-bold">{formatDateTime(claim.dischargeDate)}</span>
      </p>
      <p>
        Total Bill: <span className="font-bold">{claim.totalBill}</span>
      </p>
      {status ? (
        <p>
          Status:{" "}
          {/* <span className="font-bold">{claim.fraudPrediction}</span> */}
          <span className="font-bold capitalize">{status}</span>
        </p>
      ) : (
        <p>
          Status: <span className="font-bold">{claim.fraudPrediction}</span>
        </p>
      )}
      {remarks && (
        <p>
          Remarks: <span className="font-bold">{remarks}</span>
        </p>
      )}
    </div>
  );
};

export default Details;
