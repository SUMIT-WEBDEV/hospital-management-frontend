import {
  CREATE_APPOINTMENT_FAIL,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_RESET,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_OBSERVATION_FAIL,
  CREATE_OBSERVATION_REQUEST,
  CREATE_OBSERVATION_RESET,
  CREATE_OBSERVATION_SUCCESS,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_SIGNOUT,
  ENROLMENT_PATIENT_FAIL,
  ENROLMENT_PATIENT_REQUEST,
  ENROLMENT_PATIENT_RESET,
  ENROLMENT_PATIENT_SUCCESS,
  GET_ALL_PATIENT_FAIL,
  GET_ALL_PATIENT_FORMS_FAIL,
  GET_ALL_PATIENT_FORMS_REQUEST,
  GET_ALL_PATIENT_FORMS_SUCCESS,
  GET_ALL_PATIENT_REQUEST,
  GET_ALL_PATIENT_SUCCESS,
  GET_APPOINTMENT_FAIL,
  GET_APPOINTMENT_REQUEST,
  GET_APPOINTMENT_SUCCESS,
  GET_LATEST_DIET_CHART_FAIL,
  GET_LATEST_DIET_CHART_REQUEST,
  GET_LATEST_DIET_CHART_SUCCESS,
  GET_LATEST_PRESCRIPTIONT_FAIL,
  GET_LATEST_PRESCRIPTION_REQUEST,
  GET_LATEST_PRESCRIPTION_SUCCESS,
  GET_OBSERVATION_FAIL,
  GET_OBSERVATION_REQUEST,
  GET_OBSERVATION_SUCCESS,
  GET_PATIENT_DETAILS_FAIL,
  GET_PATIENT_DETAILS_REQUEST,
  GET_PATIENT_DETAILS_SUCCESS,
  GET_PATIENT_PROFILE_FAIL,
  GET_PATIENT_PROFILE_REQUEST,
  GET_PATIENT_PROFILE_SUCCESS,
  GET_PRESCRIPTIONT_FAIL,
  GET_PRESCRIPTION_REQUEST,
  GET_PRESCRIPTION_SUCCESS,
  PATIENT_LOGIN_SUCCESS,
  PATIENT_SIGNOUT,
  // REGISTER_USER_FAIL,
  // REGISTER_USER_REQUEST,
  // REGISTER_USER_SUCCESS,
  SENDOTP_FAIL,
  SENDOTP_REQUEST,
  SENDOTP_RESET,
  SENDOTP_SUCCESS,
  SUBMIT_FORM_FAIL,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_RESET,
  SUBMIT_FORM_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  UPDATE_PATIENT_FAIL,
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_SUCCESS,
  UPDATE_FORM_REQUEST,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAIL,
  UPDATE_FORM_RESET,
  GET_ANS_FORMS_REQUEST,
  GET_ANS_FORMS_SUCCESS,
  GET_ANS_FORMS_FAIL,
  PAT_LOGIN_SUCCESS,
  UPDATE_PATIENT_RESET,
} from "../constant.js/PatientConstant";

export const enrollmentPatientReducer = (state = {}, action) => {
  switch (action.type) {
    case ENROLMENT_PATIENT_REQUEST:
      return { loading: true };
    case ENROLMENT_PATIENT_SUCCESS:
      return { loading: false, enrolment: action.payload, success: true };
    case ENROLMENT_PATIENT_FAIL:
      return { loading: false, error: action.payload };
    case ENROLMENT_PATIENT_RESET:
      return {};
    default:
      return state;
  }
};

