import React from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import PatientNav from "./PatientNav";
import PatientAppointmentInfo from "../../pages/form-validations/patient/PatientAppointmentInfo";

import PatientFooter from "./PatientFooter";
import { connect } from "react-redux";

class PatientAppointment extends React.Component {
  constructor() {
    super(...arguments);
    this.headerText = [
      //   { text: "Latest Prescriptions" },
      { text: "Appointments" },
      // { text: "Personal Observations" },
    ];
  }

  // content0() {
  //   return (
  //     <div className="py-5">
  //       <PatienPrescriptionsInfo />
  //       <PatientUploadDietChart />
  //     </div>
  //   );
  // }

  // content1() {
  //   return (
  //     <div className="py-3">
  //       <PatientAppointmentInfo />
  //     </div>
  //   );
  // }

  // content2() {
  //   return (
  //     <div className="py-3">
  //       <PatientObservation />
  //     </div>
  //   );
  // }

  render() {
    const { patientSignin } = this.props;
    const { patientInfo } = patientSignin;

    return (
      <>
        <div className="dashboard__Container ">
          <main>
            <div className="dashboard__Main-Content">
              {/* <TabComponent heightAdjustMode="Auto"> */}
              <PatientAppointmentInfo />
              {/* <TabItemsDirective>
                  <TabItemDirective
                    header={this.headerText[0]}
                    content={this.content0}
                  />
                  <TabItemDirective
                    header={this.headerText[0]}
                    content={this.content1}
                  />
                  <TabItemDirective
                    header={this.headerText[2]}
                    content={this.content2}
                  />
                </TabItemsDirective> */}
              {/* </TabComponent> */}
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

export default connect(mapStateToProps)(PatientAppointment);
