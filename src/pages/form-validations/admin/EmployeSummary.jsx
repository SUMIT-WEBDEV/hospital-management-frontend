import React from "react";
import AdminNav from "../../../user/shared/AdminNav";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDoctors,
  getAllHealthPlans,
  getPatientProgram,
} from "../../../action/AdminAction";

const EmployeSummary = () => {
  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("Select Program");
  const [employeeDetails, setEmployeeDetails] = useState({});

  const doctorlist = useSelector((state) => state.doctorList);
  const { loading, doctors } = doctorlist;

  const patientPrograms = useSelector((state) => state.patientProgram);
  const { patientPrimary, patientSecondary } = patientPrograms;

  const { healthplans } = useSelector((state) => state.healthPlanReducer);

  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllHealthPlans());
  }, [dispatch]);

  console.log("patientPrimary is", patientPrimary);
  console.log("patientSecondary is", patientSecondary);
  console.log("selectedProgram is", selectedProgram);

  // Assuming selectedProgram contains the selected health plan name
  // const selectedProgram = "Trial"; // You can replace this with the actual selected name

  const totalPrimary = patientPrimary?.reduce((count, p) => {
    // Extract an array of health plan names
    const healthPlanNames = p.health_plan.map((item) => item.healthPlan.name);

    // Use a Set to keep track of unique health plan names
    const uniqueHealthPlanNames = new Set(healthPlanNames);

    // Check if the selectedProgram is in the unique names
    if (uniqueHealthPlanNames.has(selectedProgram)) {
      return count + 1;
    }

    return count;
  }, 0);

  const totalSecond = patientSecondary?.reduce((count, p) => {
    // Extract an array of health plan names
    const healthPlanNames = p.health_plan.map((item) => item.healthPlan.name);

    // Use a Set to keep track of unique health plan names
    const uniqueHealthPlanNames = new Set(healthPlanNames);

    // Check if the selectedProgram is in the unique names
    if (uniqueHealthPlanNames.has(selectedProgram)) {
      return count + 1;
    }

    return count;
  }, 0);

  // console.log(`Total Primary Patients with ${selectedProgram}: ${totalPrimar}`);

  // const totalPrimary = patientPrimary?.reduce(
  //   (count, p) => (p.health_plan.name === selectedProgram ? count + 1 : count),
  //   0
  // );

  // const totalSecond = patientSecondary?.reduce(
  //   (count, p) => (p.health_plan.name === selectedProgram ? count + 1 : count),
  //   0
  // );

  let total = 0;

  total = totalPrimary + totalSecond;

  const handleStatusChange = (e) => {
    if (e.target.value === "All") {
      setSelectedStatus();
    } else {
      setSelectedStatus(e.target.value);
    }
  };

  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);

  useEffect(() => {
    dispatch(getPatientProgram(selectedEmployee));
  }, [selectedEmployee]);

  useEffect(() => {
    setEmployeeDetails((prevEmployeeDetails) => {
      const newEmployeeDetails = { ...prevEmployeeDetails };
      if (selectedEmployee === "") {
        delete newEmployeeDetails.employee;
      } else {
        newEmployeeDetails.employee = selectedEmployee;
      }
      if (selectedProgram === "") {
        delete newEmployeeDetails.program;
      } else {
        newEmployeeDetails.program = selectedProgram;
      }
      return newEmployeeDetails;
    });
  }, [selectedEmployee, selectedProgram]);

  // console.log("status", selectedStatus);
  // console.log("employeeDetails", employeeDetails);

  return (
    <>
      <div className="min-h-full">
        <AdminNav />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard - SUPER ADMIN
            </h1>
          </div>
        </header>
        <main>
          {}
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div>
              <div className="form__Grid--Cols-6">
                <div className="form__Cols--Span-2">
                  <label htmlFor="status" className="form__Label-Heading">
                    Select Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    autoComplete="status-name"
                    className="form__Select"
                    onChange={handleStatusChange}
                    //  value={selectedStatus.status}
                  >
                    <option value="" data-default>
                      Select Status
                    </option>
                    <option>All</option>
                    <option>Active</option>
                    <option>De-Active</option>
                  </select>
                </div>
                <div className="form__Cols--Span-2">
                  <label htmlFor="employee" className="form__Label-Heading">
                    Select Employee
                  </label>
                  <select
                    id="employee"
                    name="employee"
                    autoComplete="employee-name"
                    className="form__Select"
                    onChange={handleEmployeeChange}
                  >
                    <option value="" data-default>
                      Select Employee
                    </option>
                    {doctors
                      ?.filter((d) =>
                        selectedStatus ? d.status === selectedStatus : true
                      )
                      .map((doc) => (
                        <option key={doc._id} value={doc._id}>
                          {doc.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form__Cols--Span-2">
                  <label htmlFor="program" className="form__Label-Heading">
                    Select Program
                  </label>
                  {/* <select
                    id="program"
                    name="program"
                    autoComplete="program-name"
                    className="form__Select"
                    onChange={handleProgramChange}
                  >
                    <option value="" data-default>
                      Select Program
                    </option>
                    <option>Trial</option>
                    <option>Optimisation</option>
                    <option>Intense Care</option>
                    <option>Trial Indocare</option>
                  </select> */}

                  <select
                    id="program"
                    name="program"
                    autoComplete="program-name"
                    className="form__Select"
                    onChange={handleProgramChange}
                    //  value={selectedProgram}
                  >
                    <option value="" data-default>
                      Select Program
                    </option>
                    {healthplans?.map((h, key) => (
                      <option value={h.name} id={h.name}>
                        {h.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="my-10">
                <div className="flex justify-center gap-5 flex-col sm:flex-row">
                  <ul className="bg-white rounded-lg border border-gray-200 w-96 justify-self-center  text-gray-900">
                    {/* <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg text-gray-700 font-semibold">
                      Employee Name:
                      <span className="mx-3 px-3 py-2 text-gray-700 font-normal">
                        Employe Name
                      </span>
                    </li> */}
                    <li className="px-6 py-2 border-b border-gray-200 w-full text-gray-700 font-semibold">
                      Primary Patients:
                      <span className="mx-3 px-3 py-2 text-gray-700 font-normal">
                        {patientPrimary ? patientPrimary.length : 0}
                      </span>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-200 w-full text-gray-700 font-semibold">
                      Secondary Patients:
                      <span className="mx-0 px-3 py-2 text-gray-700 font-normal">
                        {patientSecondary ? patientSecondary.length : 0}
                      </span>
                    </li>
                  </ul>
                  <ul className="bg-white rounded-lg border border-gray-200 w-96 justify-self-center text-gray-900">
                    <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg text-gray-700 font-semibold">
                      Program Name:
                      <span className="mx-3 px-3 py-2 text-gray-700 font-normal">
                        {selectedProgram}
                      </span>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-200 w-full text-gray-700 font-semibold">
                      Active Patients:
                      <span className="mx-3 px-3 py-2 text-gray-700 font-normal">
                        {total ? total : 0}
                      </span>
                    </li>
                    {/* <li className="px-6 py-2 border-b border-gray-200 w-full text-gray-700 font-semibold">
                      New Patients:
                      <span className="mx-6 px-3 py-2 text-gray-700 font-normal">
                        0
                      </span>
                    </li> */}
                    {/* <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg text-gray-700 font-semibold">
                      <p className="text-center font-semibold">
                        ------------------
                      </p>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg text-gray-700 font-semibold">
                      Program Name:
                      <span className="mx-3 px-3 py-2 text-gray-700 font-normal">
                        Program 2
                      </span>
                    </li> */}
                    {/* <li className="px-6 py-2 border-b border-gray-200 w-full text-gray-700 font-semibold">
                      Active Patients:
                      <span className="mx-3 px-3 py-2 text-gray-700 font-normal">
                        78
                      </span>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-200 w-full text-gray-700 font-semibold">
                      New Patients:
                      <span className="mx-6 px-3 py-2 text-gray-700 font-normal">
                        14
                      </span>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EmployeSummary;
