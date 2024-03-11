import React from "react";

import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import PatientNav from "./PatientNav";
import PatientFooter from "./PatientFooter";
import { Form1 } from "../../pages/shared/MultiForms";
import FloatingForm from "../../pages/shared/Floating-Form";
import PatientAnswersTable from "../../pages/form-validations/patient/patientAnswersTable";
import PatientPrescription from "./PatientPrescription";
import PatientAppointment from "./PatientAppointment";
import Doctors from "./Doctors";
import InboxComponent from "../../chat/InboxComponent";

export default class PatientDataTab extends React.Component {
  constructor() {
    super(...arguments);

    this.headerText = [
      { text: "My Forms" },
      { text: "Prescriptions" },
      { text: "Appointments" },
      // { text: "Monthly Forms" },
      // { text: "One Time Forms" },
      { text: "My Response" },
      { text: "Chat" },
    ];
  }

  content0() {
    return (
      <div className="py-5">
        <Form1 type="" />
        {/* <Form1 type="daily" />
        <Form1 type="weekly" />
        <Form1 type="biweekly" />
        <Form1 type="monthly" />
        <Form1 type="onetime" /> */}
      </div>
    );
  }

  content1() {
    return (
      <div className="py-3">
        {/* <Form1 type="weekly" /> */}
        <PatientPrescription />
        {/* <Doctors /> */}
      </div>
    );
  }
  content2() {
    return (
      <div className="py-3">
        {/* <Form1 type="biweekly" /> */}
        <PatientAppointment />
      </div>
    );
  }

  content3() {
    return (
      <div className="py-3">
        {/* <Form1 type="monthly" /> */}
        <PatientAnswersTable />
      </div>
    );
  }

  content4() {
    return (
      <div className="py-3">
        <Form1 type="onetime" />
      </div>
    );
  }

  content5() {
    return (
      <div className="py-3">
        <PatientAnswersTable />
      </div>
    );
  }
  content8() {
    return (
      <div className="py-3">
        {/* <Doctors /> */}
        <InboxComponent />
      </div>
    );
  }

  selected(e) {
    if (e.isSwiped) {
      e.cancel = true;
    }
  }

  render() {
    // const load = null;
    return (
      <>
        <div className="dashboard__Container">
          <PatientNav />
          <main>
            <div className="dashboard__Main-Content">
              <TabComponent heightAdjustMode="Auto" selecting={this.selected}>
                <TabItemsDirective>
                  <TabItemDirective
                    header={this.headerText[0]}
                    content={this.content0}
                  />
                  <TabItemDirective
                    header={this.headerText[1]}
                    content={this.content1}
                  />
                  <TabItemDirective
                    header={this.headerText[2]}
                    content={this.content2}
                  />
                  <TabItemDirective
                    header={this.headerText[3]}
                    content={this.content3}
                  />
                  <TabItemDirective
                    header={this.headerText[4]}
                    content={this.content8}
                  />
                </TabItemsDirective>
              </TabComponent>
            </div>
          </main>
        </div>
        <div className="bg-red-500 abo top-96"></div>

        {/* <PatientFooter /> */}
      </>
    );
  }
}
