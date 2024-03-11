import React from "react";
import PatientNav from "../shared/PatientNav";
import DocPatientFooter from "../shared/DocPatientFooter";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";

import DocPatientPrescriptions from "../../pages/form-validations/permissions/DocPatientPrescriptions";
import DocPatientDietCharts from "../../pages/form-validations/permissions/DocPatientDietCharts";
import DocPatientAppointments from "../../pages/form-validations/permissions/DocPatientAppointments";
import DocPatientObservations from "../../pages/form-validations/permissions/DocPatientObservations";
import PatienPrescriptionsInfo from "../../pages/form-validations/patient/PatienPrescriptionsInfo";
import PatientUploadDietChart from "../../pages/form-validations/patient/PatientUploadDietChart";
import PatientAppointmentInfo from "../../pages/form-validations/patient/PatientAppointmentInfo";
import PatientObservation from "../../pages/form-validations/patient/PatientObservation";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PatientFormResponse from "../../pages/form-validations/patient/PatientFormResponse";
import { Form1 } from "../../pages/shared/MultiForms";
import PatientAnswersTable from "../../pages/form-validations/patient/patientAnswersTable";
import FloatingForm from "../../pages/shared/Floating-Form.jsx";

const DocPatientMed = () => {
  const { id } = useParams();

  const myPatientId = useSelector((state) => state.patientId);

  const headerText = [
    { text: "Latest Prescriptions" },
    { text: "Form Response" },
    { text: "Personal Observations" },
    { text: "Appointments" },
  ];

  // const content0 = () => {
  //   return (
  //     <div className="py-5">
  //       <PatienPrescriptionsInfo />
  //       <PatientUploadDietChart />
  //     </div>
  //   );
  // };

  const content4 = () => {
    return (
      <div className="py-3">
        <DocPatientAppointments />
      </div>
    );
  };

  const content3 = () => {
    return (
      <div className="py-3">
        <DocPatientObservations />
      </div>
    );
  };

  const content2 = () => {
    return (
      <div className="py-3">
        <PatientAnswersTable />
        <FloatingForm />
      </div>
    );
  };
  const content1 = () => {
    return (
      <div className="py-3">
        <DocPatientPrescriptions />
        <DocPatientDietCharts />
      </div>
    );
  };

  // const content4 = () => {
  //   return (
  //     <div className="py-3">
  //       <PatientObservation />
  //     </div>
  //   );
  // };

  return (
    <>
      <div className="dashboard__Container">
        <PatientNav />

        <main>
          <div className="dashboard__Main-Content">
            <TabComponent heightAdjustMode="Auto">
              <TabItemsDirective>
                <TabItemDirective header={headerText[0]} content={content1} />
                <TabItemDirective header={headerText[1]} content={content2} />
                <TabItemDirective header={headerText[3]} content={content4} />
                <TabItemDirective header={headerText[2]} content={content3} />
              </TabItemsDirective>
            </TabComponent>
          </div>
        </main>
      </div>
      {/* <DocPatientFooter /> */}
    </>
  );
};

export default DocPatientMed;
