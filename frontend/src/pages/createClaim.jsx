import React, { useState } from "react";
import useClaimStore from "../store/claimStore";
import { useNavigate } from "react-router-dom";
import {
  providerMapping,
  physicianMapping,
  diagnosisMapping,
} from "../utils/mapping";

const CreateClaim = () => {
  const { createClaim } = useClaimStore();
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [diagnosis, setDiagnosis] = useState([]);
  const [physician, setPhysician] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [totalBill, setTotalBill] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await createClaim({
      patientName,
      hospitalName,
      diagnosis,
      physician,
      admissionDate,
      dischargeDate,
      totalBill,
      insuranceProvider,
    });

    console.log(result);

    if (result?.success) {
      setPatientName("");
      setHospitalName("");
      setDiagnosis("");
      setAdmissionDate("");
      setDischargeDate("");
      setTotalBill("");
      setInsuranceProvider("");

      navigate("/dashboard");
    } else {
      alert("Failed to create claim");
    }
  }

  const handleDiagnosisChange = (e) => {
    const newDiagnosis = e.target.value;

    if (!diagnosis.includes(newDiagnosis)) {
      setDiagnosis([...diagnosis, newDiagnosis]);
    }
  };

  const removeDiagnosis = (diagnosisToRemove) => {
    setDiagnosis(
      diagnosis.filter((diagnosis) => diagnosis !== diagnosisToRemove)
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="mt-8 text-2xl font-bold">Create Claim</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-8 border border-gray-300 rounded-md flex flex-col gap-4  p-4 md:max-w-[600px] w-full text-sm"
      >
        {/* patient name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="patientName">Patient Name</label>
          <input
            id="patientName"
            type="text"
            placeholder="John Doe"
            className="input w-full"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>

        {/* hospital name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="hospitalName">Hospital Name</label>
          <input
            id="hospitalName"
            type="text"
            placeholder="Hospital Name"
            className="input w-full"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
          />
        </div>

        {/* diagnosis */}
        <div className="flex flex-col gap-2">
          <label htmlFor="diagnosis">Diagnosis</label>
          {/* <input
            id="diagnosis"
            type="text"
            placeholder="Diagnosis"
            className="input w-full"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          /> */}
          <select
            className="input w-full"
            value=""
            onChange={handleDiagnosisChange}
            // required
          >
            <option value="">Select a diagnosis</option>
            {diagnosisMapping
              .filter((diagnose) => !diagnosis.includes(diagnose))
              .map((diagnose) => (
                <option key={diagnose} value={diagnose}>
                  {diagnose}
                </option>
              ))}
          </select>
          {diagnosis.length > 0 && (
            <div className="mt-2">
              {diagnosis.map((diagnose) => (
                <span
                  key={diagnose}
                  className="inline-block bg-gray-200 px-2 py-1 m-1 rounded-full"
                >
                  {diagnose}
                  <button
                    onClick={() => removeDiagnosis(diagnose)}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* physician */}

        <div className="flex flex-col gap-2">
          <label htmlFor="physician">Physician</label>
          <select
            id="physician"
            className="input w-full"
            value={physician}
            onChange={(e) => setPhysician(e.target.value)}
            required
          >
            <option value="">Select a physician</option>
            {Object.keys(physicianMapping).map((physician) => (
              <option key={physician} value={physicianMapping[physician]}>
                {physician}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="admissionDate">Admission Date</label>
          <input
            id="admissionDate"
            type="date"
            placeholder="Admission Date"
            className="input w-full"
            value={admissionDate}
            onChange={(e) => setAdmissionDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dischargeDate">Discharge Date</label>
          <input
            id="dischargeDate"
            type="date"
            placeholder="Discharge Date"
            className="input w-full"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="totalBill">Total Bill</label>
          <input
            id="totalBill"
            type="number"
            placeholder="0.00"
            className="input w-full"
            value={totalBill}
            onChange={(e) => setTotalBill(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="insuranceProvider">Insurance Provider</label>
          <select
            id="insuranceProvider"
            className="input w-full"
            value={insuranceProvider}
            onChange={(e) => setInsuranceProvider(e.target.value)}
            required
          >
            <option value="">Select a insurance provider</option>
            {Object.keys(providerMapping).map((provider) => (
              <option key={provider} value={providerMapping[provider]}>
                {provider}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success text-white">
          Create Claim
        </button>
      </form>
    </div>
  );
};

export default CreateClaim;
