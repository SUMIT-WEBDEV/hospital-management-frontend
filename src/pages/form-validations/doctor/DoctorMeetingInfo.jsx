import React, { useState } from "react";
import Navbar from "../../../user/shared/Navbar";
import { FiPaperclip, FiChevronDown } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DetailsPatients, getForms } from "../../../action/PatientAction";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { useRef } from "react";

import Input from "../../../Components/Input";
import { useForm } from "../../../hooks/form-hooks";
import { VALIDATOR_MINLENGTH } from "../../../utils/validators";
import {
  createPrescription,
  getPatientOldPresc,
} from "../../../action/DoctorAction";
import { CREATE_PRESC_RESET } from "../../../constant.js/DoctorConstant";
import Swal from "sweetalert2";
import {
  getAllDietChart,
  getDietChartOfPatient,
} from "../../../action/AdminAction";
import { Form1 } from "../../shared/MultiForms";
import { truncate } from "../../../constant.js/Constant";

const DoctorMeetingInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;

  // patientId,medicine_type,medicine_name,morning_dose,afternoon_dose,evening_dose,frequency,duration,duration_days,special_inst
  // const [patientId, setPatientId] = useState("");
  // const [medType, setMedType] = useState({});
  // const [medName, setMedName] = useState({});
  // const [mornDose, setMornDose] = useState({});
  // const [aftDose, setAftDose] = useState({});
  // const [eveDose, setEveDose] = useState({});
  // const [frquency, setFrquency] = useState({});
  // const [duration, setDuration] = useState({});
  // const [durDays, setDurDays] = useState({});
  // const [specinst, setSpecinst] = useState({});
  // const [open, setOpen] = useState(false);
  const { id, patientid } = location.state;
  const [medicines, setMedicines] = useState(["med1"]);
  const [prescriptions, setPrescriptions] = useState([]);

  const patientDetails = useSelector((state) => state.patientDetails);
  // const { loading, error, patient } = patientDetails;
  const { patient } = patientDetails;

  console.log("patient", patient);

  const dispatch = useDispatch();
  const prescriptionCreate = useSelector((state) => state.prescriptionCreate);
  const { success } = prescriptionCreate;

  // const deitChartList = useSelector((state) => state.deitChartList);
  // const { loading: loadingDiet, error: errorDiet, dietchart } = deitChartList;

  const patientdeitChartList = useSelector((state) => state.patientDiet);
  const { loading, error, patientdietchart } = patientdeitChartList;

  const prescriptionPatient = useSelector((state) => state.prescriptionPatient);
  const { loading: loadingPres, error: errorPres, presc } = prescriptionPatient;

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // function to handle checkbox click
  const handleCheckboxClick = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const getFomrsList = useSelector((state) => state.patientFormList);
  const { loading: loadingForms, error: errorForms, forms } = getFomrsList;
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(DetailsPatients(id));

    const user = "Doctor";
    dispatch(getDietChartOfPatient(user, id));
    // dispatch(getAllDietChart(user));
    dispatch(getForms(user));
  }, [dispatch]);

  const addMedicine = () => {
    const nextMed = "med" + (medicines.length + 1);
    setMedicines([...medicines, nextMed]);
  };
  const removeMedicine = (e) => {
    setMedicines((med) => {
      return med.filter((m) => m != e);
    });
  };

  const handlePrescriptions = ({ e, key, i }) => {
    setPrescriptions((oldPrescriptions) => {
      const prescriptionIndex = oldPrescriptions.findIndex(
        (prescription) => prescription.id === i
      );
      const newPrescription = [...oldPrescriptions];
      if (prescriptionIndex === -1) {
        newPrescription.push({ id: i, [key]: e?.target.value, patientid: id });
      } else {
        newPrescription[prescriptionIndex] = {
          ...newPrescription[prescriptionIndex],
          [key]: e?.target.value,
        };
      }
      return newPrescription;
    });
  };
  const backFunc = () => {
    navigate("/userrole/:roleid/dashboard/doctor/#tabs-mypatientsJustify/");
  };
  useEffect(() => {
    dispatch(getPatientOldPresc(id));
    if (success) {
      dispatch({ type: CREATE_PRESC_RESET });
      Swal.fire({
        icon: "success",
        title: "Prescription created succesfully",
        // showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      });
      setPrescriptions([]);
      // setMedType({})
      // setMedName({})
      // setAftDose({})
      // setDurDays({})
      // setDuration({})
      // setEveDose({})
      // setFrquency({})
      // setMornDose({})
      // setSpecinst({})
    }
  }, [success]);

  const [formState, inputHandler, setFormData] = useForm({
    medicineType: {
      value: "",
      isValid: false,
    },
    medicineName: {
      value: "",
      isValid: false,
    },
    medicineDoseMorning: {
      value: "",
      isValid: false,
    },
    medicineDoseAfternoon: {
      value: "",
      isValid: false,
    },
    medicineDoseEvening: {
      value: "",
      isValid: false,
    },
    medicineFrequency: {
      value: "",
      isValid: false,
    },
    medicineDurationNumber: {
      value: "",
      isValid: false,
    },
    medicineDurationDays: {
      value: "",
      isValid: false,
    },
    medicineSplInstructions: {
      value: "",
      isValid: false,
    },
  });

  const createPrescriptionHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPrescription(
        // id,
        // medType,
        // medName,
        // mornDose,
        // aftDose,
        // eveDose,
        // frquency,
        // duration,
        // durDays,
        // specinst,
        id,
        prescriptions
      )
    );
  };

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const localStorageData = JSON.parse(localStorage.getItem("doctorInfo"));
  const doctorName = localStorageData.user.name;

  const uniqueHealthPlans = [
    ...new Set(patient?.data?.health_plan?.map((h) => h?.healthPlan?.name)),
  ];

  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <main>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <button
                type="button"
                className="text-center py-6 text-xl font-medium leading-6 text-gray-900"
                onClick={backFunc}
              >
                Back
              </button>
              {/* Replace with your content */}
              <div className="px-4 py-6 sm:px-0">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Patient Appointment Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Personal details and application.
                    </p>
                  </div>

                  {patient?.data && (
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Name
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 sm:col-span-2 sm:mt-0">
                            {patient?.data?.name}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Age
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {patient?.data?.age}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Phone Number
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 sm:col-span-2 sm:mt-0">
                            {patient?.data?.phone}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {patient?.data?.email}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Primary Doctors
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {patient?.data?.primaryTeamIds.map((priDoc, i) => {
                              if (patient?.data?.primaryTeamIds.length === 1)
                                return (
                                  <span key={priDoc.doctorId}>
                                    {priDoc.name}
                                    {"  "}
                                  </span>
                                );
                              else {
                                return (
                                  <span key={priDoc.doctorId}>
                                    {i + 1}. {priDoc.name}
                                    {"  "}
                                  </span>
                                );
                              }
                            })}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Secondary Doctors
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {patient?.data?.secondaryTeamIds.map(
                              (secDoc, i) => {
                                if (
                                  patient?.data?.secondaryTeamIds.length === 1
                                )
                                  return (
                                    <span key={secDoc.doctorId}>
                                      {secDoc.name}
                                      {"  "}
                                    </span>
                                  );
                                else {
                                  return (
                                    <span key={secDoc.doctorId}>
                                      {i + 1}. {secDoc.name}
                                      {"  "}
                                    </span>
                                  );
                                }
                              }
                            )}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Health Plan Enrolled
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {" "}
                            {uniqueHealthPlans.map((h) => (
                              <span>
                                {h}
                                {"  "}
                              </span>
                            ))}
                            {/* {patient?.data.health_plan.name} */}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Caretaker Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {patient?.data.caretakers_name}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Caretaker Relation
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {patient?.data.caretakers_relation}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Caretaker Phone
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {patient?.data.caretakers_phone}
                          </dd>
                        </div>{" "}
                        {/* end */}
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-bold text-gray-500">
                            Attachments
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul
                              role="list"
                              className="divide-y divide-gray-200 rounded-md border border-gray-200"
                            >
                              {/* 
                              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div className="flex w-0 flex-1 items-center">
                                  <FiPaperclip
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    Appointment
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Add to Calendar
                                  </a>
                                </div>
                              </li>
                              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div className="flex w-0 flex-1 items-center">
                                  <FiPaperclip
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    Medical Form Data
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalForms"
                                  >
                                    View
                                  </a>
                                </div>
                              </li>
                               */}
                              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div className="flex w-0 flex-1 items-center">
                                  <FiPaperclip
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    Add Prescription
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalPrescription"
                                    // onClick={()=>setOpen(!open)}
                                  >
                                    Create
                                  </button>
                                </div>
                              </li>
                              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div className="flex w-0 flex-1 items-center">
                                  <FiPaperclip
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    View Prescriptions
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalOldPrescription"
                                    // onClick={()=>setOpen(!open)}
                                  >
                                    View Prescriptions Here
                                  </button>
                                </div>
                              </li>
                              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div className="flex w-0 flex-1 items-center">
                                  <FiPaperclip
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    View Diet Charts
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalOldDietchart"
                                    // onClick={()=>setOpen(!open)}
                                  >
                                    View Diet Charts Here
                                  </button>
                                </div>
                              </li>
                            </ul>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  )}
                  {/* ))} */}
                </div>
              </div>
              {/* /End replace */}
            </div>
          )}
        </main>
      </div>

      {/* {open && ( */}
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalPrescription"
        tabIndex="-1"
        aria-labelledby="modalPrescriptionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none presc">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="modalPrescriptionLabel"
              >
                Prescription
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <form onSubmit={createPrescriptionHandler}>
                <div className="overflow-auto h-[33rem]">
                  {medicines.map((medicine, i) => (
                    <div key={i} className={`${i > 0 ? "mt-3" : ""} mb-2`}>
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
                              <p className="form__Heading">{doctorName}</p>
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="prescribedDate"
                                className="form__Label-Heading"
                              >
                                Prescribed Date
                              </label>
                              <p className="form__Heading"> {formattedDate}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="form__Cols--Span-6">
                              Medicine {i + 1}
                            </span>
                            <span
                              onClick={() => removeMedicine(medicine)}
                              className="form__Cols--Span-6 cursor-pointer"
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
                            name=""
                            //value={medType}
                            id=""
                            //  onChange={(e) => {setMedType({...medType, [medicine]: e.target.value})}}
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
                            <option value="Tablet/Sachet">Tablet/Sachet</option>
                            <option value="NEBULIZATION">NEBULIZATION</option>
                          </select>
                          {/* <Input
               element="input"
               type="text"
               id="medicineType"
               label="Medicine Type"
               placeholder="Enter Medicine Type"
               validators={VALIDATOR_MINLENGTH(1)}
               errorText="Please Enter Valid Medicine Type"
               onInput={inputHandler}
             /> */}
                        </div>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="medicineName"
                            className="form__Label-Heading"
                          >
                            Medicine Name
                          </label>
                          <input
                            //  value={medName}
                            // onChange={(e) => {setMedName({...medName, [medicine]: e.target.value})}}
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
                          {/* <Input
               element="input"
               type="text"
               id="medicineName"
               label="Medicine Name"
               placeholder="Enter Medicine Name"
               validators={VALIDATOR_MINLENGTH(1)}
               errorText="Please Enter Valid Medicine Name"
               onInput={inputHandler}
             /> */}
                        </div>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="medicineMorningDose"
                            className="form__Label-Heading"
                          >
                            Medicine Morning Dose
                          </label>
                          <input
                            // value={mornDose}
                            //  onChange={(e) => {setMornDose({...mornDose, [medicine]: e.target.value})}}
                            onChange={(e) => {
                              const key = "mornDose";
                              handlePrescriptions({ e, key, i });
                            }}
                            id="medicineMorningDose"
                            name="medicineMorningDose"
                            type="number"
                            autoComplete="medicineMorningDose"
                            required
                            className="form__Input"
                            placeholder="Enter Medicine Morning Dose"
                          />
                          {/* <Input
               element="input"
               type="text"
               id="medicineDoseMorning"
               label="Medicine Morning Dose"
               placeholder="Enter Medicine Morning Dose"
               validators={VALIDATOR_MINLENGTH(1)}
               errorText="Please Enter Valid Medicine Morning Dose"
               onInput={inputHandler}
             /> */}
                        </div>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="medicineAfternoonDose"
                            className="form__Label-Heading"
                          >
                            Medicine Afternoon Dose
                          </label>
                          <input
                            //   value={aftDose}
                            //  onChange={(e) => {setAftDose({...aftDose, [medicine]: e.target.value})}}
                            onChange={(e) => {
                              const key = "aftDose";
                              handlePrescriptions({ e, key, i });
                            }}
                            id="medicineAfternoonDose"
                            name="medicineAfternoonDose"
                            type="number"
                            autoComplete="medicineAfternoonDose"
                            required
                            className="form__Input"
                            placeholder="Enter Medicine Afternoon Dose"
                          />
                          {/* <Input
               element="input"
               type="text"
               id="medicineDoseAfternoon"
               label="Medicine Afternoon Dose"
               placeholder="Enter Medicine Afternoon Dose"
               validators={VALIDATOR_MINLENGTH(1)}
               errorText="Please Enter Valid Medicine Afternoon Dose"
               onInput={inputHandler}
             /> */}
                        </div>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="medicineEveningDose"
                            className="form__Label-Heading"
                          >
                            Medicine Evening Dose
                          </label>
                          <input
                            //value={eveDose}
                            // onChange={(e) => {setEveDose({...eveDose, [medicine]: e.target.value})}}
                            onChange={(e) => {
                              const key = "eveDose";
                              handlePrescriptions({ e, key, i });
                            }}
                            id="medicineEveningDose"
                            name="medicineEveningDose"
                            type="number"
                            autoComplete="medicineEveningDose"
                            required
                            className="form__Input"
                            placeholder="Enter Medicine Evening Dose"
                          />
                          {/* <Input
               element="input"
               type="text"
               id="medicineDoseEvening"
               label="Medicine Evening Dose"
               placeholder="Enter Medicine Evening Dose"
               validators={VALIDATOR_MINLENGTH(1)}
               errorText="Please Enter Valid Medicine Evening Dose"
               onInput={inputHandler}
             /> */}
                        </div>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="medicineFrequency"
                            className="form__Label-Heading"
                          >
                            Medicine Frequency
                          </label>
                          <select
                            name=""
                            id=""
                            // value={frquency}
                            // onChange={(e) => {setFrquency({...frquency, [medicine]: e.target.value})}}
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
                          {/* <Input
               element="input"
               type="text"
               id="medicineFrequency"
               label="Medicine Frequency"
               placeholder="Enter Medicine Frequency"
               validators={VALIDATOR_MINLENGTH(1)}
               errorText="Please Enter Valid Medicine Frequency"
               onInput={inputHandler}
             /> */}
                        </div>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="medicineDurationNumber"
                            className="form__Label-Heading"
                          >
                            Medicine Duration (Days / Weeks)
                          </label>
                          <select
                            name=""
                            id=""
                            // value={duration}
                            //  onChange={(e) => {setDuration({...duration, [medicine]: e.target.value})}}
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
                          {/* <Input
               element="input"
               type="text"
               id="medicineDurationNumber"
               label="Medicine Duration Number"
               placeholder="Enter Medicine Duration Number"
               validators={VALIDATOR_MINLENGTH(1)}
               errorText="Please Enter Valid Medicine Duration Number"
               onInput={inputHandler}
             /> */}
                        </div>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="medicineDurationDays"
                            className="form__Label-Heading"
                          >
                            Medicine Duration (Number)
                          </label>
                          <input
                            //  onChange={(e) => {setDurDays({...durDays, [medicine]: e.target.value})}}
                            //  value={durDays}
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
                          {/* <Input
               element="input"
               type="text"
               id="medicineDurationDays"
               label="Medicine Duration Days"
               placeholder="Enter Medicine Duration Days"
               validators={VALIDATOR_MINLENGTH(1)}
               errorText="Please Enter Valid Medicine Duration Days"
               onInput={inputHandler}
             /> */}
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
                            //value={specinst}
                            //   onChange={(e) => {setSpecinst({...specinst, [medicine]: e.target.value})}}
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
                          {/* <Input
             id="medicineSplInstructions"
             label="Medicine Spl Instructions"
             placeholder="Enter Medicine Spl Instructions"
             validators={VALIDATOR_MINLENGTH(1)}
             errorText="Please Enter Special Instructions for usage of Medicines"
             onInput={inputHandler}
           /> */}
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
      {/* )} */}

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalForms"
        tabIndex="-1"
        aria-labelledby="modalFormsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none presc">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="modalFormsLabel"
              >
                Medical Formssss
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {loadingForms ? (
              <LoadingBox></LoadingBox>
            ) : errorForms ? (
              <MessageBox>{errorForms}</MessageBox>
            ) : forms.length > 0 ? (
              forms.map((frm) => (
                <div className="modal-body relative p-4" key={frm._id}>
                  <div className="p-2">
                    <div className="relative w-full overflow-hidden">
                      <input
                        type="checkbox"
                        className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                      />
                      <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                        <h1 className="text-lg font-semibold text-gray-600">
                          {frm.doctorId ? frm.doctorId.name : ""}/{" "}
                          {/* {frm.form_title} / {truncate(frm.createdAt, 11)} */}
                          {frm.form_title} /{" "}
                          {new Date(frm?.createdAt)
                            .toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            .split("/")
                            .join("/")}
                        </h1>
                      </div>
                      {/* Down Arrow Icon */}
                      <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                        <FiChevronDown className="w-6 h-6" />
                      </div>
                      {/* Content */}
                      <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                        <div className="p-4">
                          <div className="form__Grid--Cols-6">
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="formCreatedBy"
                                className="form__Label-Heading"
                              >
                                Doctor Name
                              </label>
                              <p className="form__Heading">
                                {frm.doctorId ? frm.doctorId.name : ""}
                              </p>
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="formCreatedDate"
                                className="form__Label-Heading"
                              >
                                Form Created Date
                              </label>
                              <p className="form__Heading">
                                {truncate(frm.createdAt, 11)}
                              </p>
                            </div>
                          </div>
                          {frm.questions.map((qs) => (
                            <>
                              <div className="py-4" key={qs._id}>
                                <div className="form__Grid--Rows-none">
                                  <div className="form__Cols--Span-6">
                                    <label
                                      htmlFor="formQuestionTitle"
                                      className="form__Label-Heading"
                                    >
                                      Form Question Title
                                    </label>
                                    <p className="form__Heading">
                                      {qs.question_title}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="py-2">
                                <div className="form__Grid--Cols-6">
                                  <div className="form__Cols--Span-6">
                                    <label
                                      htmlFor="formQuestionType"
                                      className="form__Label-Heading"
                                    >
                                      Form Question Type
                                    </label>
                                    <p className="form__Heading">{qs.type}</p>
                                  </div>
                                  {qs.type != "textArea" && (
                                    <div className="form__Cols--Span-6">
                                      <label
                                        htmlFor="formQuestionChoice"
                                        className="form__Label-Heading"
                                      >
                                        Form Question Choice
                                      </label>

                                      <p className="form__Heading">
                                        {qs.choise1},{qs.choise2},{qs.choise3},
                                        {qs.choise4}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          ))}
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

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalOldPrescription"
        tabIndex="-1"
        aria-labelledby="modalOldPrescriptionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="modalOldPrescriptionLabel"
              >
                Prescription (Old Date Wise / Prescribed By)
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {loadingPres ? (
              <LoadingBox></LoadingBox>
            ) : errorPres ? (
              <MessageBox>{errorPres}</MessageBox>
            ) : presc.length > 0 ? (
              presc.map((pre, index) => (
                <div className="modal-body relative p-4 " key={pre._id}>
                  <div className="p-2">
                    <div className="relative w-full overflow-hidden">
                      <input
                        type="checkbox"
                        className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                        checked={openDropdownIndex === index}
                        onChange={() => handleCheckboxClick(index)}
                      />
                      <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                        <h1 className="text-lg font-semibold text-gray-600">
                          {pre.doctorId ? pre.doctorId.name : ""} /
                          {truncate(pre.createdOn, 11)}
                          {/* {new Date(pre?.createdOn)
                            .toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            .split("/")
                            .join("-")} */}
                        </h1>
                      </div>
                      {/* Down Arrow Icon */}
                      <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180 ">
                        <FiChevronDown className="w-6 h-6" />
                      </div>
                      {/* Content */}
                      <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                        <div className="p-2 ">
                          <div className="form__Grid--Cols-6">
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="prescribedBy"
                                className="form__Label-Heading"
                              >
                                Doctor Name
                              </label>
                              <p className="form__Heading">
                                {" "}
                                {pre.doctorId ? pre.doctorId.name : ""}{" "}
                              </p>
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="prescribedFor"
                                className="form__Label-Heading"
                              >
                                Patient Name
                              </label>
                              <p className="form__Heading">
                                {pre.patientId ? pre.patientId.name : ""}
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
                                {truncate(pre.createdOn, 11)}
                              </p>
                            </div>
                            <div className="form__Cols--Span-6 invisible">
                              <label
                                htmlFor="prescribedDate"
                                className="form__Label-Heading"
                              >
                                Prescribed Date
                              </label>
                              <p className="form__Heading">
                                {truncate(pre.createdOn, 11)}
                              </p>
                            </div>
                            {pre.medicines.map((medicine, index) => (
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
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <MessageBox>No Prescription</MessageBox>
            )}

            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalOldDietchart"
        tabIndex="-1"
        aria-labelledby="modalOldDietchartLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="modalOldDietchartLabel"
              >
                Diet Chart (Old Date Wise / Prescribed By)
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {console.log("patientdietchart ==>", patientdietchart)}
            <div className="modal-body p-4">
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox>{error}</MessageBox>
              ) : patientdietchart.length > 0 ? (
                patientdietchart.map((dt, index) => (
                  <div className="modal-body relative" key={dt._id}>
                    <div className="p-2">
                      <div className=" w-full overflow-hidden">
                        <input
                          type="checkbox"
                          checked={openDropdownIndex === index}
                          onChange={() => handleCheckboxClick(index)}
                          className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                        />
                        <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                          <h1 className="text-lg font-semibold text-gray-600">
                            {dt.doctorId ? dt.doctorId.name : ""}/
                            {truncate(dt.assignedOn, 11)}
                          </h1>
                        </div>
                        {/* Down Arrow Icon */}
                        <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                          <FiChevronDown className="w-6 h-6" />
                        </div>
                        {/* Content */}
                        <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                          <div className="p-4">
                            <div className="form__Grid--Cols-6">
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="prescribedBy"
                                  className="form__Label-Heading"
                                >
                                  Doctor Name
                                </label>
                                <p className="form__Heading">
                                  {dt.doctorId ? dt.doctorId.name : ""}
                                </p>
                              </div>
                              {/* <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="prescribedFor"
                                  className="form__Label-Heading"
                                >
                                {}
                                  Patient Name
                                </label>
                                <p className="form__Heading">Zafar Irshad</p>
                              </div> */}
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="prescribedDate"
                                  className="form__Label-Heading"
                                >
                                  Prescribed Date
                                </label>
                                <p className="form__Heading">
                                  {truncate(dt.assignedOn, 11)}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="lowerCalories"
                                  className="form__Label-Heading"
                                >
                                  Low Calories Range
                                </label>
                                <p className="form__Heading">
                                  {dt.dietChartId.calorie_lower}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="highCalories"
                                  className="form__Label-Heading"
                                >
                                  High Clories Range
                                </label>
                                <p className="form__Heading">
                                  {dt.dietChartId.calorie_upper}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="lowerCarbohydrates"
                                  className="form__Label-Heading"
                                >
                                  Low Carbohydrates Range
                                </label>
                                <p className="form__Heading">
                                  {dt.dietChartId.ch_lower}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="highCarbohydrates"
                                  className="form__Label-Heading"
                                >
                                  High Carbohydrates Range
                                </label>
                                <p className="form__Heading">
                                  {dt.dietChartId.ch_upper}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="proties"
                                  className="form__Label-Heading"
                                >
                                  Protiens Range
                                </label>
                                <p className="form__Heading">
                                  {dt.dietChartId.protiens}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="fats"
                                  className="form__Label-Heading"
                                >
                                  Fats Range
                                </label>
                                <p className="form__Heading">
                                  {dt.dietChartId.fats}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="foodType"
                                  className="form__Label-Heading"
                                >
                                  Food Type (Veg / Nonveg / Egg)
                                </label>
                                <p className="form__Heading">Veg</p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="foodCusine"
                                  className="form__Label-Heading"
                                >
                                  Food Cusine
                                </label>
                                <p className="form__Heading">
                                  {dt.dietChartId.cuisine_type}
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
                                      href={dt.dietChartId.file}
                                      className="px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0      active:bg-emerald-800 active:shadow-lg transition duration-150  ease-in-out ml-1"
                                    >
                                      Download Diet Chart
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <MessageBox>No diet chart</MessageBox>
              )}
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                data-bs-dismiss="modal"
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

export default DoctorMeetingInfo;
