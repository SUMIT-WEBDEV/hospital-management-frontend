import React, { useEffect, useState } from "react";
import { FiEye, FiFile, FiFileText } from "react-icons/fi";

import { createPrescription } from "../../../action/DoctorAction";
import Swal from "sweetalert2";
import { CREATE_PRESC_RESET } from "../../../constant.js/DoctorConstant";
import { AppointmentInfo, AppointmentGrid } from "../../../Data/Data_Info";
import {
  getAnsForm,
  getAppointments,
  getForms,
} from "../../../action/PatientAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { FiPaperclip, FiChevronDown } from "react-icons/fi";
import { storePatientId } from "../../../action/DoctorAction";
import {
  getAllDietChart,
  getDietChartOfPatient,
} from "../../../action/AdminAction";
import DocModalInfo from "./DocModalInfo";
import { Link } from "react-router-dom";
import {
  getLatesDietChartByDoctor,
  getLatesPrescriptionForDoctor,
  getPatientProfileByDoctor,
} from "../../../action/DoctorAction";
import { useRef } from "react";
import { truncate } from "../../../constant.js/Constant";
import moment from "moment";

const DocAppointmentTable = () => {
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { success } = appointmentCreate;
  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointment } = appointmentList;
  const [prescribePatient, setPrescribePatient] = useState("");
  const [prescriptions, setPrescriptions] = useState([{ id: 0 }]);
  const latestPrescription = useSelector((state) => state.latestPrescription);
  const {
    loading: loadingLatest,
    error: errorLatest,
    prescLatest,
  } = latestPrescription;

  const patientProfileList = useSelector((state) => state.patientProfileList);
  const {
    loading: loadingProfile,
    error: errorProfile,
    profile,
  } = patientProfileList;

  const AnsformList = useSelector((state) => state.formAns);
  const { loadingAns, ansforms, errorAns } = AnsformList;

  const allAnsNum = ansforms?.flatMap((f) => f?.questions[0]?.answers.length);
  // console.log("ansforms ==>", ansforms);
  // console.log("allAnsNum ==>", allAnsNum);
  // console.log("AnsformList ==>", AnsformList);
  console.log("appointment ===>", appointment);

  const ansFormsNew = allAnsNum
    ?.map((elem, index) => {
      const multiForm = [];
      for (let i = 0; i < elem; i++) {
        // console.log("i", i);
        const filterdAns = {
          ...ansforms[index],
          questions: [
            {
              ...ansforms[index]?.questions[0],
              answers: [ansforms[index]?.questions[0]?.answers[i]],
            },
          ],
        };
        // console.log(ansforms[index]);
        multiForm.push(filterdAns);
      }
      return multiForm;
    })
    ?.flat(1);

  const handleSubmit = (id) => {
    localStorage.setItem("patientData", JSON.stringify("wait"));
    dispatch(storePatientId(id));
  };

  console.log("ansFormsNew ===>", ansFormsNew);

  // console.log("AnsformList", ansforms);

  // const latestDietChart = useSelector((state) => state.latestDietChart);
  // const {
  //   loading: LoadingDietLatest,
  //   error: errorDietLatest,
  //   deitChartLatest,
  // } = latestDietChart;

  const patientdeitChartList = useSelector((state) => state.patientDiet);
  const { patientdietchart } = patientdeitChartList;

  const deitChartLatest = patientdietchart ? patientdietchart[0] : [];

  const prescriptionCreate = useSelector((state) => state.prescriptionCreate);
  const { success: prescriptionCreateSuccess, error: prescriptionCreateError } =
    prescriptionCreate;
  // const location = useLocation();
  //   const { id } = location.state;
  // const prescriptionPatient = useSelector((state) => state.prescriptionPatient);
  // const { loading: loadingPres, error: errorPres, presc } = prescriptionPatient;

  // const formlists = useSelector((state) => state.patientFormList);
  // const { forms } = formlists;

  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    const user = "doctor";
    dispatch(getAppointments(user));
    // const user='doctor'
    // dispatch(getAllDietChart(user));
    // dispatch(getPatientOldPresc(id))
  }, []);

  useEffect(() => {
    if (prescriptionCreateSuccess) {
      Swal.fire({
        icon: "success",
        text: "Prescription Created successfully",
      });
      dispatch({ type: CREATE_PRESC_RESET });
    } else if (prescriptionCreateError) {
      Swal.fire({
        icon: "error",
        text: "Failed to create Prescription",
      });
    }
  }, [prescriptionCreateSuccess, prescriptionCreateError]);
  function handleScrollToBottom() {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }
  useEffect(() => {
    handleScrollToBottom();
  }, [prescriptions.length]);

  const componentRef = useRef();

  // console.log("prescLatest------>", prescLatest);

  // const selectionsettings = { persistSelection: true };
  // const toolbarOptions = ["Delete"];
  // const editing = { allowDeleting: true, allowEditing: true };

  const getDetailsOfPatient = (id) => {
    dispatch(getLatesPrescriptionForDoctor(id));
    dispatch(getPatientProfileByDoctor(id));
    // dispatch(getLatesDietChartByDoctor(id));
    const user = "Doctor";
    dispatch(getDietChartOfPatient(user, id));
    setPrescribePatient(id);
    dispatch(getAnsForm(user, id));
  };

  const addMedicine = () => {
    const maxId = prescriptions.reduce(
      (max, prescription) => Math.max(max, prescription.id),
      0
    );
    setPrescriptions([...prescriptions, { id: maxId + 1 }]);
  };

  const removeMedicine = (idToRemove) => {
    setPrescriptions((oldPrescriptions) => {
      // Remove the prescription with the specified ID
      const newPrescriptions = oldPrescriptions.filter(
        (prescription) => prescription.id !== idToRemove
      );

      // Update the IDs of all prescriptions with an ID greater than the one that was removed
      return newPrescriptions.map((prescription) => {
        if (prescription.id > idToRemove) {
          return { ...prescription, id: prescription.id - 1 };
        } else {
          return prescription;
        }
      });
    });
  };

  const handlePrescriptions = ({ e, key, i }) => {
    setPrescriptions((oldPrescriptions) => {
      const prescriptionIndex = oldPrescriptions.findIndex(
        (prescription) => prescription.id === i
      );
      const newPrescription = [...oldPrescriptions];
      if (prescriptionIndex === -1) {
        newPrescription.push({
          id: i,
          [key]: e?.target.value,
          patientId: appointment[0]?.patientId?._id,
        });
      } else {
        newPrescription[prescriptionIndex] = {
          ...newPrescription[prescriptionIndex],
          [key]: e?.target.value,
        };
      }
      return newPrescription;
    });
  };

  const createPrescriptionHandler = (e) => {
    e.preventDefault();
    // const payload = {
    //   patientId: prescribePatient,
    //   prescriptions: prescriptions,
    // };
    dispatch(createPrescription(prescribePatient, prescriptions));

    setPrescriptions([{ id: 0 }]);
  };

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const localStorageData = JSON.parse(localStorage.getItem("doctorInfo"));
  const doctorName = localStorageData?.user?.name;

  return (
    <>
      <div className="py-16 bg-white rounded-3xl">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <div className="my-10">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-10 p-3 text-lg font-semibold tracking-wide text-left">
                    Sl No.
                  </th>
                  <th className="w-24 p-3 text-lg font-semibold tracking-wide text-left">
                    Doctor Name
                  </th>
                  <th className="w-24 p-3 text-lg font-semibold tracking-wide text-left">
                    Patient Name
                  </th>
                  <th className="w-32 p-3 text-lg font-semibold tracking-wide text-left">
                    Appointment Date
                  </th>
                  <th className="w-32 p-3 text-lg font-semibold tracking-wide text-left">
                    Appointment Time
                  </th>
                  <th className="w-32 p-3 text-lg font-semibold tracking-wide text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox>{error}</MessageBox>
                ) : appointment.length > 0 ? (
                  appointment.map((ap, i) => (
                    <tr
                      className="bg-white border-b "
                      key={i}
                      onClick={() => getDetailsOfPatient(ap?.patientId?._id)}
                    >
                      <td className="p-3 text-base text-gray-700 whitespace-nowrap">
                        {i + 1}
                        {/* {console.log("appointment==>", appointment)} */}
                      </td>
                      <td className="p-3 text-base capitalize text-gray-700 whitespace-nowrap">
                        {/* {ap.doctorId.name} */}
                        {ap.doctorId ? ap.doctorId.name : ""}
                      </td>
                      <td className="p-3 text-base capitalize text-gray-700 whitespace-nowrap">
                        {/* {ap.patientId.name} */}{" "}
                        {ap.patientId ? ap.patientId.name : ""}
                      </td>
                      <td className="p-3 text-base text-gray-700 whitespace-nowrap">
                        {truncate(ap.date, 11)}
                      </td>
                      <td className="p-3 text-base text-gray-700 whitespace-nowrap">
                        {moment(ap.time, "HH:mm").format("hh:mm A")}
                      </td>
                      <td className="p-3 text-base flex flex-row justify-start gap-4 text-gray-700 whitespace-nowrap">
                        <FiEye
                          className="cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#modalAppointment"
                        />
                        {console.log("ap ==>", ap)}

                        <Link
                          to={{
                            pathname: `/userrole/:roleid/dashboard/patient/info/`,
                          }}
                        >
                          <FiFileText
                            onClick={() => handleSubmit(ap.patientId._id)}
                            className="cursor-pointer"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <MessageBox>No Appointments</MessageBox>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* {setModal && <DocModalInfo show={modal} close={toggleModal}/>} */}
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalAppointment"
        backdrop="static"
        closable="false"
        aria-labelledby="modalAppointmentLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="modalAppointmentLabel"
              >
                Patient Medical Info
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <div className="p-2">
                <div className="relative w-full overflow-hidden">
                  <input
                    type="checkbox"
                    className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                  />
                  <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                    <h1 className="text-lg font-semibold text-gray-600">
                      Patient Basic Info
                    </h1>
                  </div>
                  {/* Down Arrow Icon */}
                  <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                    <FiChevronDown className="w-6 h-6" />
                  </div>
                  {!loadingProfile && !errorProfile && profile && (
                    <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                      <div className="p-4">
                        <div className="form__Grid--Cols-6">
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Patient Name
                            </label>
                            <p className="form__Heading">{profile.name}</p>
                          </div>

                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Patient Gender
                            </label>
                            <p className="form__Heading">{profile.gender}</p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Patient Phone Number
                            </label>
                            <p className="form__Heading">{profile.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-2">
                <div className="relative w-full overflow-hidden">
                  <input
                    type="checkbox"
                    className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                  />
                  <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                    <h1 className="text-lg font-semibold text-gray-600">
                      Medical Information - Latest Prescription
                    </h1>
                  </div>
                  {/* Down Arrow Icon */}
                  <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                    <FiChevronDown className="w-6 h-6" />
                  </div>
                  {!loadingLatest && !errorLatest && prescLatest && (
                    <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                      <div className="p-4">
                        <div className="form__Grid--Cols-6">
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Prescribed Date
                            </label>
                            <p className="form__Heading">
                              {/* {truncate(prescLatest.createdOn, 11)} */}
                              {new Date(prescLatest?.createdOn)
                                .toLocaleDateString("en-US", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                                .split("/")
                                .join("-")}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Prescribed By
                            </label>
                            <p className="form__Heading">
                              {prescLatest.doctorId.name}
                            </p>
                          </div>

                          {prescLatest.medicines.map((medicine, index) => (
                            <>
                              <div className="form__Cols--Span-6 font-bold">
                                Medicine {index + 1}
                              </div>
                              <div className="form__Cols--Span-6 font-bold"></div>

                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor={`medicineType${index}`}
                                  className="form__Label-Heading"
                                >
                                  Medicine Type
                                </label>
                                <p className="form__Heading">
                                  {medicine.medType}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor={`medicineName${index}`}
                                  className="form__Label-Heading"
                                >
                                  Medicine Name
                                </label>
                                <p className="form__Heading">
                                  {medicine.medName}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor={`medicineMorningDose${index}`}
                                  className="form__Label-Heading"
                                >
                                  Medicine Morning Dose
                                </label>
                                <p className="form__Heading">
                                  {medicine.mornDose}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor={`medicineAfternoonDose${index}`}
                                  className="form__Label-Heading"
                                >
                                  Medicine Afternoon Dose
                                </label>
                                <p className="form__Heading">
                                  {medicine.aftDose}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor={`medicineEveningDose${index}`}
                                  className="form__Label-Heading"
                                >
                                  Medicine Evening Dose
                                </label>
                                <p className="form__Heading">
                                  {medicine.eveDose}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor={`medicineFrequency${index}`}
                                  className="form__Label-Heading"
                                >
                                  Medicine Frequency
                                </label>
                                <p className="form__Heading">
                                  {medicine.frequency}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor={`medicineDuration${index}`}
                                  className="form__Label-Heading"
                                >
                                  Medicine Duration (Number)
                                </label>
                                <p className="form__Heading">
                                  {medicine.durDays} {medicine.duration}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor={`medicineSplInstructions${index}`}
                                  className="form__Label-Heading"
                                >
                                  Medicine Special Instructions
                                </label>
                                <p className="form__Heading">
                                  {medicine.specinst}
                                </p>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-2">
                <div className="relative w-full overflow-hidden">
                  <input
                    type="checkbox"
                    className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                  />
                  <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                    <h1 className="text-lg font-semibold text-gray-600">
                      Medical Information - Latest Diet Chart
                    </h1>
                  </div>
                  {/* Down Arrow Icon */}
                  <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                    <FiChevronDown className="w-6 h-6" />
                  </div>

                  {/* {patientdeitChartList.loading ? (
                    <MessageBox>{"error"}</MessageBox> //sumit
                  ) : deitChartLatest ? ( */}

                  <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                    {patientdeitChartList.loading ? (
                      <LoadingBox></LoadingBox>
                    ) : deitChartLatest ? (
                      <div className="p-4">
                        <div className="form__Grid--Cols-6">
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Prescribed Date
                            </label>
                            <p className="form__Heading">
                              {truncate(deitChartLatest?.assignedOn, 11)}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Prescribed By
                            </label>
                            <p className="form__Heading">
                              {deitChartLatest?.doctorId?.name}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Low Calories Range
                            </label>
                            <p className="form__Heading">
                              {deitChartLatest?.dietChartId?.calorie_lower}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              High Clories Range
                            </label>
                            <p className="form__Heading">
                              {deitChartLatest?.dietChartId?.ch_upper}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Low Carbohydrates Range
                            </label>
                            <p className="form__Heading">
                              {deitChartLatest?.dietChartId?.ch_lower}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              High Carbohydrates Range
                            </label>
                            <p className="form__Heading">
                              {deitChartLatest?.dietChartId?.ch_upper}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Protiens Range
                            </label>
                            <p className="form__Heading">
                              {deitChartLatest?.dietChartId?.protiens}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Fats Range
                            </label>
                            <p className="form__Heading">
                              {deitChartLatest?.dietChartId?.fats}
                            </p>
                          </div>

                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Food Cusine
                            </label>
                            <p className="form__Heading">
                              {deitChartLatest?.dietChartId?.cuisine_type}
                            </p>
                          </div>
                        </div>

                        <div className="py-3">
                          <div className="form__Grid--Rows-none">
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="downloadDietChart"
                                className="form__Label-Heading"
                              >
                                Download Diet Chart
                              </label>
                              <p className="form__Heading">
                                <a
                                  href={deitChartLatest?.dietChartId?.file}
                                  type="button"
                                  className="px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                >
                                  Download Diet Chart
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <MessageBox>No latest Diet Chart</MessageBox>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="p-2">
                <div className="relative w-full overflow-hidden">
                  <input
                    type="checkbox"
                    className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                  />
                  <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                    <h1 className="text-lg font-semibold text-gray-600">
                      Medical Information - Forms
                    </h1>
                  </div>
                  <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                    <FiChevronDown className="w-6 h-6" />
                  </div>
                  <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                    <div className="p-2">
                      {loadingAns ? (
                        <LoadingBox></LoadingBox>
                      ) : errorAns ? (
                        <MessageBox>{errorAns}</MessageBox>
                      ) : ansFormsNew?.length > 0 ? (
                        ansFormsNew?.map((f, index) => (
                          <div
                            className="relative w-full mb-2 overflow-hidden"
                            key={Math.floor(Math.random() * 1000000)}
                          >
                            <input
                              type="checkbox"
                              className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                            />
                            <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                              <h1 className="text-lg font-semibold text-gray-600">
                                Medical Information - {f.form_title} {""}(
                                {truncate(
                                  f?.questions[0]?.answers[0]?.fillingDate,
                                  11
                                )}
                                )
                              </h1>
                            </div>
                            <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                              <FiChevronDown className="w-6 h-6" />
                            </div>
                            <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                              <div className="p-4">
                                <div className="form__Grid--Cols-6">
                                  <div className="form__Cols--Span-6">
                                    <label
                                      htmlFor="prescribedBy"
                                      className="form__Label-Heading"
                                    >
                                      Form Title Name
                                    </label>
                                    <p className="form__Heading">
                                      {f.form_title}
                                    </p>
                                  </div>
                                  <div className="form__Cols--Span-6">
                                    <label
                                      htmlFor="prescribedBy"
                                      className="form__Label-Heading"
                                    >
                                      Form Frequency Type
                                    </label>
                                    <p className="form__Heading">
                                      {f.actions[0]?.form_type}
                                    </p>
                                  </div>
                                </div>

                                <div className="py-4 form__Grid--Cols-6">
                                  <div className="form__Cols--Span-6">
                                    <label
                                      htmlFor="prescribedBy"
                                      className="form__Label-Heading"
                                    >
                                      Question Title Name
                                    </label>
                                    <p className="form__Heading">
                                      {f?.questions[0]?.question_title}
                                    </p>
                                  </div>
                                  <div className="form__Cols--Span-6">
                                    <label
                                      htmlFor="prescribedBy"
                                      className="form__Label-Heading"
                                    >
                                      Question Type
                                    </label>
                                    <p className="form__Heading">
                                      {f?.questions[0]?.type}
                                    </p>
                                  </div>
                                </div>
                                <div className="py-4 form__Grid--Cols-6">
                                  <div className="form__Cols--Span-6">
                                    <label
                                      htmlFor="prescribedBy"
                                      className="form__Label-Heading"
                                    >
                                      Answered
                                    </label>
                                    <p className="form__Heading">
                                      {f?.questions[0]?.answers[0]?.data}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <MessageBox>No forms</MessageBox>
                      )}
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="p-2">
                <div className="relative w-full overflow-hidden">
                  <input
                    type="checkbox"
                    className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                  />
                  <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                    <h1 className="text-lg font-semibold text-gray-600">
                      Medical Information - Prescription
                    </h1>
                  </div>
                  <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                    <FiChevronDown className="w-6 h-6" />
                  </div>
                  <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                    <form onSubmit={createPrescriptionHandler}>
                      <div className="overflow-auto h-[33rem]">
                        {prescriptions.map((medicine, i) => (
                          <div
                            key={medicine._id}
                            className={`${i > 0 ? "mt-3" : ""} mb-2`}
                          >
                            <div className="form__Grid--Cols-6">
                              {i === 0 ? (
                                <>
                                  <div className="form__Cols--Span-6">
                                    <label
                                      htmlFor="prescribedBy"
                                      className="form__Label-Heading"
                                    >
                                      Doctor Name
                                    </label>
                                    <p className="form__Heading">
                                      {/* Rajiv Singla */}
                                      {doctorName}
                                    </p>
                                  </div>
                                  <div className="form__Cols--Span-6">
                                    <label
                                      htmlFor="prescribedDate"
                                      className="form__Label-Heading"
                                    >
                                      Prescribed Date
                                    </label>
                                    <p className="form__Heading">
                                      {formattedDate}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <span className="form__Cols--Span-6 font-bold">
                                    Medicine {i + 1}
                                  </span>
                                  <span
                                    onClick={() => removeMedicine(i)}
                                    className="form__Cols--Span-6 cursor-pointer font-bold"
                                  >
                                    Remove Medicine
                                  </span>
                                </>
                              )}
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="medicineType"
                                  className="form__Label-Heading"
                                >
                                  Medicine Type
                                </label>
                                <select
                                  className="form__Select"
                                  name=""
                                  value={prescriptions[i]?.medType || ""}
                                  id=""
                                  onChange={(e) => {
                                    const key = "medType";
                                    handlePrescriptions({ e, key, i });
                                  }}
                                >
                                  <option value="none">Please select</option>
                                  <option value="Tablet">Tablet</option>
                                  <option value="Tab">Tab</option>
                                  <option value="Injection">Injection</option>
                                  <option value="Injection by pen">
                                    Injection by pen
                                  </option>
                                  <option value="Sachet">Sachet</option>
                                  <option value="Rotacap">Rotacap</option>
                                  <option value="TAB">TAB</option>
                                  <option value="Ointment">Ointment</option>
                                  <option value="Ointment/Cream">
                                    Ointment/Cream
                                  </option>
                                  <option value="Tablet/Sachet">
                                    Tablet/Sachet
                                  </option>
                                  <option value="NEBULIZATION">
                                    NEBULIZATION
                                  </option>
                                </select>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="medicineName"
                                  className="form__Label-Heading"
                                >
                                  Medicine Name
                                </label>
                                <input
                                  value={prescriptions[i]?.medName || ""}
                                  onChange={(e) => {
                                    const key = "medName";
                                    handlePrescriptions({ e, key, i });
                                  }}
                                  id="medicineName"
                                  name="medicineName"
                                  type="text"
                                  autoComplete="medicineName"
                                  required
                                  className="form__Input"
                                  placeholder="Enter Medicine Name"
                                />
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="medicineMorningDose"
                                  className="form__Label-Heading"
                                >
                                  Medicine Morning Dose
                                </label>
                                <input
                                  value={prescriptions[i]?.mornDose || ""}
                                  onChange={(e) => {
                                    const key = "mornDose";
                                    handlePrescriptions({ e, key, i });
                                  }}
                                  id="medicineMorningDose"
                                  name="medicineMorningDose"
                                  type="text"
                                  autoComplete="medicineMorningDose"
                                  required
                                  className="form__Input"
                                  placeholder="Enter Medicine Morning Dose"
                                />
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="medicineAfternoonDose"
                                  className="form__Label-Heading"
                                >
                                  Medicine Afternoon Dose
                                </label>
                                <input
                                  value={prescriptions[i]?.aftDose || ""}
                                  onChange={(e) => {
                                    const key = "aftDose";
                                    handlePrescriptions({ e, key, i });
                                  }}
                                  id="medicineAfternoonDose"
                                  name="medicineAfternoonDose"
                                  type="text"
                                  autoComplete="medicineAfternoonDose"
                                  required
                                  className="form__Input"
                                  placeholder="Enter Medicine Afternoon Dose"
                                />
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="medicineEveningDose"
                                  className="form__Label-Heading"
                                >
                                  Medicine Evening Dose
                                </label>
                                <input
                                  value={prescriptions[i]?.eveDose || ""}
                                  onChange={(e) => {
                                    const key = "eveDose";
                                    handlePrescriptions({ e, key, i });
                                  }}
                                  id="medicineEveningDose"
                                  name="medicineEveningDose"
                                  type="text"
                                  autoComplete="medicineEveningDose"
                                  required
                                  className="form__Input"
                                  placeholder="Enter Medicine Evening Dose"
                                />
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="medicineFrequency"
                                  className="form__Label-Heading"
                                >
                                  Medicine Frequency
                                </label>
                                <select
                                  className="form__Select"
                                  name=""
                                  id=""
                                  value={prescriptions[i]?.frequency || ""}
                                  onChange={(e) => {
                                    const key = "frequency";
                                    handlePrescriptions({ e, key, i });
                                  }}
                                >
                                  <option value="none">Please select</option>
                                  <option value="Daily">Daily</option>
                                  <option value="Alternative day">
                                    Alternative day
                                  </option>
                                  <option value="Daily/SOS">Daily/SOS</option>
                                  <option value="once every 15 day">
                                    once every 15 day
                                  </option>
                                  <option value="Day 1-21 with a gap of 7 days">
                                    Day 1-21 with a gap of 7 days
                                  </option>
                                  <option value="Dail">Dail</option>
                                </select>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="medicineDurationNumber"
                                  className="form__Label-Heading"
                                >
                                  Medicine Duration (Days / Weeks)
                                </label>
                                <select
                                  className="form__Select"
                                  name=""
                                  id=""
                                  value={prescriptions[i]?.duration || ""}
                                  onChange={(e) => {
                                    const key = "duration";
                                    handlePrescriptions({ e, key, i });
                                  }}
                                >
                                  <option value="none">Please select</option>
                                  <option value="Days">Days</option>
                                  <option value="Weeks">Weeks</option>
                                  <option value="Months">Months</option>
                                </select>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="medicineDurationDays"
                                  className="form__Label-Heading"
                                >
                                  Medicine Duration (Number)
                                </label>
                                <input
                                  value={prescriptions[i]?.durDays || ""}
                                  onChange={(e) => {
                                    const key = "durDays";
                                    handlePrescriptions({ e, key, i });
                                  }}
                                  id="medicineDurationDays"
                                  name="medicineDurationDays"
                                  type="number"
                                  autoComplete="medicineDurationDays"
                                  required
                                  className="form__Input"
                                  placeholder="Enter Medicine Duration Days"
                                />
                              </div>
                            </div>

                            <div className="form__Grid--Rows-none">
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="medicineSplInstructions"
                                  className="form__Label-Heading"
                                >
                                  Medicine Special Instructions
                                </label>
                                <textarea
                                  value={prescriptions[i]?.specinst || ""}
                                  onChange={(e) => {
                                    const key = "specinst";
                                    handlePrescriptions({ e, key, i });
                                  }}
                                  id="medicineSplInstructions"
                                  name="medicineSplInstructions"
                                  rows="3"
                                  autoComplete="medicineSplInstructions"
                                  required
                                  className="form__Textarea"
                                  placeholder="Enter Medicine Spl Instructions"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={scrollRef}></div>
                      </div>
                      <div className="form__Grid--Rows-none">
                        <div className="form__Cols--Span-6">
                          <button
                            type="button"
                            className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                            onClick={addMedicine}
                          >
                            Add More Medicines
                          </button>
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
                          type="submit"
                          data-bs-dismiss="modal"
                          className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                        >
                          Create &amp; Save Prescription
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocAppointmentTable;
