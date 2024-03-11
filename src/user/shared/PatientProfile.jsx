import React from "react";
import PatientFooter from "../shared/PatientFooter";
import PatientNav from "../shared/PatientNav";


const PatientProfile = () => {
  return (
    <>
      <div className="dashboard__Container">
        <PatientNav />
      </div>
      <PatientFooter />
    </>
  );
};