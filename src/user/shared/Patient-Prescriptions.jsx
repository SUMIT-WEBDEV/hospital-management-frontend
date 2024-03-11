import React from "react";
import PatientNav from "./PatientNav";
import PatienPrescriptionsInfo from "../../pages/form-validations/patient/PatienPrescriptionsInfo";
import PatientAppointmentInfo from "../../pages/form-validations/patient/PatientAppointmentInfo";
import PatientObservation from "../../pages/form-validations/patient/PatientObservation";
import PatientUploadDietChart from "../../pages/form-validations/patient/PatientUploadDietChart";

const PatientPrescriptions = () => {
  return (
    <>
      <div className="dashboard__Container">
        <PatientNav />
        <main>
          <div className="dashboard__Main-Content">
            {/* Replace with your content */}
            <div className="dashboard__Main-Inner-Content">
              <ul
                className="nav tabs__List-Container"
                id="tabs-tabJustify"
                role="tablist"
              >
                <li
                  className="tabs__List-Item"
                  role="presentation"
                >
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
                    Latest Prescriptions
                  </a>
                </li>
                <li
                  className="tabs__List-Item"
                  role="presentation"
                >
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
                    Appointments
                  </a>
                </li>
                <li
                  className="tabs__List-Item"
                  role="presentation"
                >
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
                    Personal Observations
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="tabs-tabContentJustify">
                <div
                  className="tab-pane fade show active"
                  id="tabs-appointmentJustify"
                  role="tabpanel"
                  aria-labelledby="tabs-appointment-tabJustify"
                >
                  <PatienPrescriptionsInfo />
                  <PatientUploadDietChart />
                </div>
                <div
                  className="tab-pane fade"
                  id="tabs-mypatientsJustify"
                  role="tabpanel"
                  aria-labelledby="tabs-mypatients-tabJustify"
                >
                 <PatientAppointmentInfo /> 
                </div>
                <div
                  className="tab-pane fade"
                  id="tabs-chatJustify"
                  role="tabpanel"
                  aria-labelledby="tabs-chat-tabJustify"
                >
                  <PatientObservation />
                </div>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
      {/* <footer className="relative text-center text-white">
        <div className="container pt-9 bg-gray-600 w-full fixed bottom-0 left-0">
          <div className="flex justify-center mb-9">
            <a
              href="/userrole/:roleid/dashboard/patient/mydata/"
              className="mr-9 text-white"
            >
              My Data
            </a>
            <a
              href="/userrole/:roleid/dashboard/patient/prescriptions/"
              className="mr-9 text-white font-bold"
            >
              Prescriptions
            </a>
            <a
              href="/userrole/:roleid/dashboard/common/chat/"
              className="mr-9 text-white"
            >
              Chat
            </a>
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default PatientPrescriptions;