export const patientListReducer = (
  state = { loading: true, patients: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_PATIENT_REQUEST:
      return { loading: true };
    case GET_ALL_PATIENT_SUCCESS:
      return { loading: false, patients: action.payload.data };
    case GET_ALL_PATIENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const patientUpdateReducer = (
  state = { loading: true, success: false },
  action
) => {
  switch (action.type) {
    case UPDATE_PATIENT_REQUEST:
      return { loading: true };
    case UPDATE_PATIENT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PATIENT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PATIENT_RESET:
      return {};
    default:
      return state;
  }
};

export const patientDetailsReducer = (
  state = { loadingPatientDetail: true, patient: [], success: false },
  action
) => {
  switch (action.type) {
    case GET_PATIENT_DETAILS_REQUEST:
      return { loadingPatientDetail: true, success: false };
    case GET_PATIENT_DETAILS_SUCCESS:
      localStorage.setItem("patientData", JSON.stringify(action.payload));
      return {
        loadingPatientDetail: false,
        patient: action.payload,
        success: true,
      };
    case GET_PATIENT_DETAILS_FAIL:
      return {
        loadingPatientDetail: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const patientFormListReducer = (
  state = { loading: true, forms: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_PATIENT_FORMS_REQUEST:
      return { loading: true };
    case GET_ALL_PATIENT_FORMS_SUCCESS:
      return { loading: false, forms: action.payload.data };
    case GET_ALL_PATIENT_FORMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AnsFormReducer = (
  state = { loadingAns: true, ansforms: [] },
  action
) => {
  switch (action.type) {
    case GET_ANS_FORMS_REQUEST:
      return { loadingAns: true };
    case GET_ANS_FORMS_SUCCESS:
      return { loadingAns: false, ansforms: action.payload.data };
    case GET_ANS_FORMS_FAIL:
      return { loadingAns: false, errorAns: action.payload };
    default:
      return state;
  }
};

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_APPOINTMENT_REQUEST:
      return { loading: true };
    case CREATE_APPOINTMENT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_APPOINTMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentListReducer = (
  state = { loading: true, appointment: [] },
  action
) => {
  switch (action.type) {
    case GET_APPOINTMENT_REQUEST:
      return { loading: true };
    case GET_APPOINTMENT_SUCCESS:
      return { loading: false, appointment: action.payload.data };
    case GET_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const presctListReducer = (
  state = { loading: true, presc: [] },
  action
) => {
  switch (action.type) {
    case GET_PRESCRIPTION_REQUEST:
      return { loading: true };
    case GET_PRESCRIPTION_SUCCESS:
      return { loading: false, presc: action.payload.data };
    case GET_PRESCRIPTIONT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const patientOtpReducer = (
  state = { loading: false, pId: [] },
  action
) => {
  switch (action.type) {
    case SENDOTP_REQUEST:
      return { loading: true };
    case SENDOTP_SUCCESS:
      return {
        loading: false,
        success: true,
        pId: action.payload.data.user_ids,
      };
    case SENDOTP_FAIL:
      return { loading: false, error: action.payload };
    case SENDOTP_RESET:
      return {};
    default:
      return state;
  }
};

export const patientSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case PATIENT_LOGIN_SUCCESS:
      return { loading: false, patientInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const patientFirstReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case PAT_LOGIN_SUCCESS:
      return { loading: false, patInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const doctorSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case DOCTOR_LOGIN_SUCCESS:
      return { loading: false, doctorInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const observationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_OBSERVATION_REQUEST:
      return { loading: true };
    case CREATE_OBSERVATION_SUCCESS:
      return { loading: false, success: true };
    case CREATE_OBSERVATION_FAIL:
      return { loading: false, error: true, msg: action.payload };
    case CREATE_OBSERVATION_RESET:
      return {};
    default:
      return state;
  }
};

export const observationListReducer = (
  state = { loading: true, observation: [] },
  action
) => {
  switch (action.type) {
    case GET_OBSERVATION_REQUEST:
      return { loading: true };
    case GET_OBSERVATION_SUCCESS:
      return { loading: false, observation: action.payload.data };
    case GET_OBSERVATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const patientProfileListReducer = (
  state = { loading: true, profile: [] },
  action
) => {
  switch (action.type) {
    case GET_PATIENT_PROFILE_REQUEST:
      return { loading: true };
    case GET_PATIENT_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload.data };
    case GET_PATIENT_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const formSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_FORM_REQUEST:
    case UPDATE_FORM_REQUEST:
      return { loading: true };
    case SUBMIT_FORM_SUCCESS:
    case UPDATE_FORM_SUCCESS:
      return { loading: false, success: true };
    case SUBMIT_FORM_FAIL:
    case UPDATE_FORM_FAIL:
      return { loading: false, error: action.payload };
    case SUBMIT_FORM_RESET:
    case UPDATE_FORM_RESET:
      return {};
    default:
      return state;
  }
};

export const latestPrescriptionReducer = (
  state = { loading: true, prescLatest: [] },
  action
) => {
  switch (action.type) {
    case GET_LATEST_PRESCRIPTION_REQUEST:
      return { loading: true };
    case GET_LATEST_PRESCRIPTION_SUCCESS:
      return { loading: false, prescLatest: action.payload.data };
    case GET_LATEST_PRESCRIPTIONT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const latestDietChartReducer = (
  state = { loading: true, deitChartLatest: [] },
  action
) => {
  switch (action.type) {
    case GET_LATEST_DIET_CHART_REQUEST:
      return { loading: true };
    case GET_LATEST_DIET_CHART_SUCCESS:
      return { loading: false, deitChartLatest: action.payload.data };
    case GET_LATEST_DIET_CHART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
