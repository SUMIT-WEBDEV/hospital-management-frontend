import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Login Page Import
import Login from "./user/shared/Login";

// Doctor Dashboard Page Imports
import DoctorDashboard from "./user/Dashboards/DoctorDashboard";
import MultistepForm from "./pages/form-validations/MultistepForm";
import CreatePatient from "./pages/form-validations/patient/CreatePatient";
import PatientHealthInfo from "./pages/form-validations/patient/PatientHealthInfo";
import PatientPersonalInfo from "./pages/form-validations/patient/PatientPersonalInfo";
import CreateForm from "./pages/form-validations/patient/CreateForm";
import UploadDietChart from "./pages/form-validations/patient/UploadDietChart";
import DoctorMeetingInfo from "./pages/form-validations/doctor/DoctorMeetingInfo";
import DocProfile from "./pages/form-validations/Profiles/DocProfile";

import DocToPatient from "./pages/form-validations/doctor/DocToPatient";

// Doc Permissions Page Imports
import DocPatientBoard from "./user/Dashboards/DocPatientBoard";
import DocPatientMed from "./user/Dashboards/DocPatientMed";

// Patient Dashboard Page Imports
import PatientDashboard from "./user/Dashboards/PatientDashboard";
import PatientDataTab from "./user/shared/PatientDataTab";
import PatientPrescription from "./user/shared/PatientPrescription";
import PatientForm from "./pages/form-validations/patient/PatientForm";
import PatientMeetingInfo from "./pages/form-validations/patient/PatientMeetingInfo";
import PatientProfile from "./pages/form-validations/Profiles/PatientProfile";
import PatientEnrolments from "./user/shared/PatientEnrolments";
import PatientMyInfoTab from "./user/shared/PatientMyInfoTab";

//Common Page Imports
import UserChat from "./user/shared/UserChat";

//SUPER PAGE IMPORTS
import Admin from "./user/Dashboards/SuperAdmin";
import EnrolmentsView from "./pages/form-validations/admin/EnrolmentsView";
import EmployeSummary from "./pages/form-validations/admin/EmployeSummary";
import "../src/App.css";
import DoctorRoute from "./Components/DoctorRoute";
import AdminRoute from "./Components/AdminRoute";
import PatientRoute from "./Components/PatientRoute";
import CustomForms from "./user/shared/CustomForms";

import CustomCharts from "./user/shared/CustomCharts";
import PatientAppointment from "./user/shared/PatientAppointment";
import MiddlePatientPage from "./pages/form-validations/Profiles/MiddlePatientPage";
import AdminProfile from "./pages/form-validations/Profiles/AdminProfile";
// import InboxComponent from "./chat/InboxComponent";
// import Inbox from "./chat/Inbox";
// import ChatMain from "./chat/ChatMain";
// import Chat from "./chat/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userrole/selectUser/" element={<MiddlePatientPage />} />

        <Route
          path="/userrole/:roleid/dashboard/doctor/"
          element={
            <DoctorRoute>
              <DoctorDashboard />
            </DoctorRoute>
          }
        />

        {/* <Route
          path="/userrole/:roleid/dashboard/doctor/chat/"
          element={<InboxComponent />}
        />

        <Route
          path="/userrole/:roleid/dashboard/patient/mydata/chat/"
          element={<InboxComponent />}
        /> */}

        <Route path="/patient" element={<DoctorMeetingInfo />} />

        <Route
          path="/userrole/:roleid/dashboard/doctor/multistep/"
          element={<MultistepForm />}
        />

        <Route
          path="/userrole/:roleid/dashboard/doctor/enrol/patient/"
          element={
            <DoctorRoute>
              <CreatePatient />
            </DoctorRoute>
          }
        />

        <Route
          path="/userrole/:roleid/dashboard/doctor/enrol/healthinfo/"
          element={
            <DoctorRoute>
              <PatientHealthInfo />
            </DoctorRoute>
          }
        />

        <Route
          path="/userrole/:roleid/dashboard/doctor/enrol/personalinfo/"
          element={
            <DoctorRoute>
              <PatientPersonalInfo />
            </DoctorRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/doctor/create/form/"
          element={
            <DoctorRoute>
              <CreateForm />
            </DoctorRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/doctor/create/dietchart/"
          element={
            <DoctorRoute>
              <UploadDietChart />
            </DoctorRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/doctor/meeting/info/"
          element={
            <DoctorRoute>
              <DoctorMeetingInfo />
            </DoctorRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/doctor/profile/"
          element={
            <DoctorRoute>
              <DocProfile />
            </DoctorRoute>
          }
        />

        <Route
          path="/userrole/:roleid/dashboard/patient/"
          element={
            <PatientRoute>
              <PatientDashboard />
            </PatientRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/patient/mydata/"
          element={
            <PatientRoute>
              <PatientDataTab />
            </PatientRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/patient/mydata/forms/"
          element={
            <PatientRoute>
              <PatientForm />
            </PatientRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/patient/prescriptions/"
          element={
            <PatientRoute>
              <PatientPrescription />
            </PatientRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/patient/appointment/"
          element={
            <PatientRoute>
              <PatientAppointment />
            </PatientRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/patient/meeting/info/"
          element={
            <PatientRoute>
              <PatientMeetingInfo />
            </PatientRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/patient/profile/"
          element={
            <PatientRoute>
              <PatientProfile />
            </PatientRoute>
          }
        />
        {/* Only Doc Routes in patient dashboard */}
        <Route
          path="/userrole/:roleid/dashboard/patient/all/enrolments/"
          element={
            <DoctorRoute>
              <PatientEnrolments />
            </DoctorRoute>
          }
        />
        <Route
          path="/userrole/:roleid/dashboard/patient/myinfo/"
          element={
            <DoctorRoute>
              <PatientMyInfoTab />
            </DoctorRoute>
          }
        />
        {/* <Route
          path="/userrole/:roleid/dashboard/patient/forms/"
          element={
            <DoctorRoute>
              <DocPatientBoard />
            </DoctorRoute>
          }
        /> */}
        <Route
          path="/userrole/:roleid/dashboard/patient/info/"
          element={
            <DoctorRoute>
              <DocPatientMed />
            </DoctorRoute>
          }
        />
        {/* Only Doc Routes in patient dashboard */}
        <Route
          path="/userrole/:roleid/dashboard/common/chat/"
          element={<UserChat />}
        />
        <Route
          path="/Admin/dashboard/"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/Admin/dashboard/profile/"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />
        <Route
          path="/Admin/dashboard/patient/enrolment/view/"
          element={
            <AdminRoute>
              <EnrolmentsView />
            </AdminRoute>
          }
        />
        <Route
          path="/Admin/dashboard/summary/employee/view/"
          element={
            <AdminRoute>
              <EmployeSummary />
            </AdminRoute>
          }
        />
        <Route
          path="/Admin/dashboard/forms/"
          element={
            <AdminRoute>
              <CustomForms />
            </AdminRoute>
          }
        />
        <Route
          path="/Admin/dashboard/charts/"
          element={
            <AdminRoute>
              <CustomCharts />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
