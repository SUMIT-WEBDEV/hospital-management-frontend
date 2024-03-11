import React from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";

import FloatingForm from "../../shared/Floating-Form";
import PatientNav from "../../../user/shared/PatientNav";
import PatientFooter from "../../../user/shared/PatientFooter";
import { Form1 } from "../../shared/MultiForms";

export default class DocToPatient extends React.Component {
  constructor() {
    super(...arguments);
  }
  content0() {
    return (
      <div className="py-5">
        <Form1 type="daily" />
      </div>
    );
  }
  content1() {
    return (
      <div className="py-3">
        <Form1 type="weekly" />
      </div>
    );
  }
  content2() {
    return (
      <div className="py-3">
        <Form1 type="bi-weekly" />
      </div>
    );
  }

  render() {
    return (
      <>
        <div className="dashboard__Container">
          <PatientNav />
          <main>
            <div className="dashboard__Main-Content"></div>
          </main>
        </div>
        <FloatingForm />
        <PatientFooter />
      </>
    );
  }
}
