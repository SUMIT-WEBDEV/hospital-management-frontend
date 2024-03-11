import React from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";

import DocAppointment from "./DocAppointment";
import DocPatients from "./DocPatients";
import ChatBox from "../../shared/ChatBox";
import DoctorVisitor from "./DoctorVisitor";
import { Navigate } from "react-router-dom";
import InboxComponent from "./../../../chat/InboxComponent";

const doctorString = localStorage.getItem("doctorInfo");
const doctor = JSON.parse(doctorString);
// console.log("doctorrrrrrrr", doctor.user._id);
// console.log("doctorrrrrrrr", doctor?.user);

export default class DoctorTabs extends React.Component {
  constructor() {
    super(...arguments);
    this.headerText = [
      { text: "Appointments" },
      { text: "My Patients" },
      { text: "Inbox" },
    ];
  }

  content0() {
    return (
      <div className="py-5">
        <DocAppointment />
      </div>
    );
  }
  content1() {
    return (
      <div className="py-3">
        <DoctorVisitor />
      </div>
    );
  }
  content2() {
    return (
      <div className="py-3">
        <InboxComponent />
      </div>
    );
  }

  // content3() {
  //   window.location.href =
  //     "https://64d1de2445b85031ed1586cb--teal-tapioca-0e9dea.netlify.app/";
  // }

  // content3() {
  //   const id = "287368233284e";
  //   // const dataString = JSON.stringify(data);
  //   // const hash = encodeURIComponent(dataString);
  //   const url = `http://localhost:5173/${doctor.user._id}`;
  //   // const url = `https://64d1de2445b85031ed1586cb--teal-tapioca-0e9dea.netlify.app/#${hash}`;
  //   window.location.href = url;
  // }

  render() {
    return (
      <>
        <TabComponent heightAdjustMode="Auto">
          <TabItemsDirective>
            <TabItemDirective
              header={this.headerText[0]}
              content={this.content0}
            />
            <TabItemDirective
              header={this.headerText[1]}
              content={this.content1}
            />
            {/* <TabItemDirective
              header={this.headerText[2]}
              content={this.content2}
            /> */}

            <TabItemDirective
              header={this.headerText[2]}
              content={this.content2}
            />
          </TabItemsDirective>
        </TabComponent>
      </>
    );
  }
}
