import React from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAppointment,
  getAppointments,
} from "../../../action/PatientAction";
import { useEffect } from "react";
import { CREATE_APPOINTMENT_RESET } from "../../../constant.js/PatientConstant";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { getAllDoctors } from "../../../action/AdminAction";
import Swal from "sweetalert2";

const DocPatientCreateAppointment = () => {
  const [staff, setStaff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { success } = appointmentCreate;
  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointment } = appointmentList;
  const doctorList = useSelector((state) => state.doctorList);
  const { loading: loadingDoctor, error: errorDoctors, doctors } = doctorList;

  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;
  console.log("staff ----->", staff);
  console.log("date ----->", date);
  // console.log("patirentid", id);
  console.log("time ----->", time);

  const handleSubmitAppointment = () => {
    dispatch(createAppointment(staff, date, patId, time));
  };

  useEffect(() => {
    dispatch(getAppointments());
    if (success) {
      Swal.fire({
        icon: "success",
        text: "Appointment created successfully",
      });
      dispatch({ type: CREATE_APPOINTMENT_RESET });
    }
    setTime("");
    setDate("");
    const user = "doctor";
    dispatch(getAllDoctors(user));
  }, [success]);
  // console.log(staff);
  return (
    <>
      <div className="flex justify-start my-5">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
            Create Appointments
          </h5>
          <p className="text-gray-700 text-base mb-4"></p>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => setShowModal(true)}
          >
            Create Appointments
          </button>
          {showModal ? (
            <div
            className="fixed flex justify-center  items-center h-screen top-0 left-0 right-0 z-50 block w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            data-modal-backdrop="static"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="relative w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h5
                    className="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    Create Patient Appoinment
                  </h5>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-6 text-xl space-y-6">
                  <div className="form__Grid--Rows-none">
                    <div className="form__Cols--Span-6">
                      {loadingDoctor ? (
                        <LoadingBox></LoadingBox>
                      ) : errorDoctors ? (
                        <MessageBox>{error}</MessageBox>
                      ) : doctors.length > 0 ? (
                        <>
                          <label
                            htmlFor="staff"
                            className="form__Label-Heading"
                          >
                            Select Staff
                          </label>
                          <select
                            id="staff"
                            name="staff"
                            autoComplete="staff-name"
                            className="form__Select"
                            onChange={(e) => setStaff(e.target.value)}
                          >
                            <option>Select Staff</option>
                            {doctors.map((dc) => (
                              <option key={dc._id} value={dc._id}>
                                {dc.name}
                              </option>
                            ))}
                          </select>
                        </>
                      ) : (
                        <MessageBox>No doctors</MessageBox>
                      )}
                    </div>
                    <div className="form__Cols--Span-6">
                      <label
                        htmlFor="appointment-date"
                        className="form__Label-Heading"
                      >
                        Select Appointment Date
                      </label>
                      <input
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        type="date"
                        name="appointment-date"
                        id="appointment-date"
                        autoComplete="given-name"
                        className="form__Input"
                      />
                    </div>
                    <div className="form__Cols--Span-6">
                      <label
                        htmlFor="appointment-date"
                        className="form__Label-Heading"
                      >
                        Select Appointment Time
                      </label>
                      <input
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        type="time"
                        name="appointment-date"
                        id="appointment-date"
                        autoComplete="given-name"
                        className="form__Input"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitAppointment}
                    type="button"
                    className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  >
                    Create &amp; Save Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
          ) : (
            <h1></h1>
          )}          
        </div>
      </div>
    </>
  );
};

export default DocPatientCreateAppointment;
