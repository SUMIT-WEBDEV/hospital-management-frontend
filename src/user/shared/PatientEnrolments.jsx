import React from "react";
import PatientNav from "./PatientNav";
import PatientFooter from "./PatientFooter";

import PatientAllEnrolments from "../../pages/form-validations/patient/PatientAllEnrolments";
import DocPatientFooter from "./DocPatientFooter";

const PatientEnrolments = () => {
  return (
    <>
      <div className="dashboard__Container">
        <PatientNav />
        <main className="dashboard__Main-Content">
          <PatientAllEnrolments />
        </main>
        <DocPatientFooter />
      </div>
    </>
  );
};

export default PatientEnrolments;
