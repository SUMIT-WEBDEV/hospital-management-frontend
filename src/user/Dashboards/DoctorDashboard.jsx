import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import FloatingButton from "../../pages/shared/Floating-Button";
import DoctorAppointment from "../../pages/form-validations/doctor/DoctorAppointment";
import DoctorVisitor from "../../pages/form-validations/doctor/DoctorVisitor";
import ChatUI from "../../pages/shared/ChatUI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listPatients } from "../../action/PatientAction";

import DoctorTabs from "../../pages/form-validations/doctor/DocTabs";

const DoctorDashboard = () => {
  // const [today, setToday] = useState("");

  // useEffect(() => {
  //   const currentDay = new Date().toISOString().split("T")[0];
  //   setToday(currentDay);
  // }, []);

  return (
    <>
      <div className="dashboard__Container">
        <Navbar />

        <main>
          <div className="dashboard__Main-Content">
            {/* Replace with your content */}
            <div className="dashboard__Main-Inner-Content">
              {/* <ul
                className="nav tabs__List-Container"
                id="tabs-tabJustify"
                role="tablist"
              >
                <li className="tabs__List-Item" role="presentation">
                  <a
                    href="#tabs-appointmentJustify"
                    className="tabs__List-Link"
                    id="tabs-appointment-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-appointmentJustify"
                    role="tab"
                    aria-controls="tabs-appointmentJustify"
                    aria-selected="true"
                  >
                    Appointments
                  </a>
                </li>
                <li className="tabs__List-Item" role="presentation">
                  <a
                    href="#tabs-mypatientsJustify"
                    className="tabs__List-Link"
                    id="tabs-mypatients-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-mypatientsJustify"
                    role="tab"
                    aria-controls="tabs-mypatientsJustify"
                    aria-selected="false"
                  >
                    MyPatients
                  </a>
                </li>
                <li className="tabs__List-Item" role="presentation">
                  <a
                    href="#tabs-chatJustify"
                    className="tabs__List-Link"
                    id="tabs-chat-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-chatJustify"
                    role="tab"
                    aria-controls="tabs-chatJustify"
                    aria-selected="false"
                  >
                    Chat
                  </a>
                </li>
              </ul>
              <div className="tabs__Content" id="tabs-tabContentJustify">
                <div
                  className="tab-pane fade show active"
                  id="tabs-appointmentJustify"
                  role="tabpanel"
                  aria-labelledby="tabs-appointment-tabJustify"
                >
                  <DoctorAppointment />
                </div>
                <div
                  className="tab-pane fade"
                  id="tabs-mypatientsJustify"
                  role="tabpanel"
                  aria-labelledby="tabs-mypatients-tabJustify"
                >
                  <DoctorVisitor />
                </div>
                <div
                  className="tab-pane fade"
                  id="tabs-chatJustify"
                  role="tabpanel"
                  aria-labelledby="tabs-chat-tabJustify"
                >
                  <ChatUI />
                </div>
              </div> */}
              <DoctorTabs />
            </div>
            {/* /End replace */}
            <FloatingButton />
          </div>
        </main>
      </div>
    </>
  );
};

export default DoctorDashboard;
