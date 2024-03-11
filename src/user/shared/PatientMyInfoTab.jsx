import React from "react";
import PatientNav from "./PatientNav";
import PatientFooter from "./PatientFooter";
import { useParams } from "react-router-dom";

import PatientAccountStatus from "../../pages/form-validations/patient/PatientAccountStatus";
import { useSelector } from "react-redux";
import DocPatientFooter from "./DocPatientFooter";

const PatientMyInfoTab = () => {
  // const myPatientId = useSelector((state) => state.patientId);

  // console.log("myPatientId --->", myPatientId);

  // const { id } = useParams();

  return (
    <>
      <div className="dashboard__Container">
        <PatientNav />
        <main className="dashboard__Main-Content">
          <PatientAccountStatus />
        </main>
        <DocPatientFooter />
      </div>
    </>
  );
};

export default PatientMyInfoTab;
