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

import PatientAppointmentTable from "./PatientAppointmentTable";
import { getAllDoctors } from "../../../action/AdminAction";
import Swal from "sweetalert2";

const PatientAppointmentInfo = () => {
  const [staff, setStaff] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { success } = appointmentCreate;
  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointment } = appointmentList;
  const doctorList = useSelector((state) => state.doctorList);
  const { loading: loadingDoctor, error: errorDoctors, doctors } = doctorList;

  const save = () => {
    // console.log('heyy');
    dispatch(createAppointment(staff, date));
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
    setDate("");
    const user = "patient";
    dispatch(getAllDoctors(user));
  }, [success]);
  // console.log(staff);
  return (
    <>
      <div className="flex justify-start my-0">
        {/* <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
            Create Appointments
          </h5>
          <p className="text-gray-700 text-base mb-4"></p>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-toggle="modal"
            data-bs-target="#createAppointment"
          >
            Create Appointments
          </button>
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="createAppointment"
            tabIndex="-1"
            aria-labelledby="createAppointmentLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
                    id="createAppointmentLabel"
                  >
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body relative p-4">
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
                  </div>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button
                    type="button"
                    className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={save}
                    data-bs-dismiss="modal"
                    type="button"
                    className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  >
                    Create &amp; Save Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>  */}
      </div>
      <div className="my-10 ">
        {/* <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-lg font-bold text-gray-900 px-2 py-4">
                Sl No.
              </th>
              <th className="text-lg font-bold text-gray-900 px-2 py-4">
                Doctor Name
              </th>
              <th className="text-lg font-bold text-gray-900 px-2 py-4">
                Patient Name
              </th>
              <th className="text-lg font-bold text-gray-900 px-2 py-4">
                Appointment Date
              </th>
              <th className="text-lg font-bold text-gray-900 px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? <LoadingBox></LoadingBox>:
            error ? <MessageBox>{error}</MessageBox>:
            appointment.length>0 ? appointment.map((ap,i)=>(

            
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                {i+1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                {ap.doctorId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                {ap.patientId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                {ap.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                <div className="flex flex-row justify-center">
                  <div className="inline-block p-6">
                    <FiEye
                      className="h-6 w-6 hover:text-green-500"
                      onClick={() => navigate('/userrole/:roleid/dashboard/patient/meeting/info/')}
                    />
                  </div>
                  <div className="inline-block p-6">
                    <FiEdit className="h-6 w-6 hover:text-blue-500" />
                  </div>
                </div>
              </td>
            </tr>
           )):
           
           <MessageBox>No Appointments</MessageBox>
           }
           
          </tbody>
        </table> */}
        <PatientAppointmentTable />
      </div>
    </>
  );
};

export default PatientAppointmentInfo;
