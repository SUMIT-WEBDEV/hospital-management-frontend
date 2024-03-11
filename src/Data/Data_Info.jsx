import React from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const doctorGridImage = (props) => (
  <div className="image flex gap-4">
    <div>
      <p>{props.DoctorName}</p>
    </div>
  </div>
);

export const patientGridImage = (props) => (
  <div className="image flex gap-4">
    <div>
      <p>{props.PatientName}</p>
    </div>
  </div>
);

export const actionGridImage = () => (
  <div className="image flex">
    <div>
      <p className="text-center text-3xl hover:text-emerald-600">
        <FiEye />
      </p>
    </div>
  </div>
);

export const observedGridID = (props) => (
  <div className="image flex gap-2">
    <div>
      <p>{props.ObservationID}</p>
    </div>
  </div>
);

export const observedGridImage = (props) => (
  <div className="image flex gap-2">
    <div>
      <p>{props.ObservedName}</p>
    </div>
  </div>
);

export const observedGridDate = (props) => (
  <div className="image flex gap-2">
    <div>
      <p>{props.ObservedDate}</p>
    </div>
  </div>
);

export const AppointmentInfo = [
  {
    AppointmentID: 1,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    AppointmentDate: "12-12-2022",
    AppointmentTime: "2:00 PM",
  },
  {
    AppointmentID: 2,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    AppointmentDate: "12-12-2022",
    AppointmentTime: "2:00 PM",
  },
  {
    AppointmentID: 3,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    AppointmentDate: "12-12-2022",
    AppointmentTime: "2:00 PM",
  },
  {
    AppointmentID: 4,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    AppointmentDate: "12-12-2022",
    AppointmentTime: "2:00 PM",
  },
  {
    AppointmentID: 4,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    AppointmentDate: "12-12-2022",
    AppointmentTime: "2:00 PM",
  },
  {
    AppointmentID: 4,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    AppointmentDate: "12-12-2022",
    AppointmentTime: "2:00 PM",
  },
];
const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + "...." : str;
};


export const AppointmentGrid = [
  { type: "Checkbox", width: "50" },
  {
    field: "RowCount",
    headerText: "RowCountAI",
    width: "150",
    textAlign: "Center",
    isPrimaryKey: true,
    template: doctorGridImage,
  },
  {
    field: "doctorId",
    headerText: "DoctorName",
    width: "150",
    textAlign: "Center",
    // template: doctorGridImage,
  },
  {
    field: "patientId",
    headerText: "PatientName",
    width: "150",
    textAlign: "Center",
    // template: patientGridImage,
  },
  {
    field: truncate('date',5),
    headerText: "AppointmentDate",
    width: "150",
    textAlign: "Center",
    type: 'date',
     skeleton:'short',
     maxLength:'10',
  },
  {
    field: "doctorId",
    headerText: "AppointmentTime",
    width: "150",
    textAlign: "Center",
  },
];
// const navigates=()=>{
// let navigate= useNavigate()


//   navigate('/')
// }

export const PatientInfo = [
  {
    PatientID: 1,
    DoctorName: "Rajiv Singhlas",
    PatientName: "Arjun Pandey",
    HealthPlan: "12-12-2022",
    iconCss: <FiEye />,
  },
  {
    PatientID: 2,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    HealthPlan: "12-12-2022",
    iconCss: <FiEye />,
  },
  {
    PatientID: 3,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    HealthPlan: "12-12-2022",
    iconCss: <FiEye />,
  },
  {
    PatientID: 4,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    HealthPlan: "12-12-2022",
    iconCss: <FiEye />,
  },
];

export const PatientGrid = [
  { type: "Checkbox", width: "50" },
  {
    field: "patientId",
    headerText: "PatientID",
    width: "50",
    textAlign: "Center",
    isPrimaryKey: true,
  },
  {
    field: "doctorId",
    headerText: "DoctorName",
    width: "100",
    textAlign: "Center",
    // template: doctorGridImage,
  },
  {
    field: "name",
    headerText: "PatientName",
    width: "100",
    textAlign: "Center",
    // template: patientGridImage,
  },
  {
    field: "health_plan",
    headerText: "HealthPlan",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "Action",
    headerText: "Actions",
    width: "100",
    textAlign: "Center",
    template: actionGridImage,
  },
];

export const PatientAppointmentInfo = [
  {
    AppointmentID: 1,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    AppointmentDate: "12-12-2022",
    AppointmentTime: "2:00 PM",
  },
  {
    AppointmentID: 2,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    AppointmentDate: "12-12-2022",
    AppointmentTime: "2:00 PM",
  },
  {
    AppointmentID: 3,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    AppointmentDate: "12-12-2022",
    AppointmentTime: "2:00 PM",
  },
  {
    AppointmentID: 4,
    DoctorName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    AppointmentDate: "12-12-2022",
    AppointmentTime: "2:00 PM",
  },
];

export const PatientAppointmentGrid = [
  { type: "Checkbox", width: "50" },
  {
    field: "index",
    headerText: "AppointmentID",
    width: "150",
    textAlign: "Center",
    isPrimaryKey: true,
    template: doctorGridImage,
  },
  {
    field: "doctorId",
    headerText: "DoctorName",
    width: "150",
    textAlign: "Center",
    // template: doctorGridImage,
  },
  {
    field: "patientId",
    headerText: "PatientName",
    width: "150",
    textAlign: "Center",
    // template: patientGridImage,
  },
  {
    field: "date",
    headerText: "AppointmentDate",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "doctorId",
    headerText: "AppointmentTime",
    width: "150",
    textAlign: "Center",
  },
];

export const ObservedInfo = [
  {
    ObservationID: 1,
    ObservedName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    ObservedDate: "12-12-2022",
  },
  {
    ObservationID: 2,
    ObservedName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    ObservedDate: "12-12-2022",
  },
  {
    ObservationID: 3,
    ObservedName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    ObservedDate: "12-12-2022",
  },
  {
    ObservationID: 4,
    ObservedName: "Rajiv Singhla",
    PatientName: "Arjun Pandey",
    ObservedDate: "12-12-2022",
  },
];

export const ObservationGrid = [
  { type: "Checkbox", width: "50" },
  {
    field: "desc",
    headerText: "Description",
    width: "100",
    textAlign: "Left",
    isPrimaryKey: true,
    // template: observedGridID,
  },
  // {
  //   field: "ObservedName",
  //   headerText: "ObservedName",
  //   width: "100",
  //   textAlign: "Left",
  //   template: observedGridImage,
  // },
  // {
  //   field: "name",
  //   headerText: "PatientName",
  //   width: "100",
  //   textAlign: "Left",
  //   template: patientGridImage,
  // },
  {
    field: "createdOn",
    headerText: "ObservedDate",
    width: "100",
    textAlign: "Left",
    // template: observedGridDate,
  }
];