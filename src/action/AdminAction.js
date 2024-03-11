import axios from "axios";
import {
  ACTIVATE_DOCTOR_FAIL,
  PERFORMANCE_DATA_FAIL,
  PERFORMANCE_DATA_REQUEST,
  PERFORMANCE_DATA_SUCCESS,
  PERFORMANCE_DATA_RESET,
  ACTIVATE_DOCTOR_REQUEST,
  ACTIVATE_DOCTOR_SUCCESS,
  ACTIVATE_DTCHART_FAIL,
  ACTIVATE_DTCHART_REQUEST,
  ACTIVATE_DTCHART_SUCCESS,
  ACTIVATE_FORM_FAIL,
  ACTIVATE_FORM_REQUEST,
  ACTIVATE_FORM_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_SIGNOUT,
  CREATE_DOCTOR_FAIL,
  CREATE_DOCTOR_REQUEST,
  CREATE_DOCTOR_SUCCESS,
  EDIT_DOCTOR_REQUEST,
  EDIT_DOCTOR_FAIL,
  EDIT_DOCTOR_SUCCESS,
  DEACTIVATE_DOCTOR_FAIL,
  DEACTIVATE_DOCTOR_REQUEST,
  DEACTIVATE_DOCTOR_SUCCESS,
  DEACTIVATE_DTCHART_FAIL,
  DEACTIVATE_DTCHART_REQUEST,
  DEACTIVATE_DTCHART_SUCCESS,
  DEACTIVATE_FORM_FAIL,
  DEACTIVATE_FORM_REQUEST,
  DEACTIVATE_FORM_SUCCESS,
  GET_ALL_DIET_CHART_FAIL,
  GET_ALL_DIET_CHART_REQUEST,
  GET_ALL_DIET_CHART_SUCCESS,
  GET_ALL_DOCTORS_FAIL,
  GET_ALL_DOCTORS_REQUEST,
  GET_ALL_DOCTORS_SUCCESS,
  GET_EVERY_DIET_CHART_FAIL,
  GET_EVERY_DIET_CHART_SUCCESS,
  GET_EVERY_DIET_CHART_REQUEST,
  GET_ALL_PATIENTPRO_FAIL,
  GET_ALL_PATIENTPRO_SUCCESS,
  GET_ALL_PATIENTPRO_REQUEST,
  GET_ALL_HEALTHPLAN_FAIL,
  GET_ALL_HEALTHPLAN_REQUEST,
  GET_ALL_HEALTHPLAN_SUCCESS,
} from "../constant.js/AdminConstant";
import {
  GET_PATIENT_DIET_CHART_FAIL,
  GET_PATIENT_DIET_CHART_REQUEST,
  GET_PATIENT_DIET_CHART_SUCCESS,
  Url,
} from "../constant.js/PatientConstant";

export const addDoctore =
  (name, role, email, phone, registration_no, profileImage, image) =>
  async (dispatch, getState) => {
    dispatch({ type: CREATE_DOCTOR_REQUEST });
    const {
      adminSignin: { adminDocInfo },
    } = getState();

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("role", role);
      formdata.append("email", email);
      formdata.append("phone", phone);
      formdata.append("registration_no", registration_no);
      formdata.append("file", profileImage, image.name);

      for (var pair of formdata.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const { data } = await axios.post(`${Url}/doctors/add-doctor`, formdata, {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
        redirect: "follow",
      });

      console.log("employrdata", data);

      dispatch({ type: CREATE_DOCTOR_SUCCESS, payload: data });
    } catch (error) {
      // console.log(error.response.data.message,'error')
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      dispatch({ type: CREATE_DOCTOR_FAIL, payload: message });
    }
  };

export const editDoctor =
  (id, name, role, email, phone, registration_no, profileImage) =>
  async (dispatch, getState) => {
    dispatch({ type: EDIT_DOCTOR_REQUEST });
    const {
      adminSignin: { adminDocInfo },
    } = getState();

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("role", role);
      formdata.append("email", email);
      formdata.append("phone", phone);
      formdata.append("file", profileImage);
      formdata.append("registration_no", registration_no);

      const { data } = await axios.put(`${Url}/doctors/edit/${id}`, formdata, {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
        redirect: "follow",
      });

      dispatch({ type: EDIT_DOCTOR_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EDIT_DOCTOR_FAIL, payload: message });
    }
  };

