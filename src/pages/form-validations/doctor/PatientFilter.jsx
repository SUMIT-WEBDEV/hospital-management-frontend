import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Url } from "../../../constant.js/PatientConstant";

const PatientFilter = ({ handleClick, status }) => {
  const [patientName, setPatientName] = useState("");
  const [healthPlan, setHealthPlan] = useState("");
  const [patientStatus, setPatientStatus] = useState("Active");
  const [patientType, setPatientType] = useState("");
  const [healthPlanOptions, setHealthPlanOptions] = useState([]);
  const [optionsError, setOptionsError] = useState(null);
  const doctorSignin = useSelector((state) => state.doctorSignin);
  const { doctorInfo } = doctorSignin;
  const handleSubmit = (event) => {
    event.preventDefault();

    handleClick({
      patientName,
      healthPlan,
      patientType,
    });
    status(patientStatus);
  };

  const handleSub = () => {
    setPatientName("");
    setHealthPlan("");
    setPatientStatus("");
    setPatientType("");
  };

  async function fetchData() {
    try {
      const response = await fetch(`${Url}/health-plan`, {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setHealthPlanOptions([
        ...json?.data.flatMap((opt) => ({ value: opt.name, label: opt.name })),
      ]);
    } catch (err) {
      setOptionsError(err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="card__Block mt-3">
        <h5 className="card__Heading">
          Search Patient Data
          <span className="card__Heading--Span card__Bg--Teal">Filters</span>
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="form__Grid--Rows-none">
            <div className="form__Cols--Span-6">
              <input
                type="text"
                name="patient-name"
                id="patient-name"
                autoComplete="patient-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search by Enter Patient Name / Phone Number"
                value={patientName}
                onChange={(event) => setPatientName(event.target.value)}
              />
            </div>
            <div className="form__Cols--Span-6">
              <select
                id="health-plan"
                name="health-plan"
                autoComplete="health-plan"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-red py-2 px-3 shadow-sm sm:text-sm"
                value={healthPlan}
                onChange={(event) => setHealthPlan(event.target.value)}
              >
                <option value="" data-default>
                  Select Programs Enrolled (Health Plan)
                </option>
                {healthPlanOptions?.map((option, i) => (
                  <option key={i}>{option.value}</option>
                ))}
              </select>
            </div>
            <div className="form__Cols--Span-6">
              <select
                id="payment-status"
                name="payment-status"
                autoComplete="payment-status"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-red py-2 px-3 shadow-sm sm:text-sm"
                value={patientStatus}
                onChange={(event) => setPatientStatus(event.target.value)}
              >
                <option value="Active">Active</option>
                <option value="De-Active">De-Active</option>
              </select>
            </div>
            <div className="form__Cols--Span-6">
              <select
                id="patient-type"
                name="patient-type"
                autoComplete="patient-type"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-red py-2 px-3 shadow-sm sm:text-sm"
                value={patientType}
                onChange={(event) => setPatientType(event.target.value)}
              >
                <option value="" data-default>
                  Select Patient Type
                </option>
                <option>Primary</option>
                <option>Secondary</option>
              </select>
            </div>
            <div className="form__Cols--Span-6">
              <button
                //  onClick={handleClick}
                type="submit"
                className="card__Btn card__Bg--Teal card__Btn--Bg-Teal"
              >
                Search Patient
              </button>

              <button
                onClick={handleSub}
                type="submit"
                className="ml-2 md:ml-6 card__Btn card__Bg--Red card__Btn--Bg-Red"
              >
                clear Patient
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PatientFilter;
