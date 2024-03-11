import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PatientNav from "../shared/PatientNav";
import DocPatientFooter from "../shared/DocPatientFooter";
import FloatingForm from "../../pages/shared/Floating-Form";
import { useParams } from "react-router-dom";
import { DetailsPatients } from "../../action/PatientAction";
import PatientDataTab from "../shared/PatientDataTab";

// my data tab
const DocPatientBoard = () => {
  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;

  console.log("myPatientId--->", myPatientId);

  const dispatch = useDispatch();

  // const { id } = useParams();

  useEffect(() => {
    dispatch(DetailsPatients(patId));
  }, [dispatch, patId]);

  return (
    <>
      {/* <div className="dashboard__Container">
        <PatientNav />

        <main>
          <div className="dashboard__Main-Content">
            <div className="dashboard__Main-Content"></div>
          </div>
        </main>
        <FloatingForm />
      </div>
      <DocPatientFooter /> */}
      <PatientDataTab />
      <FloatingForm />
      <DocPatientFooter />
    </>
  );
};

export default DocPatientBoard;