export const adminLogin = (email, password, user) => async (dispatch) => {
  dispatch({ type: ADMIN_LOGIN_REQUEST, payload: { email } });
  try {
    const { data } = await axios.post(`${Url}/auth/login`, {
      email,
      password,
      user,
    });
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
    // console.log(data.token,'dctrt');
    localStorage.setItem("adminDocInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADMIN_LOGIN_FAIL, payload: message });
  }
};

export const adminSignout = () => (dispatch) => {
  localStorage.removeItem("adminDocInfo");
  localStorage.removeItem("activeUser");
  dispatch({ type: ADMIN_SIGNOUT });
  window.location.href = "/";
};

export const getPerformanceData =
  (employeePerformance) => async (dispatch, getState) => {
    console.warn("employeePerformance ==>", employeePerformance);
    dispatch({ type: PERFORMANCE_DATA_REQUEST });

    console.warn(Array.isArray(employeePerformance));
    const {
      adminSignin: { adminDocInfo },
    } = getState();
    try {
      if (
        Array.isArray(employeePerformance) &&
        employeePerformance.length === 0
      ) {
        dispatch({ type: PERFORMANCE_DATA_RESET });
        return;
      }

      const { data } = await axios.get(
        `${Url}/data-collection/performance?activity=${employeePerformance.activity}&from=${employeePerformance.from}&to=${employeePerformance.to}`,
        {
          headers: {
            Authorization: `Bearer ${adminDocInfo.token}`,
          },
        }
      );
      console.log("data ============>", data);

      dispatch({ type: PERFORMANCE_DATA_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PERFORMANCE_DATA_FAIL, payload: message });
    }
  };

export const getAllDoctors = (user) => async (dispatch, getState) => {
  dispatch({ type: GET_ALL_DOCTORS_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();
  const {
    doctorSignin: { doctorInfo },
  } = getState();
  const {
    patientSignin: { patientInfo },
  } = getState();

  try {
    console.log(user === "doctor");

    if (user === "doctor") {
      const { data } = await axios.get(`${Url}/doctors/get-all`, {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
        },
      });

      dispatch({ type: GET_ALL_DOCTORS_SUCCESS, payload: data });
    } else if (user === "patient") {
      const { data } = await axios.get(`${Url}/doctors/get-all`, {
        headers: {
          Authorization: `Bearer ${patientInfo.token}`,
        },
      });
      dispatch({ type: GET_ALL_DOCTORS_SUCCESS, payload: data });
    } else {
      const { data } = await axios.get(`${Url}/doctors/get-all`, {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      });
      dispatch({ type: GET_ALL_DOCTORS_SUCCESS, payload: data });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response;
    dispatch({ type: GET_ALL_DOCTORS_FAIL, payload: message });
  }
};

export const getPatientProgram = (empId) => async (dispatch, getState) => {
  dispatch({ type: GET_ALL_PATIENTPRO_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();

  try {
    const { data } = await axios.get(
      `${Url}/admin/getPatientProgram/${empId}`,
      {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      }
    );

    dispatch({ type: GET_ALL_PATIENTPRO_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response;
    dispatch({ type: GET_ALL_PATIENTPRO_FAIL, payload: message });
  }
};

export const activateDoctor = (id) => async (dispatch, getState) => {
  dispatch({ type: ACTIVATE_DOCTOR_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${Url}/doctors/activate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      }
    );
    dispatch({ type: ACTIVATE_DOCTOR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ACTIVATE_DOCTOR_FAIL, payload: message });
  }
};

export const deactivateDoctor = (id) => async (dispatch, getState) => {
  dispatch({ type: DEACTIVATE_DOCTOR_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();
  // console.log(adminDocInfo,'ad');
  try {
    const { data } = await axios.put(
      `${Url}/doctors/deactivate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      }
    );
    dispatch({ type: DEACTIVATE_DOCTOR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEACTIVATE_DOCTOR_FAIL, payload: message });
  }
};

export const getAllDietChart = (user) => async (dispatch, getState) => {
  dispatch({ type: GET_ALL_DIET_CHART_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();
  const {
    patientSignin: { patientInfo },
  } = getState();
  const {
    doctorSignin: { doctorInfo },
  } = getState();

  try {
    if (user === "patient") {
      const { data } = await axios.get(`${Url}/diet-charts/get-all`, {
        headers: {
          Authorization: `Bearer ${patientInfo.token}`,
        },
      });

      dispatch({ type: GET_ALL_DIET_CHART_SUCCESS, payload: data });
    } else if (user === "doctor") {
      const { data } = await axios.get(`${Url}/diet-charts/get-all`, {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
        },
      });

      dispatch({ type: GET_ALL_DIET_CHART_SUCCESS, payload: data });
    } else {
      const { data } = await axios.get(`${Url}/diet-charts/get-all`, {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      });

      dispatch({ type: GET_ALL_DIET_CHART_SUCCESS, payload: data });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response;
    dispatch({ type: GET_ALL_DIET_CHART_FAIL, payload: message });
  }
};

export const getDietChartOfPatient =
  (user, id) => async (dispatch, getState) => {
    dispatch({ type: GET_PATIENT_DIET_CHART_REQUEST });
    const {
      adminSignin: { adminDocInfo },
    } = getState();
    const {
      patientSignin: { patientInfo },
    } = getState();
    const {
      doctorSignin: { doctorInfo },
    } = getState();

    try {
      if (user === "Patient") {
        const { data } = await axios.get(
          `${Url}/diet-charts/getDietChartAssignmentsByPatientId/${patientInfo.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${patientInfo.token}`,
            },
          }
        );

        dispatch({ type: GET_PATIENT_DIET_CHART_SUCCESS, payload: data });
      } else if (user === "Doctor") {
        const { data } = await axios.get(
          `${Url}/diet-charts/getDietChartAssignmentsByPatientId/${id}`,
          {
            headers: {
              Authorization: `Bearer ${doctorInfo.token}`,
            },
          }
        );

        dispatch({ type: GET_PATIENT_DIET_CHART_SUCCESS, payload: data });
      } else {
        const { data } = await axios.get(
          `${Url}/diet-charts/getDietChartAssignmentsByPatientId/${id}`,
          {
            headers: {
              Authorization: `Bearer ${adminDocInfo.token}`,
            },
          }
        );

        dispatch({ type: GET_PATIENT_DIET_CHART_SUCCESS, payload: data });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      dispatch({ type: GET_PATIENT_DIET_CHART_FAIL, payload: message });
    }
  };

export const getEveryDietChart = (user) => async (dispatch, getState) => {
  dispatch({ type: GET_EVERY_DIET_CHART_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();
  const {
    patientSignin: { patientInfo },
  } = getState();
  const {
    doctorSignin: { doctorInfo },
  } = getState();

  try {
    if (user === "patient") {
      const { data } = await axios.get(`${Url}/diet-charts/get-allDiet`, {
        headers: {
          Authorization: `Bearer ${patientInfo.token}`,
        },
      });

      dispatch({ type: GET_EVERY_DIET_CHART_SUCCESS, payload: data });
    } else if (user === "doctor") {
      const { data } = await axios.get(`${Url}/diet-charts/get-allDiet`, {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
        },
      });

      dispatch({ type: GET_EVERY_DIET_CHART_SUCCESS, payload: data });
    } else {
      const { data } = await axios.get(`${Url}/diet-charts/get-allDiet`, {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      });

      dispatch({ type: GET_EVERY_DIET_CHART_SUCCESS, payload: data });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response;
    dispatch({ type: GET_EVERY_DIET_CHART_FAIL, payload: message });
  }
};

export const activateForm = (id) => async (dispatch, getState) => {
  dispatch({ type: ACTIVATE_FORM_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${Url}/forms/activate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      }
    );
    dispatch({ type: ACTIVATE_FORM_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ACTIVATE_FORM_FAIL, payload: message });
  }
};

export const deactivateForm = (id) => async (dispatch, getState) => {
  dispatch({ type: DEACTIVATE_FORM_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();
  // console.log(adminDocInfo,'ad');
  try {
    const { data } = await axios.put(
      `${Url}/forms/deactivate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      }
    );
    dispatch({ type: DEACTIVATE_FORM_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEACTIVATE_FORM_FAIL, payload: message });
  }
};

export const activateDtChart = (id) => async (dispatch, getState) => {
  dispatch({ type: ACTIVATE_DTCHART_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${Url}/diet-charts/activate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      }
    );
    dispatch({ type: ACTIVATE_DTCHART_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ACTIVATE_DTCHART_FAIL, payload: message });
  }
};

export const deactivateDtChart = (id) => async (dispatch, getState) => {
  dispatch({ type: DEACTIVATE_DTCHART_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();
  // console.log(adminDocInfo,'ad');
  try {
    const { data } = await axios.put(
      `${Url}/diet-charts/deactivate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      }
    );
    dispatch({ type: DEACTIVATE_DTCHART_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEACTIVATE_DTCHART_FAIL, payload: message });
  }
};

export const getAllHealthPlans = (user) => async (dispatch, getState) => {
  dispatch({ type: GET_ALL_HEALTHPLAN_REQUEST });
  const {
    adminSignin: { adminDocInfo },
  } = getState();
  const {
    patientSignin: { patientInfo },
  } = getState();
  const {
    doctorSignin: { doctorInfo },
  } = getState();

  try {
    if (user === "patient") {
      const { data } = await axios.get(`${Url}/health-plan/`, {
        headers: {
          Authorization: `Bearer ${patientInfo.token}`,
        },
      });

      dispatch({ type: GET_ALL_HEALTHPLAN_SUCCESS, payload: data.data });
    } else if (user === "doctor") {
      const { data } = await axios.get(`${Url}/health-plan/`, {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
        },
      });

      dispatch({ type: GET_ALL_HEALTHPLAN_SUCCESS, payload: data.data });
    } else {
      const { data } = await axios.get(`${Url}/health-plan/`, {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      });

      console.log("healthplan is", data);

      dispatch({ type: GET_ALL_HEALTHPLAN_SUCCESS, payload: data.data });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response;
    dispatch({ type: GET_ALL_HEALTHPLAN_FAIL, payload: message });
  }
};
