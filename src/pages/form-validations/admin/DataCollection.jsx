import React from "react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHealthPlans,
  getPerformanceData,
} from "../../../action/AdminAction";
import Papa from "papaparse";
import { Url } from "../../../constant.js/PatientConstant";
import Swal from "sweetalert2";
import LoadingBox from "../../../Components/LoadingBox";
import axios from "axios";
import { listAllPatients } from "../../../action/PatientAction";

const DataCollection = () => {
  const [patientInfo, setPatientInfo] = useState({ patientEmail: "" });
  const [formInfo, setFormInfo] = useState({ selectedForm: "" });
  const [employeePerformance, setEmployeePerformance] = useState({});
  const [employeeCsvError, setEmployeeCsvError] = useState(false);
  const [forms, setForms] = useState([]);
  const [formId, setFormId] = useState("");
  const [formQId, setFormQId] = useState("");
  const [patient, setPatient] = useState({});
  const [patientError, setPatientError] = useState(false);
  const [patientDataLoading, setPatientDataLoading] = useState(false);
  const [formMasterSheet, setFormMasterSheet] = useState([]);
  const [questionValue, setQuestionValue] = useState("");
  const [singleFormQuestionValue, setSingleFormQuestionValue] = useState([]);
  const [newQuestionValueData, setNewQuestionValueData] = useState([]);

  const [selectedProgram, setSelectedProgram] = useState("Select a Program");
  const { healthplans } = useSelector((state) => state.healthPlanReducer);

  // console.log("healthplans", healthplans);

  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  // patient platform usage summary states
  const [allDoctors, setAllDoctors] = useState([]);
  const [personalObservation, setPersonalObservation] = useState({
    observationList: [],
  });
  const [personalObservationValue, setPersonalObservationValue] = useState();
  const [doctorId, setDoctorId] = useState("");
  const [appointmentsAttended, setAppointmentsAttended] = useState({
    appointmentsAll: 0,
    appointmentsAttendedCount: 0,
    appointmentsAttendedlist: [],
  });
  const [patientEmailOne, setPatientEmailOne] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState({ email: "", phone: 0 });
  const [PriSecDaryTeam, setPriSecDaryTeam] = useState([]);
  const [countOfFormField, setCountOfFormField] = useState({
    questions: [
      {
        answers: [],
      },
    ],
  });

  const [personalObservationPatValue, setPersonalObservationPatValue] =
    useState("");
  // console.log("personalObservationPatValue ===> ", personalObservationPatValue);
  // primary/secondary Team
  const [patientIdValue, setPatientIdValue] = useState();
  const dispatch = useDispatch();
  const performanceState = useSelector((state) => state.employeePerformance);

  const adminDocInfo = useSelector((state) => state.adminSignin.adminDocInfo);

  const patientss = useSelector((state) => state.patientList);

  const { loading, patients } = patientss;

  useEffect(() => {
    dispatch(listAllPatients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllHealthPlans());
  }, [dispatch]);

  // let patientCount = 0;

  // console.log("patients", patients);

  // if (patients && patients.length > 0) {
  //   patientCount = patients.reduce((accumulator, obj) => {
  //     if (obj.health_plan.name === selectedProgram) {
  //       return accumulator + 1;
  //     }
  //     return accumulator;
  //   }, 0);
  // }

  let patientCnt = 0;

  if (patients && patients.length > 0) {
    const filteredPatients = patients.filter((patient) => {
      return patient.health_plan.some((plan) => {
        return plan.healthPlan === selectedProgram;
      });
    });

    patientCnt = filteredPatients.length;
  }

  // console.log("selectedProgram is", selectedProgram);
  // console.log("selectedProgram is", patientCnt);

  const formatDateString = (dateString) => {
    if (typeof dateString !== "string") {
      return "";
    }

    const strippedDate = dateString.slice(0, 10);
    return strippedDate;
  };

  useEffect(() => {
    fetch(`${Url}/forms/get-all`, {
      headers: {
        Authorization: `Bearer ${adminDocInfo.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setForms(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const downloadPatientCsv = () => {
    if (patientInfo.patientEmail) {
      setPatientError(false);
      setPatientDataLoading(true);

      fetch(`${Url}/data-collection/patient`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: patientInfo.patientEmail,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setPatient(data.data);
          setPatientDataLoading(false);
        })
        .catch((error) => {
          setPatientDataLoading(false);
          // console.log(error);
          Swal.fire({
            icon: "error",
            text: error.message,
          });
        });
    } else {
      setPatientError(true);
    }
  };
  const personalObservationFiltered =
    personalObservation?.observationList?.filter((pob) => pob.name);

  const personalObservationFiltered1 = personalObservationFiltered?.filter(
    (pob) =>
      personalObservationPatValue === ""
        ? pob.name
        : pob.name === personalObservationPatValue
  );

  useEffect(() => {
    if (patient && Object.keys(patient).length != 0) {
      try {
        const modifiedPatient = {
          // ...patient,
          // patient.health_plan_date.startDate
          // healthPlanEndDate: formatDateString(patient.health_plan_date.endDate),
          Patient_ID: patient.patient.patientId,
          Name: patient.patient.name,
          Age: patient.patient.age,
          Sex: patient.patient.gender,
          Phone: patient.patient.phone,
          Email: patient.patient.email,
          // secondaryTeamIds: JSON.stringify(patient.secondaryTeamIds),

          // Enrolments
          // Program_Name: patient.patient.health_plan.name,
          Payment_Status: patient.patient.paymentStatus,
          // Start_Date: formatDateString(
          //   patient.patient.health_plan_date.startDate
          // ),
          // End_Date: formatDateString(patient.patient.health_plan_date.endDate),
          // Primary_Team: patient.patient,
          // Secondary_Team: patient.patient,
          // Chat_Messages_Send_Count: patient.patient,
          // Chat_Messages_Received_Count: patient.patient,

          // Prescription Given
          Prescription_Given: patient.patientPrec.length,
          Medicine_Name: patient.patientPrec[0]?.medicines?.map(
            (prec) => prec.medName
          ),
          Date: formatDateString(patient?.patientPrec[0]?.createdOn),
          Total_Dose:
            Number(patient?.patientPrec[0]?.medicines[0]?.mornDose) +
            Number(patient?.patientPrec[0]?.medicines[0]?.aftDose) +
            Number(patient?.patientPrec[0]?.medicines[0]?.eveDose),
          Frequency: patient?.patientPrec?.map((prec) =>
            prec.medicines.map((p) => p.frequency)
          ),

          Forms: patient.forms.map((form, i) => `form${i + 1}`),
          Date_Of_Response: patient.forms.map((form) =>
            formatDateString(form.createdOn)
          ),
          Questions: patient.forms.map(
            (form) => form.questions[0].question_title
          ),

          // Patient_Feedback: "",
          // forms: patient.forms.map(() => {}),
        };

        // delete modifiedPatient.__v;
        // delete modifiedPatient.health_plan_date;

        const csvData = Papa.unparse([modifiedPatient]);
        // Create a Blob object from the CSV data[]
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

        // Create a temporary anchor element to download the CSV file
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        link.download = "patient.csv";
        link.click();
      } catch (error) {
        console.error(error);
      }
    }
  }, [patient]);

  // console.log("performanceState---->", performanceState);

  useEffect(() => {
    if (performanceState.data.data) {
      try {
        const fields = [
          "_id",
          "form_title",
          "status",
          "createdAt",
          "updatedAt",
          "questions",
          "doctorId._id",
          "doctorId.name",
          "doctorId.email",
          "__v",
        ];

        const modifiedData = performanceState?.data.data.map((item) => {
          // console.log("item------>", item);

          const modifiedItem = { ...item };

          // modifiedItem.questions = JSON.stringify(modifiedItem.questions);
          // // modifiedItem.patient_Id = modifiedItem?.patientId?._id;
          // modifiedItem.doctor_Id = modifiedItem?.doctorId?._id;
          // modifiedItem.medicines = modifiedItem?.medicines[0]?.medName;
          // modifiedItem.doctor_name = modifiedItem?.doctorId?.name;
          // modifiedItem.doctor_email = modifiedItem?.doctorId?.email;
          // modifiedItem.createdOn = formatDateString(modifiedItem?.createdOn);
          // delete modifiedItem.doctorId;
          // delete modifiedItem.patientId;
          // delete modifiedItem.questions;
          // delete modifiedItem.__v;

          if (item.form_title) {
            // Handle 'form' data
            modifiedItem._id = item?._id;
            modifiedItem.form_title = item?.form_title;
            modifiedItem.answered = item?.answered;
            modifiedItem.createdOn = item?.createdOn;
            modifiedItem.status = item?.status;
            modifiedItem.doctorId = item?.doctorId?.$oid;
            modifiedItem.doctor_name = item.doctorId?.name;
            modifiedItem.doctor_email = item.doctorId?.email;
            if (item.questions && item.questions.length > 0) {
              modifiedItem.question_titles = item.questions
                .map((question) => question.question_title)
                .join(", ");
            }
            delete modifiedItem.questions;
            delete modifiedItem.__v;
            delete modifiedItem.actions;
          } else if (item.medicines) {
            // Handle 'prescription' data
            modifiedItem._id = item._id;
            modifiedItem.patient_Id = item?.patientId?._id;
            modifiedItem.createdOn = item.createdOn;
            modifiedItem.medicineName = item?.medicines[0]?.medName;
            modifiedItem.doctor_Id = item?.doctorId?._id;
            modifiedItem.doctor_name = item?.doctorId?.name;
            modifiedItem.doctor_email = item?.doctorId?.email;
            delete modifiedItem.medicines;
            delete modifiedItem.patientId;
            delete modifiedItem.__v;
            delete modifiedItem?.doctorId;
          } else if (item.calorie_lower !== undefined) {
            // Handle 'dietchart' data
            modifiedItem._id = item._id;
            modifiedItem.doctor_Id = item?.doctorId?._id;
            modifiedItem.calorie_lower = item?.calorie_lower;
            modifiedItem.calorie_upper = item?.calorie_upper;
            modifiedItem.ch_lower = item?.ch_lower;
            modifiedItem.ch_upper = item?.ch_upper;
            modifiedItem.protiens = item?.protiens;
            modifiedItem.fats = item?.fats;
            modifiedItem.cuisine_type = item?.cuisine_type;
            modifiedItem.file = item?.file;
            modifiedItem.createdOn = item?.createdOn;
            modifiedItem.status = item?.status;
            delete modifiedItem.__v;
            delete modifiedItem.doctorId;
          }

          return modifiedItem;
        });

        const csvData = Papa.unparse(modifiedData, { fields });
        // Create a Blob object from the CSV data[]
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

        // Create a temporary anchor element to download the CSV file
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "employeePerformance.csv";
        link.click();
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [performanceState.data.data]);

  useEffect(() => {
    if (
      "from" in employeePerformance &&
      "to" in employeePerformance &&
      "activity" in employeePerformance
    ) {
      setEmployeeCsvError(false);
    }
  }, [employeePerformance]);

  const flattedForm = forms.map((f) => f.questions).flat(2);

  const handlePatientInputChange = (e) => {
    const value = e.target.value;
    setPatientInfo({ ...patientInfo, patientEmail: value });
  };

  const handlePatientEmailOne = (e) => {
    const value = e.target.value;
    setPatientEmailOne(value);
  };

  const handlePatientEmailOrPhone = (e) => {
    const value = e.target.value;
    if (value.includes("@")) {
      setEmailOrPhone({ phone: "0", email: value });
    } else {
      setEmailOrPhone({ email: "a@example.com", phone: value });
    }
  };
  // console.info("phoneOrPhone--->", emailOrPhone);

  //console.log("employeePerformance", employeePerformance);
  const handleDateInputChange = (e) => {
    const { name, value } = e.target;

    setEmployeePerformance((employeePerformance) => {
      const updatedEmployeePerformance = { ...employeePerformance };
      if (value === "") {
        delete updatedEmployeePerformance[name];
      } else {
        updatedEmployeePerformance[name] = value;
      }
      return updatedEmployeePerformance;
    });
  };

  // console.log("employeePerformance ==>", employeePerformance);
  const handleQuestionValueInputChange = (e) => {
    const value = e.target.value;
    setQuestionValue(value);
    setFormQId(selectedFormQuestionValue._id);
    // const singleQuestion = flattedForm.find((ff) => ff.question_title.includes);
  };

  const selectedFormQuestionValue =
    flattedForm?.find((form) => form?.question_title === questionValue) || {};

  // console.log("questionValue ===>", questionValue);
  // console.log("selectedFormQuestionValue  ===>", selectedFormQuestionValue);

  // selectDoctor
  const handleSelectDoctorInputChange = (e) => {
    const value = e.target.value;

    fetch(`${Url}/data-collection/form/${value}`, {
      headers: {
        Authorization: `Bearer ${adminDocInfo.token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setPatientIdValue(res.data);
      })
      .catch((error) => console.error(error));
    // console.log("patientIdValue =======>", patientIdValue);
  };
  const handlePersonalObservationDocInputChange = (e) => {
    const value = e.target.value;
    setPersonalObservationValue(value);
    setPersonalObservationPatValue("");
    const selectedDoctor = allDoctors.filter((doc) => doc.name == value);
    setDoctorId(e.target.value == "" ? 123 : selectedDoctor[0]._id);
  };

  const handlePersonalObservationPatInputChange = (e) => {
    const value = e.target.value;
    setPersonalObservationPatValue(value);
  };

  const handleFormInputChange = (e) => {
    const value = e.target.value;
    setFormInfo({ ...formInfo, selectedForm: value });
    setFormId(selectedForm._id);
  };

  const handleCountOfFormFilledInputChange = (e) => {
    const value = e.target.value;
    const selectedForm2 = forms?.find((form) => form.form_title === value);
    fetch(`${Url}/data-collection/form/${selectedForm2._id}`, {
      headers: {
        Authorization: `Bearer ${adminDocInfo.token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setCountOfFormField(res.data);
      })
      .catch((error) => console.error(error));
  };

  const selectedForm =
    forms?.find((form) => form.form_title === formInfo.selectedForm) || {};

  const downloadCsv = async () => {
    dispatch(getPerformanceData(employeePerformance));
  };

  // integrating master sheet api
  useEffect(() => {
    fetch(`${Url}/data-collection/form/${selectedForm._id}`, {
      headers: {
        Authorization: `Bearer ${adminDocInfo.token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setFormMasterSheet(res.data);
      })
      .catch((error) => console.error(error));
  }, [formId]);

  // integrating Form Question/Value specific api
  useEffect(() => {
    fetch(`${Url}/data-collection/form/${selectedFormQuestionValue._id}`, {
      headers: {
        Authorization: `Bearer ${adminDocInfo.token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setSingleFormQuestionValue(res.data);
      })
      .catch((error) => console.error(error));
  }, [selectedFormQuestionValue]);

  // integrating Form Question/Value specific api

  useEffect(() => {
    fetch(`${Url}/data-collection/getFormByQuestion`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminDocInfo.token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question: questionValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        setNewQuestionValueData(res.data);
      })
      .catch((error) => {
        setPatientDataLoading(false);
      });
  }, [questionValue]);

  //
  useEffect(() => {
    fetch(`${Url}/data-collection/patientAppointmentCount/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminDocInfo.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: patientEmailOne,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAppointmentsAttended(data);
        setPatientDataLoading(false);
      })
      .catch((error) => {
        setPatientDataLoading(false);
        setAppointmentsAttended({
          appointmentsAll: 0,
          appointmentsAttendedCount: 0,
          appointmentsAttendedlist: [],
        });
      });
  }, [patientEmailOne]);

  // primary Team secondary team api (phone or email)
  useEffect(() => {
    fetch(`${Url}/data-collection/getPatientByphoneAndEmail`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminDocInfo.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailOrPhone.email,
        phone: emailOrPhone.phone,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setPriSecDaryTeam(data);
        setPatientDataLoading(false);
      })
      .catch((error) => {
        setPriSecDaryTeam({
          secondaryCount: 0,
          primaryCount: 0,
        });
        setPatientDataLoading(false);
      });
  }, [emailOrPhone]);

  //get all doctors for personal observation
  useEffect(() => {
    fetch(`${Url}/doctors/get-all`, {
      headers: {
        Authorization: `Bearer ${adminDocInfo.token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        // console.info("allDoctors-->", res.data);
        setAllDoctors(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // fetching list of personal observation api
  useEffect(() => {
    fetch(`${Url}/data-collection/personalObservation/${doctorId}`, {
      headers: {
        Authorization: `Bearer ${adminDocInfo.token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setPersonalObservation(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [doctorId]);

  useEffect(() => {
    // Cleanup function to reset the state to an empty array
    return () => {
      dispatch(getPerformanceData([]));
    };
  }, [dispatch]);

  // console.log("forms --------->", forms);

  // download form csv ( Form Master Sheet Download )
  const downloadFormCsv = () => {
    const docNames = `${formMasterSheet.questions[0].answers[0]?.patientId.primaryTeamIds[0].name},${formMasterSheet.questions[0].answers[0]?.patientId.secondaryTeamIds[0].name}`;
    if (forms) {
      // const selectedForm =
      //   forms?.find((form) => form.form_title === formInfo.selectedForm) || {};

      const modifiedForm = {
        Patient_Name: formMasterSheet.questions[0].answers[0]?.patientId.name,
        Phone: formMasterSheet.questions[0].answers[0]?.patientId.phone,
        Team: docNames,
        Program:
          formMasterSheet.questions[0].answers[0]?.patientId.health_plan.name,
        Filling_Date: formatDateString(formMasterSheet.createdOn),
        Questions: formMasterSheet.questions.map((q) => q.question_title),
        Answers: formMasterSheet?.questions[0]?.answers?.map((q) => q.data),
      };

      delete modifiedForm.doctorId;
      delete modifiedForm.__v;
      // Filter out the 'doctorId' key and its sub-keys from the CSV headers
      // const csvHeaders = Object.keys(modifiedForm).filter((key) => key !== 'doctorId' && key !== '__v');

      //console.log("modifiedForm ==========>", modifiedForm);
      const csvData = Papa.unparse([modifiedForm]);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

      // Create a temporary anchor element to download the CSV file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "formData.csv";
      link.click();
    }
  };

  // download Question/Value specific csv ( Form Question/Value specific)
  const downloadQuestionValueCsv = () => {
    if (newQuestionValueData.length < 2) {
      Swal.fire({
        icon: "info",
        text: "No data available for this question. Please check for spelling mistakes.",
      });
      return;
    }

    if (forms) {
      const modifiedForm =
        newQuestionValueData &&
        newQuestionValueData.map((qvData) => {
          // if (qvData.length < 2) {
          //   alert("qvData is empty!");
          //   return {};
          // }

          return {
            // Question: qvData.question,
            Program_Name: qvData?.patient?.health_plan?.name,
            Start_Date: formatDateString(
              qvData?.patient?.health_plan_date?.startDate
            ),
            End_Date: formatDateString(
              qvData?.patient?.health_plan_date?.endDate
            ),
            Patient_Name: qvData?.patient?.name,
            Patient_ID: qvData?.patient?.patientId,
            Patient_Phone: qvData?.patient?.phone,
            Patient_Gender: qvData?.patient?.gender,
            Patient_Age: qvData?.patient?.age,
            Patient_Primary_Team: qvData?.patient?.primaryTeamIds?.map(
              (p) => p.name
            ),
            Patient_Secondary_Team: qvData?.patient?.secondaryTeamIds?.map(
              (p) => p.name
            ),
            Dates: qvData?.answers?.map((a) => formatDateString(a.fillingDate)),
            Answers: qvData?.answers?.map((a) => a.data),
          };
        });

      delete modifiedForm.doctorId;
      delete modifiedForm.__v;

      const csvData = Papa.unparse(modifiedForm);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

      // Create a temporary anchor element to download the CSV file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "formData.csv";
      link.click();
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="card__Container--Around">
        <div className="card__Block">
          <h5 className="card__Heading">
            Patient Master Sheet Download
            <span className="card__Heading--Span card__Bg--Teal">Active</span>
          </h5>
          <p className="card__Info">
            {/* Some quick example text to build on the card title and make up the
            bulk of the card's content. */}
          </p>
          <div className="form__Grid--Rows-none">
            <div className="form__Cols--Span-6">
              <input
                type="text"
                name="employee-name"
                id="employee-name"
                autoComplete="given-name"
                className="form__Input"
                placeholder="Enter Patient Email "
                onChange={handlePatientInputChange}
                value={patientInfo.patientEmail}
              />
            </div>
            <div className="form__Cols--Span-6">
              <button
                onClick={downloadPatientCsv}
                type="button"
                className="card__Btn card__Bg--Teal card__Btn--Bg-Teal"
              >
                Download CSV
              </button>
              {patientDataLoading && <LoadingBox></LoadingBox>}
              {patientError && (
                <p className="text-red-500 mt-3 font-thin tracking-tight leading-3">
                  please enter the patient email
                </p>
              )}
            </div>
          </div>
        </div>
        {/* master sheet */}
        <div className="card__Block">
          <h5 className="card__Heading">
            Form Master Sheet Download
            <span className="card__Heading--Span card__Bg--Sky">Active</span>
          </h5>
          <p className="card__Info">
            {/* Some quick example text to build on the card title and make up the
            bulk of the card's content. */}
          </p>
          <div className="form__Grid--Rows-none">
            <div className="form__Cols--Span-6">
              <select
                id="form"
                name="form"
                autoComplete="form-name"
                className="form__Select"
                onChange={handleFormInputChange}
                // value={formInfo.selectedForm}
              >
                <option className="font-bold" value="" data-default>
                  Select Form
                </option>
                {forms.map((form) => (
                  <option key={form._id}>{form.form_title}</option>
                ))}
              </select>
            </div>
            <div className="form__Cols--Span-6">
              <button
                onClick={formInfo?.selectedForm ? downloadFormCsv : ""}
                type="button"
                className="card__Btn card__Bg--Sky card__Btn--Bg-Sky"
              >
                Download CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* s */}
      <div className="my-10 card__Container--Around">
        <div className="card__Block">
          <h5 className="card__Heading">
            Employee Performance
            <span className="card__Heading--Span card__Bg--Cyan">Active</span>
          </h5>
          <p className="card__Info"></p>
          <div className="form__Grid--Cols-2">
            <div className="form__Cols--Span-6">
              <input
                type="date"
                name="from"
                autoComplete="given-name"
                className="form__Input"
                placeholder="Enter Employee Id"
                onChange={handleDateInputChange}
                max={today}
              />
            </div>
            <div className="form__Cols--Span-6">
              <input
                type="date"
                name="to"
                autoComplete="given-name"
                className="form__Input"
                placeholder="Enter Employee Id"
                onChange={handleDateInputChange}
                max={today}
              />
            </div>
            <div className="form__Cols--Span-6">
              <select
                id="activity"
                name="activity"
                autoComplete="activity-name"
                className="form__Select capitalize"
                onChange={handleDateInputChange}
              >
                <option value="" data-default>
                  Select Activity
                </option>
                <option className="capitalize">form</option>
                <option className="capitalize">diet-chart</option>
                <option className="capitalize">prescription</option>
                {/* 
                <option>Diet Chart Uploaded/Allocated</option>
                <option>Prescriptions Created</option>
                <option>Chat Messages Count</option>
                <option>Patient Feedback</option> */}
              </select>
            </div>
            <div className="form__Cols--Span-6">
              <button
                onClick={() => {
                  if (
                    "from" in employeePerformance &&
                    "to" in employeePerformance &&
                    "activity" in employeePerformance
                  ) {
                    downloadCsv();
                    setEmployeeCsvError(false);
                  } else {
                    setEmployeeCsvError(true);
                  }
                }}
                type="button"
                className="card__Btn card__Bg--Cyan card__Btn--Bg-Cyan"
              >
                Download CSV
              </button>
              {performanceState.loading && <LoadingBox></LoadingBox>}
              {employeeCsvError && (
                <p className="text-red-500 mt-3 font-thin tracking-tight leading-3">
                  please fill all fields
                </p>
              )}
              {/* {performanceState.error && (
                <p className="text-red-500 mt-3 font-thin tracking-tight leading-3">
                  {performanceState.error}
                </p>
              )} */}
            </div>
          </div>
        </div>

        {/* form Question/Value sepcific */}
        <div className="card__Block h-56">
          <h5 className="card__Heading">
            Form Question / Value Specific
            <span className="card__Heading--Span card__Bg--Teal">Active</span>
          </h5>
          <p className="card__Info">
            {/* Some quick example text to build on the card title and make up the
            bulk of the card's content. */}
          </p>
          <div className="form__Grid--Rows-none">
            <div className="form__Cols--Span-6">
              <input
                type="text"
                name="question-name"
                id="question-name"
                autoComplete="question-name"
                className="form__Input"
                placeholder="Search By Question"
                onChange={handleQuestionValueInputChange}
                value={questionValue}
              />
            </div>
            <div className="form__Cols--Span-6">
              <button
                onClick={downloadQuestionValueCsv}
                type="button"
                className="card__Btn card__Bg--Teal card__Btn--Bg-Teal"
              >
                Download CSV
              </button>
              {patientDataLoading && <LoadingBox></LoadingBox>}
            </div>
          </div>
        </div>
      </div>

      {/*   Patient platform usage summary  */}
      <div className="my-10  card__Container--Around  ">
        <div className=" w-[1000px] shadow-lg px-5 py-8">
          <h5 className="card__Heading">
            Patient platform usage summary
            <span className="card__Heading--Span card__Bg--Cyan">Active</span>
          </h5>
          <div className=" grid grid-cols-2 gap-8">
            {/* one */}
            <div className="my-5 overflow-hidden">
              <div className="list__Flexbox--Center">
                <ul className="nav-tabs nav-justified list__Container">
                  <li className="list__Heading list__Round--Top-Lg ">
                    Patient Email:
                    <span className="list__Heading--Span">
                      {/* {selectedProgram} */}
                    </span>
                    <input
                      type="text"
                      name="patient-email"
                      id="patient-email"
                      autoComplete="given-email"
                      className="form__Input"
                      placeholder="Enter Patient Email "
                      onChange={handlePatientEmailOne}
                      // value={patientInfo.patientEmail}
                    />
                  </li>
                  {/* {console.log("patientEmailOne==>", patientEmailOne)} */}

                  <li className="list__Heading">
                    Total Appointments:
                    <span className="list__Heading--Span">
                      {appointmentsAttended?.appointmentsAll}
                    </span>
                  </li>
                  <li className="list__Heading">
                    Appointments Attended:
                    <span className="list__Heading--Span">
                      {appointmentsAttended?.appointmentsAttendedCount}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* two */}
            <div className="my-5 overflow-hidden">
              <div className="list__Flexbox--Center">
                <ul className="nav-tabs nav-justified list__Container">
                  <li className="list__Heading list__Round--Top-Lg ">
                    <div className="form__Cols--Span-6">
                      <select
                        id="form"
                        name="form"
                        autoComplete="form-name"
                        className="form__Select"
                        onChange={handleCountOfFormFilledInputChange}
                        // value={formInfo.selectedForm}
                      >
                        <option className="font-bold" value="" data-default>
                          Select Form
                        </option>
                        {forms.map((form) => (
                          <option key={form.id}>{form.form_title}</option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <li className="list__Heading">
                    Counts Of Forms Filled:
                    <span className="list__Heading--Span">
                      {countOfFormField?.questions[0]?.answers == []
                        ? 0
                        : countOfFormField?.questions[0]?.answers?.length}
                      {/* {patientCount} */}
                      {/* {patientCount !== undefined ? patientCount : 0} */}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* three */}
            <div className="my-5 overflow-hidden col-span-2">
              <div className="list__Flexbox--Center ">
                <ul className="  w-[880px]">
                  <li className="list__Heading list__Round--Top-Lg flex gap-5 ">
                    <div className="flex-1 ">
                      Select Doctor:
                      <select
                        id="form"
                        name="form"
                        autoComplete="form-name"
                        className="form__Select inline  "
                        onChange={handlePersonalObservationDocInputChange}
                        value={personalObservationValue}
                      >
                        <option className="font-bold" value="" data-default>
                          Select Doctor
                        </option>
                        {allDoctors.map((doc) => (
                          <option key={doc._id}>{doc.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 ">
                      Select Patient:
                      <select
                        id="form"
                        name="form"
                        autoComplete="form-name"
                        className="form__Select inline  "
                        onChange={handlePersonalObservationPatInputChange}
                      >
                        <option className="font-bold" value="" data-default>
                          Select Patient
                        </option>
                        {personalObservationFiltered?.map((pob, index) => (
                          <option key={index}>{pob.name}</option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <li className="list__Heading my-2">
                    Personal Observations:
                    <span className="list__Heading--Span">
                      {personalObservationFiltered1?.length}
                    </span>
                  </li>

                  {/* table */}
                  <table className="table__Container">
                    <thead className="table__Head font-semibold">
                      <tr className="text-3xl text-start align-top">
                        <th className="font-semibold text-[17px] text-gray-600 text-start ">
                          Sl No.
                        </th>
                        <th className="font-semibold w-36 text-[17px] text-gray-600 text-start">
                          Patient Name
                        </th>
                        <th className="font-semibold w-28  text-[17px] text-gray-600 text-start">
                          Doctor Name
                        </th>
                        <th className="font-semibold pl-2 text-[17px] text-gray-600 text-start">
                          Description
                        </th>
                        <th className="font-semibold  text-[17px] text-gray-600 text-start">
                          Created Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {personalObservationFiltered1?.map((pob, id) => (
                        <tr className="table__Body--Row" key={id}>
                          <td className="text-[16px] py-2 ">{id + 1}</td>
                          <td className="text-[16px] py-2  px-1 ">
                            {pob?.name}
                          </td>
                          <td className="text-[16px] py-2 ">
                            {pob?.observations[0].docName}
                          </td>
                          <td className="text-[16px] py-2 px-1  max-w-2xl">
                            {pob?.observations[0].desc}
                          </td>
                          <td className="text-[16px] py-2 px-1 ">
                            {formatDateString(pob?.observations[0].createdOn)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ul>
              </div>
            </div>
            {/* four */}
            <div className="my-5 overflow-hidden">
              <div className="list__Flexbox--Center">
                <ul className="nav-tabs nav-justified list__Container">
                  <li className="list__Heading list__Round--Top-Lg ">
                    Patient Email/Phone:
                    <span className="list__Heading--Span">
                      {/* {selectedProgram} */}
                    </span>
                    <input
                      type="text"
                      name="patient-email"
                      id="patient-email"
                      autoComplete="given-email"
                      className="form__Input"
                      placeholder="Enter Patient Email or Phone "
                      onChange={handlePatientEmailOrPhone}
                      // value={emailOrPhone}
                    />
                  </li>

                  <li className="list__Heading">
                    Primary Team:
                    <span className="list__Heading--Span">
                      {PriSecDaryTeam?.primaryCount}
                    </span>
                  </li>
                  <li className="list__Heading">
                    Secondary Team:
                    <span className="list__Heading--Span">
                      {PriSecDaryTeam?.secondaryCount}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* five */}
            <div className="my-5 overflow-hidden">
              <div className="list__Flexbox--Center">
                <ul className="nav-tabs nav-justified list__Container">
                  <li className="list__Heading list__Round--Top-Lg ">
                    Select Program:
                    <span className="list__Heading--Span">
                      {/* {selectedProgram} */}
                    </span>
                    <select
                      id="program"
                      name="program"
                      autoComplete="program-name"
                      className="form__Select"
                      onChange={handleProgramChange}
                    >
                      <option value="" data-default>
                        Select Program
                      </option>
                      {healthplans?.map((h, key) => (
                        <option value={h._id} id={h.name} key={h._id}>
                          {h.name}
                        </option>
                      ))}
                    </select>
                  </li>

                  <li className="list__Heading">
                    Program enrolled: {patientCnt}
                    {/* <span className="list__Heading--Span">
                      0{/* {patientCount} */}
                    {/* {patientCount !== undefined ? patientCount : 0} */}
                    {/* </span> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* List of all chat messages sent and received */}
      {/* <div className="my-10  card__Container--Around ">
        <div className=" w-[1000px] shadow-lg px-5 py-8  ">
          <h5 className="card__Heading">
            List of all chat messages sent and received
            <span className="card__Heading--Span card__Bg--Cyan">Active</span>
          </h5>
          <div className=" grid grid-cols-2 gap-4 ">
            <div className="my-10 overflow-hidden">
              <div className="list__Flexbox--Center">
                <ul className="nav-tabs nav-justified list__Container">
                  <li className="list__Heading">
                    Sender Name:
                    <span className="list__Heading--Span">0</span>
                  </li>
                  <li className="list__Heading">
                    Sender ID:
                    <span className="list__Heading--Span">0</span>
                  </li>
                  <li className="list__Heading">
                    Sender Type:
                    <span className="list__Heading--Span">0</span>
                  </li>
                  <li className="list__Heading">
                    Message Text:
                    <span className="list__Heading--Span">0</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default DataCollection;
