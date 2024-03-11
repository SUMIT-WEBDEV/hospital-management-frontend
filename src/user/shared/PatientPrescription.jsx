import React from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import PatientNav from "./PatientNav";
import PatienPrescriptionsInfo from "../../pages/form-validations/patient/PatienPrescriptionsInfo";
import PatientAppointmentInfo from "../../pages/form-validations/patient/PatientAppointmentInfo";
import PatientObservation from "../../pages/form-validations/patient/PatientObservation";
import PatientUploadDietChart from "../../pages/form-validations/patient/PatientUploadDietChart";

import PatientFooter from "./PatientFooter";
import { connect } from "react-redux";

class PatientPrescription extends React.Component {
  constructor() {
    super(...arguments);
    this.headerText = [
      { text: "L" },
      // { text: "Appointments" },
      // { text: "Personal Observations" },
    ];
  }

  content0() {
    return (
      <div className="py-5">
        <PatienPrescriptionsInfo />
        <PatientUploadDietChart />
      </div>
    );
  }

  content1() {
    return (
      <div className="py-3">
        <PatientAppointmentInfo />
      </div>
    );
  }

  content2() {
    return (
      <div className="py-3">
        <PatientObservation />
      </div>
    );
  }

  render() {
    const { patientSignin } = this.props;
    const { patientInfo } = patientSignin;

    return (
      <>
        <div className="dashboard__Container">
          <main>
            <div className="dashboard__Main-Content">
              <div className="py-5">
                <PatienPrescriptionsInfo />
                <PatientUploadDietChart />
              </div>
            </div>
          </main>
        </div>
        {/* <PatientFooter /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  patientSignin: state.patientSignin,
});

export default connect(mapStateToProps)(PatientPrescription);
