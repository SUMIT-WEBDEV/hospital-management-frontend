import React, { useEffect, useRef, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import {
  PatientAppointmentInfo,
  PatientAppointmentGrid,
} from "../../../Data/Data_Info";
import { updateSampleSection } from "../../shared/SampleBase";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { FiChevronDown, FiChevronsDown, FiEye } from "react-icons/fi";
import ReactToPrint from "react-to-print";
import { createPrescription } from "../../../action/DoctorAction";
import { getPatientProfile } from "../../../action/PatientAction";
import { truncate } from "../../../constant.js/Constant";
import moment from "moment";

const PatientAppointmentTable = () => {
  const dispatch = useDispatch();
  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { success } = appointmentCreate;
  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointment } = appointmentList;
  const [prescriptions, setPrescriptions] = useState([{ id: 0 }]);
  const scrollRef = useRef(null);
  const [prescribePatient, setPrescribePatient] = useState("");

  const patientProfileList = useSelector((state) => state.patientProfileList);
  const {
    loading: loadingProfile,
    error: errorProfile,
    profile,
  } = patientProfileList;

  useEffect(() => {
    dispatch(getPatientProfile());
  }, [dispatch]);

  // console.log("loading ===>", appointmentList);

  // console.log(patientProfileList);

  const latestPrescription = useSelector((state) => state.latestPrescription);
  const {
    loading: loadingLatest,
    error: errorLatest,
    prescLatest,
  } = latestPrescription;

  useEffect(() => {
    updateSampleSection();
  });

  const componentRef = useRef();

  // if(appointment){
  //   console.log(appointment);
  // }

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  // const latestDietChart = useSelector((state) => state.latestDietChart);
  // const {
  //   loading: LoadingDietLatest,
  //   error: errorDietLatest,
  //   deitChartLatest,
  // } = latestDietChart;

  // console.log("latestDietChart ==>", latestDietChart);
  // latest diet chart start
  const patientdeitChartList = useSelector((state) => state.patientDiet);
  const { loading1, error1, patientdietchart } = patientdeitChartList;

  const patientdietcharts = patientdietchart?.assignments;

  const deitChartLatest = patientdietchart?.latestDiet;

  // console.log("deitChartLatest -------->", deitChartLatest);

  // latest diet chart ends

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

  const addMedicine = () => {
    const maxId = prescriptions.reduce(
      (max, prescription) => Math.max(max, prescription.id),
      0
    );
    setPrescriptions([...prescriptions, { id: maxId + 1 }]);
  };

  const createPrescriptionHandler = (e) => {
    e.preventDefault();
    const payload = {
      patientId: prescribePatient,
      prescriptions: prescriptions,
    };
    dispatch(createPrescription(payload));
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

  return (
    <>
      <div className="py-16 relative bottom-16 bg-white rounded-3xl">
        {/* <GridComponent
          dataSource={appointment}
          enableHover={false}
          allowPaging
          pageSettings={{ pageCount: 10 }}
          selectionSettings={selectionsettings}
          toolbar={toolbarOptions}
          editSettings={editing}
          allowSorting
        >
          <ColumnsDirective>
            {PatientAppointmentGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Selection, Edit, Toolbar, Sort, Filter]} />
        </GridComponent> */}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox></MessageBox>
        ) : (
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
                  <th className="text-lg font-bold text-gray-900 px-2 py-4">
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
                  appointment.map((ap, i) => (
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
                      <td className="p-3  text-base text-gray-700 whitespace-nowrap">
                        <FiEye
                          className=""
                          data-bs-toggle="modal"
                          data-bs-target="#modalAppointment"
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
        )}
      </div>

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
                  <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex      items-center">
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
                            <p className="form__Heading">
                              {profile.patient.name}
                            </p>
                          </div>
                          {/* 
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Patient Age
                            </label>
                            <p className="form__Heading">46 yrs</p>
                          </div> */}

                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Patient Gender
                            </label>
                            <p className="form__Heading">
                              {profile.patient.gender}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="prescribedBy"
                              className="form__Label-Heading"
                            >
                              Patient Phone Number
                            </label>
                            <p className="form__Heading">
                              {profile.patient.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* latest prescription */}
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
                              {truncate(prescLatest.createdOn, 11)}
                              {/* {new Date(prescLatest?.createdOn)
                                .toLocaleDateString("en-US", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                                .split("/")
                                .join("-")} */}
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
                            <React.Fragment key={index} ref={componentRef}>
                              <>
                                {" "}
                                <div className="form__Cols--Span-6 font-bold">
                                  Medicine {index + 1}
                                </div>
                                <div className="form__Cols--Span-6 font-bold"></div>
                              </>
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
                                  Medicine Duration (Number / Days / Weeks)
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
                              {/* <ReactToPrint
                                trigger={() => (
                                  <button
                                    type="button"
                                    className="px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    style={{
                                      marginBottom: "16px",
                                      width: "200px",
                                    }}
                                  >
                                    Download Diet Charts!
                                  </button>
                                )}
                                content={() => componentRef.current}
                              /> */}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* latest diet chart starts */}
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
                    {loading1 ? (
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
              {/* latest diet chart ends */}

              {/* {!LoadingDietLatest && !errorDietLatest && deitChartLatest && (
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
                              Prescribed Date
                            </label>
                            <p className="form__Heading">
                              {truncate(deitChartLatest.createdOn, 11)}
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
                              {deitChartLatest.doctorId
                                ? deitChartLatest.doctorId.name
                                : ""}{" "}
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
                              {deitChartLatest.calorie_lower}
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
                              {deitChartLatest.calorie_upper}
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
                              {deitChartLatest.ch_lower}
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
                              {deitChartLatest.ch_upper}
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
                              {deitChartLatest.protiens}
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
                              {deitChartLatest.fats}
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
                              {deitChartLatest.cuisine_type}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientAppointmentTable;
