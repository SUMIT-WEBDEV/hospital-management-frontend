import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  activateDoctorReducer,
  editDoctorReducer,
  performanceDataReducer,
  activateDtChartReducer,
  activateformReducer,
  adminSigninReducer,
  deactivateDoctorReducer,
  deactivateDtChartReducer,
  deactivateformReducer,
  deitChartListReducer,
  doctorCreateReducer,
  doctorListReducer,
  everyDeitChartListReducer,
  PatientProgramReducer,
  patientAllDeitChartReducer,
  healthPlanReducer,
} from "./reducer/AdminReducer";
import {
  appointmentDateReducer,
  dietChartUploadReducer,
  doctorProfileListReducer,
  formCreateReducer,
  prescriptionCreateReducer,
  prescriptionPatientReducer,
  patientIdReducer,
  attachDietchartReducer,
} from "./reducer/DoctoreReducer";
import {
  appointmentCreateReducer,
  appointmentListReducer,
  doctorSigninReducer,
  enrollmentPatientReducer,
  formSubmitReducer,
  latestDietChartReducer,
  latestPrescriptionReducer,
  observationCreateReducer,
  observationListReducer,
  patientDetailsReducer,
  patientFormListReducer,
  patientListReducer,
  patientOtpReducer,
  patientProfileListReducer,
  patientSigninReducer,
  presctListReducer,
  patientUpdateReducer,
  AnsFormReducer,
  patientFirstReducer,
} from "./reducer/Patientreducer";
import { getEveryDietChart } from "./action/AdminAction";

const initialState = {
  patientSignin: {
    patientInfo: localStorage.getItem("patientInfo")
      ? JSON.parse(localStorage.getItem("patientInfo"))
      : null,
  },
  doctorSignin: {
    doctorInfo: localStorage.getItem("doctorInfo")
      ? JSON.parse(localStorage.getItem("doctorInfo"))
      : null,
  },

  adminSignin: {
    adminDocInfo: localStorage.getItem("adminDocInfo")
      ? JSON.parse(localStorage.getItem("adminDocInfo"))
      : null,
  },

  patientData: localStorage.getItem("patientData")
    ? JSON.parse(localStorage.getItem("patientData"))
    : null,
};

const reducer = combineReducers({
  updatedDoctor: editDoctorReducer,
  employeePerformance: performanceDataReducer,
  enrollmentPatient: enrollmentPatientReducer,
  patientList: patientListReducer,
  updatedPatient: patientUpdateReducer,
  patientDetails: patientDetailsReducer,
  dietChartUpload: dietChartUploadReducer,
  formCreate: formCreateReducer,
  patientFormList: patientFormListReducer,
  appointmentCreate: appointmentCreateReducer,
  appointmentList: appointmentListReducer,
  prescriptionCreate: prescriptionCreateReducer,
  doctorCreate: doctorCreateReducer,
  presctList: presctListReducer,
  patientOtp: patientOtpReducer,
  observationCreate: observationCreateReducer,
  observationList: observationListReducer,
  patientSignin: patientSigninReducer,
  doctorSignin: doctorSigninReducer,
  adminSignin: adminSigninReducer,
  patientProfileList: patientProfileListReducer,
  doctorProfileList: doctorProfileListReducer,
  doctorList: doctorListReducer,
  activateDoctor: activateDoctorReducer,
  deactivateDoctor: deactivateDoctorReducer,
  formSubmit: formSubmitReducer,
  latestPrescription: latestPrescriptionReducer,
  latestDietChart: latestDietChartReducer,
  deitChartList: deitChartListReducer,
  activateform: activateformReducer,
  deactivateform: deactivateformReducer,
  activateDtChart: activateDtChartReducer,
  deactivateDtChart: deactivateDtChartReducer,
  appointmentDate: appointmentDateReducer,
  prescriptionPatient: prescriptionPatientReducer,
  patientId: patientIdReducer,
  everyDietChart: everyDeitChartListReducer,
  patientProgram: PatientProgramReducer,
  attachDiet: attachDietchartReducer,
  patientDiet: patientAllDeitChartReducer,
  formAns: AnsFormReducer,
  patientFirstReducer,
  healthPlanReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
