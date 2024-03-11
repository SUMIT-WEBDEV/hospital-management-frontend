import React, { useEffect, useState } from "react";
import { updateSampleSection } from "../../shared/SampleBase";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import DocPatientCreateAppointment from "./DocPatientCreateAppointment";
import {
  createAppointment,
  getAppointments,
} from "../../../action/PatientAction";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getEveryDietChart } from "../../../action/AdminAction";
import { attachDietChart } from "../../../action/DoctorAction";
import { truncate } from "../../../constant.js/Constant";
import moment from "moment";

const DocPatientAppointments = () => {
  const [selectedDietId, setSelectedDietId] = useState("");

  const dispatch = useDispatch();
  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { success } = appointmentCreate;
  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointment } = appointmentList;

  const dietAttach = useSelector((state) => state.attachDiet);

  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;

  const dietChartss = useSelector((state) => state.everyDietChart);
  const { load, dietcharts } = dietChartss;
  // console.log("diet", dietChartss);
  console.log("appointment ------>", appointment);

  const doctor = useSelector((state) => state.doctorSignin);
  const { name, _id } = doctor.doctorInfo.user;

  const doctorList = useSelector((state) => state.doctorList);

  const { loading: loadingDoctor, error: errorDoctors, doctors } = doctorList;

  const handleAttachDietCharts = () => {
    dispatch(attachDietChart(_id, patId, selectedDietId)).then(() => {
      if (!dietAttach.error) {
        setSelectedDietId("");

        Swal.fire({
          icon: "success",
          text: "Diet Chart Attached Successfully",
        });
      } else {
        Swal.fire({
          icon: "error",
          // text: "Failed to Attached Diet Chart",
          text: dietAttach.error,
        });
      }
    });
  };

  // useEffect(() => {
  //   handleAttachDietCharts();
  //   handleAttachDietCharts();
  // }, []);

  useEffect(() => {
    updateSampleSection();
  }, []);

  useEffect(() => {
    const user = "doctor";
    dispatch(getAppointments(user));
  }, [dispatch, success]);

  useEffect(() => {
    const user = "doctor";
    dispatch(getEveryDietChart(user));
  }, []);

  return (
    <>
      <DocPatientCreateAppointment />
      <div className="my-10">
        <div className="py-16 bg-white rounded-3xl">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox></MessageBox>
          ) : (
            <>
              <div className="my-10">
                <table className="min-w-full table-auto table-res">
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
                        Appointment Time
                      </th>
                      <th className="text-lg font-bold text-gray-900 px-2 py-4 text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <LoadingBox></LoadingBox>
                    ) : error ? (
                      <MessageBox>{error}</MessageBox>
                    ) : appointment.length > 0 ? (
                      appointment
                        .filter((a) => a.patientId?._id == patId)
                        .map((ap, i) => (
                          <tr className="bg-white border-b" key={ap._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                              {i + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center">
                              {ap.doctorId.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center">
                              {ap.patientId.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                              {truncate(ap.date, 11)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                              {moment(ap.time, "HH:mm").format("hh:mm A")}
                            </td>
                            <td className="p-6 text-base text-gray-700 whitespace-nowrap text-center">
                              <FiEye
                                className="cursor-pointer transition duration-150 ease-in-out"
                                data-bs-toggle="modal"
                                data-bs-target="#createDietChart"
                              />
                            </td>
                          </tr>
                        ))
                    ) : (
                      <MessageBox>No Appointments</MessageBox>
                    )}
                  </tbody>
                </table>
              </div>
              <div
                className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="createDietChart"
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
                        Create Diet Chart
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
                                Select Diet Charts
                              </label>
                              <select
                                id="diet"
                                name="diet"
                                autoComplete="diet-name"
                                className="form__Select"
                                value={selectedDietId}
                                onChange={(e) =>
                                  setSelectedDietId(e.target.value)
                                }
                              >
                                <option>Select Diet Charts</option>
                                {dietcharts?.map((dc) => (
                                  <option key={dc._id} value={dc._id}>
                                    {`${dc.calorie_lower}-${dc.calorie_upper}-${dc.ch_lower}-${dc.ch_upper}-${dc.protiens}-${dc.fats}-${dc.cuisine_type}`}
                                  </option>
                                ))}
                              </select>
                            </>
                          ) : (
                            <MessageBox>No doctors</MessageBox>
                          )}
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
                        onClick={handleAttachDietCharts}
                        data-bs-dismiss="modal"
                        type="button"
                        className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      >
                        Attach Diet Chart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DocPatientAppointments;
