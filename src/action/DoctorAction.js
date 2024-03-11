import axios from "axios";
import {
  ATTACH_DIET_FAIL,
  ATTACH_DIET_REQUEST,
  ATTACH_DIET_SUCCESS,
  CREATE_FORM_FAIL,
  CREATE_FORM_REQUEST,
  CREATE_FORM_SUCCESS,
  CREATE_PRESC_FAIL,
  CREATE_PRESC_REQUEST,
  CREATE_PRESC_SUCCESS,
  GET_APPOINTMENT_WITH_DATE_REQUEST,
  GET_APPOINTMENT_WITH_DATE_SUCCESS,
  GET_DOCTOR_PROFILE_FAIL,
  GET_DOCTOR_PROFILE_REQUEST,
  GET_DOCTOR_PROFILE_SUCCESS,
  GET_PATIENT_OLDPRESC_FAIL,
  GET_PATIENT_OLDPRESC_REQUEST,
  GET_PATIENT_OLDPRESC_SUCCESS,
  UPDATE_PATIENT_FAIL,
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_SUCCESS,
  UPLOAD_DIET_CHART_FAIL,
  UPLOAD_DIET_CHART_REQUEST,
  UPLOAD_DIET_CHART_SUCCESS,
} from "../constant.js/DoctorConstant";
import {
  GET_APPOINTMENT_FAIL,
  GET_LATEST_PRESCRIPTIONT_FAIL,
  GET_LATEST_PRESCRIPTION_REQUEST,
  GET_LATEST_PRESCRIPTION_SUCCESS,
  Url,
  GET_PATIENT_PROFILE_FAIL,
  GET_PATIENT_PROFILE_SUCCESS,
  GET_PATIENT_PROFILE_REQUEST,
  GET_LATEST_DIET_CHART_REQUEST,
  GET_LATEST_DIET_CHART_SUCCESS,
  GET_LATEST_DIET_CHART_FAIL,
  UPDATE_FORM_REQUEST,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAIL,
} from "../constant.js/PatientConstant";
import Swal from "sweetalert2";

export const uploadDietCharts =
  (
    calorie_lower,
    calorie_upper,
    ch_lower,
    ch_upper,
    protiens,
    fats,
    food_type,
    cuisine_type,
    dietChart
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPLOAD_DIET_CHART_REQUEST });
      const {
        doctorSignin: { doctorInfo },
      } = getState();

      console.log("helllo");
      console.log(calorie_lower);

      const formData = new FormData();
      formData.append("calorie_lower", calorie_lower);
      formData.append("calorie_upper", calorie_upper);
      formData.append("ch_lower", ch_lower);
      formData.append("ch_upper", ch_upper);
      formData.append("protiens", protiens);
      formData.append("fats", fats);
      formData.append("food_type", food_type);
      formData.append("cuisine_type", cuisine_type);
      formData.append("file", dietChart, dietChart.name);

      console.log("helllo world");
      console.log(formData);

      const { data } = await axios.post(
        `${Url}/doctors/add-diet-chart`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${doctorInfo.token}`,
          },
        }
      );
      // console.log(data);

      dispatch({ type: UPLOAD_DIET_CHART_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      dispatch({ type: UPLOAD_DIET_CHART_FAIL, payload: message });
    }
  };

export const createForm =
  (form_title, questions) => async (dispatch, getState) => {
    dispatch({ type: CREATE_FORM_REQUEST });
    const {
      doctorSignin: { doctorInfo },
    } = getState();
    try {
      console.log("questions", questions);

      const { data } = await axios.post(
        `${Url}/doctors/add-form`,
        { form_title, questions },
        {
          headers: { Authorization: `Bearer ${doctorInfo.token}` },
        }
      );

      dispatch({ type: CREATE_FORM_SUCCESS, payload: data });
    } catch (error) {
      // console.log(error.response.data.message,'error')
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      dispatch({ type: CREATE_FORM_FAIL, payload: message });
    }
  };

// update form type
export const updateForm =
  (id, selectedForm, selectedFrequency) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_FORM_REQUEST });
    const {
      doctorSignin: { doctorInfo },
    } = getState();
    try {
      const formData = new FormData();
      formData.append("patientId", id);
      formData.append("formId", selectedForm);
      formData.append("formType", selectedFrequency);

      const { data } = await axios.put(`${Url}/forms/set-type`, formData, {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(data);

      dispatch({ type: UPDATE_FORM_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      dispatch({ type: UPDATE_FORM_FAIL, payload: message });
    }
  };

export const createPrescription =
  (patientId, prescriptions) => async (dispatch, getState) => {
    dispatch({ type: CREATE_PRESC_REQUEST });
    const {
      doctorSignin: { doctorInfo },
    } = getState();

    try {
      const { data } = await axios.post(
        `${Url}/presc/add`,
        { patientId, prescriptions },
        {
          headers: { Authorization: `Bearer ${doctorInfo.token}` },
        }
      );

      dispatch({ type: CREATE_PRESC_SUCCESS, payload: data });
      console.log(data);
    } catch (error) {
      console.log(error.response.data.message, "error");
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      dispatch({ type: CREATE_PRESC_FAIL, payload: message });
    }
  };

export const getDoctorProfile = () => async (dispatch, getState) => {
  dispatch({ type: GET_DOCTOR_PROFILE_REQUEST });
  const {
    doctorSignin: { doctorInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${Url}/profile/doctor`, {
      headers: { Authorization: `Bearer ${doctorInfo.token}` },
    });
    dispatch({ type: GET_DOCTOR_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GET_DOCTOR_PROFILE_FAIL, payload: message });
  }
};

