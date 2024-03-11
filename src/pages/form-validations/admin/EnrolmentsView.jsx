import React from "react";
import AdminNav from "../../../user/shared/AdminNav";
import { useState, useEffect } from "react";
import { listAllPatients } from "../../../action/PatientAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllHealthPlans } from "../../../action/AdminAction";

const defaultMonthYear = new Date().toISOString().slice(0, 7);

const EnrolmentsView = () => {
  const [selectedProgram, setSelectedProgram] = useState("Select a Program");
  const [selectedDate, setSelectedDate] = useState(defaultMonthYear);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFilterDate, setSelectedFilterDate] = useState("");
  const [data, setData] = useState({});
  const [currMonth, setCurrentMonth] = useState();
  const dispatch = useDispatch();

  const { healthplans } = useSelector((state) => state.healthPlanReducer);

  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleFilterDateChange = (event) => {
    setSelectedFilterDate(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllHealthPlans());
  }, [dispatch]);

  const patientss = useSelector((state) => state.patientList);

  const { loading, patients } = patientss;

  useEffect(() => {
    const newData = { ...data };
    if (selectedProgram !== "") {
      newData.program = selectedProgram;
    } else {
      delete newData.program;
    }
    if (selectedDate !== "") {
      newData.date = selectedDate;
    } else {
      delete newData.date;
    }
    if (selectedYear !== "") {
      newData.year = selectedYear;
    } else {
      delete newData.year;
    }
    setData(newData);
  }, [selectedYear, selectedDate, selectedProgram]);

  useEffect(() => {
    dispatch(listAllPatients());
  }, [dispatch]);

  let patientCount = 0;

  if (patients && patients.length > 0) {
    const selectedProgramDate = new Date(selectedDate);

    const filteredPatients = patients.filter((patient) => {
      return (
        patient.health_plan.some((plan) => {
          const planDate = new Date(plan.createdOn);
          return (
            plan.healthPlan === selectedProgram &&
            planDate.getFullYear() === selectedProgramDate.getFullYear() &&
            planDate.getMonth() === selectedProgramDate.getMonth()
          );
        }) &&
        (selectedFilterDate
          ? new Date(patient.createdOn).toDateString() ===
            new Date(selectedFilterDate).toDateString()
          : true)
      );
    });

    patientCount = filteredPatients.length;
  }

  return (
    <>
      <div className="dashboard__Container">
        <AdminNav />
        <header className="header__Shadow">
          <div className="header__Container">
            <h1 className="header__Heading--Primary">
              Dashboard - SUPER ADMIN
            </h1>
          </div>
        </header>
        <main>
          <div className="dashboard__Main-Content">
            <div className="form__Grid--Cols-6">
              <div className=" col-start-2 sm:col-start-2 col-span-4  sm:col-span-2">
                <label htmlFor="program" className="form__Label-Heading">
                  Select Program
                </label>
                <select
                  id="program"
                  name="program"
                  autoComplete="program-name"
                  className="form__Select"
                  onChange={handleProgramChange}
                >
                  <option value="" data-default>
                    Select Program
                  </option>
                  {healthplans?.map((h, key) => (
                    <option value={h._id} id={h.name} key={h._id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" col-start-2 sm:col-start-4  col-span-4 sm:col-span-2">
                <label htmlFor="program-date" className="form__Label-Heading">
                  Select Month & Year
                </label>
                <input
                  type="month"
                  name="program-date"
                  id="program-date"
                  autoComplete="program-name"
                  className="form__Input"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="col-start-2 sm:col-start-6 col-span-4 sm:col-span-2">
                <label htmlFor="filter-date" className="form__Label-Heading">
                  Select Date
                </label>
                <input
                  type="date"
                  name="filter-date"
                  id="filter-date"
                  autoComplete="off"
                  className="form__Input"
                  value={selectedFilterDate}
                  onChange={handleFilterDateChange}
                />
              </div>
            </div>
            <div className="my-10">
              <div className="list__Flexbox--Center">
                <ul className="nav-tabs nav-justified list__Container">
                  <li className="list__Heading">
                    Active Patients:
                    <span className="list__Heading--Span">
                      {patientCount !== undefined ? patientCount : 0}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EnrolmentsView;