export const updatePatient = (room, id) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PATIENT_REQUEST, room });
  const {
    doctorSignin: { doctorInfo },
  } = getState();

  console.log("room", room);
  try {
    const { data } = await axios.put(
      `${Url}/doctors/edit-patient/${id}`,
      room,
      {
        headers: { Authorization: `Bearer ${doctorInfo.token}` },
      }
    );
    dispatch({ type: UPDATE_PATIENT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_PATIENT_FAIL, payload: message });
  }
};

export const getAppointmentOnDate = (date) => async (dispatch, getState) => {
  dispatch({ type: GET_APPOINTMENT_WITH_DATE_REQUEST });
  const {
    doctorSignin: { doctorInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${Url}/appointments/get-all/${date}`, {
      headers: { Authorization: `Bearer ${doctorInfo.token}` },
    });
    dispatch({ type: GET_APPOINTMENT_WITH_DATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GET_APPOINTMENT_FAIL, payload: message });
  }
};

export const getPatientOldPresc = (id) => async (dispatch, getState) => {
  dispatch({ type: GET_PATIENT_OLDPRESC_REQUEST });
  const {
    doctorSignin: { doctorInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${Url}/presc/get/${id}`, {
      headers: { Authorization: `Bearer ${doctorInfo.token}` },
    });
    dispatch({ type: GET_PATIENT_OLDPRESC_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GET_PATIENT_OLDPRESC_FAIL, payload: message });
  }
};

export const getLatesPrescriptionForDoctor =
  (id) => async (dispatch, getState) => {
    dispatch({ type: GET_LATEST_PRESCRIPTION_REQUEST });
    const {
      doctorSignin: { doctorInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${Url}/presc/latest-presc-by-doctor/${id}`,
        {
          headers: { Authorization: `Bearer ${doctorInfo.token}` },
        }
      );
      dispatch({ type: GET_LATEST_PRESCRIPTION_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: GET_LATEST_PRESCRIPTIONT_FAIL, payload: message });
    }
  };

export const getLatesDietChartByDoctor = (id) => async (dispatch, getState) => {
  dispatch({ type: GET_LATEST_DIET_CHART_REQUEST });
  const {
    doctorSignin: { doctorInfo },
  } = getState();
  try {
    const { data } = await axios.get(
      `${Url}/diet-charts/latest-diet-by-doctor/${id}`,
      {
        headers: { Authorization: `Bearer ${doctorInfo.token}` },
      }
    );

    dispatch({ type: GET_LATEST_DIET_CHART_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GET_LATEST_DIET_CHART_FAIL, payload: message });
  }
};

export const getPatientProfileByDoctor = (id) => async (dispatch, getState) => {
  dispatch({ type: GET_PATIENT_PROFILE_REQUEST });

  const {
    doctorSignin: { doctorInfo },
  } = getState();

  try {
    const { data } = await axios.get(`${Url}/doctors/patient/${id}`, {
      headers: { Authorization: `Bearer ${doctorInfo.token}` },
    });
    dispatch({ type: GET_PATIENT_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GET_PATIENT_PROFILE_FAIL, payload: message });
  }
};

// id

// export const storePatientId = (id) => {
//   return {
//     type: "ADD_PATIENT_ID",
//     payload: id,
//   };
// };

export const storePatientId = (id) => {
  // Save patId to localStorage
  localStorage.setItem("patId", id);

  return {
    type: "ADD_PATIENT_ID",
    payload: id,
  };
};

export const attachDietChart =
  (doctorId, patientId, dietChartId) => async (dispatch, getState) => {
    dispatch({ type: ATTACH_DIET_REQUEST });
    const {
      doctorSignin: { doctorInfo },
    } = getState();

    try {
      const { data } = await axios.post(
        `${Url}/diet-charts/createDietChartAssignment/`,
        { doctorId, patientId, dietChartId },
        {
          headers: {
            Authorization: `Bearer ${doctorInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data ===>", data);
      dispatch({ type: ATTACH_DIET_SUCCESS, payload: data });
      console.log("after dispatch");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: ATTACH_DIET_FAIL, payload: message });
    }
  };
