import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { Url } from "../../../constant.js/PatientConstant";
import Papa from "papaparse";
import { useSelector } from "react-redux";
import LoadingBox from "../../../Components/LoadingBox";

const Summaryinfo = () => {
  const navigate = useNavigate();
  const adminDocInfo = useSelector((state) => state.adminSignin.adminDocInfo);
  const [patientData, setPatientData] = useState();
  const [patientsPendingPaymentData, setPatientsPendingPaymentData] =
    useState();

  const [bool, setBool] = useState(false);
  const [
    patientsPendingPaymentDataLoading,
    setPatientsPendingPaymentDataLoading,
  ] = useState(false);
  const [employeeData, setEmployeeData] = useState();
  const formatDateString = (dateString) => {
    if (typeof dateString !== "string") {
      return "";
    }
    const strippedDate = dateString.slice(0, 10);
    return strippedDate;
  };
  const rupeesIndianLocale = Intl.NumberFormat("en-IN");

  //employee-data csv
  useEffect(() => {
    if (employeeData) {
      let employeeCsvData = employeeData;
      employeeCsvData.forEach((employee) => {
        employee.programs.forEach((program, index) => {
          Object.keys(program).forEach((key) => {
            employee[`program_${index + 1}_${key}`] = program[key];
          });
        });

        delete employee.programs;
      });

      const csvData = Papa.unparse(employeeCsvData);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "employee-data.csv";
      link.click();
    }
  }, [employeeData]);

  // patient-data csv
  useEffect(() => {
    if (patientData) {
      const patientCsvData = patientData.planDetails;

      const csvData = Papa.unparse(patientCsvData);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "patient.csv";
      link.click();
    }
  }, [patientData]);

  const downloadPatientsPendingPaymentData = async () => {
    setPatientsPendingPaymentDataLoading(true);
    try {
      const response = await fetch(`${Url}/summary/payment-pendings`, {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      });
      const data = await response.json();
      setPatientsPendingPaymentData(data?.data);
      setPatientsPendingPaymentDataLoading(false);
      console.log("data ===>", data.data);
      setBool(true);
    } catch (error) {
      console.error(error);
      setPatientsPendingPaymentDataLoading(false);
    }
  };

  const downloadPatientsPendingPaymentData2 = async () => {
    setPatientsPendingPaymentDataLoading(true);
    try {
      const response = await fetch(`${Url}/summary/payment-pendings`, {
        headers: {
          Authorization: `Bearer ${adminDocInfo.token}`,
        },
      });
      const data = await response.json();
      setPatientsPendingPaymentData(data?.data);
      setPatientsPendingPaymentDataLoading(false);
    } catch (error) {
      console.error(error);
      setPatientsPendingPaymentDataLoading(false);
    }
  };

  // ------------------------------------------------------------

  const totalAmount =
    patientsPendingPaymentData?.reduce((acc, pat) => {
      const patientTotal = pat.health_plan.reduce(
        (total, plan) => total + plan.healthPlan.price,
        0
      );
      return acc + patientTotal;
    }, 0) || 0;

  const totalPaid =
    patientsPendingPaymentData?.reduce((acc, pat) => {
      const patientTotal = pat.health_amount_paid.reduce(
        (total, plan) => total + plan.paids,
        0
      );
      return acc + patientTotal;
    }, 0) || 0;

  // console.log("pending", totalAmount);
  // console.log("pending", totalPaid);
  // console.log("pending", totalAmount - totalPaid);

  const pendingAmount = totalAmount - totalPaid;

  // ------------------------------------------------------------

  const modifiedPatientsPendingPaymentData = patientsPendingPaymentData?.map(
    (patient) => ({
      patientName: patient?.name,
      phoneNumber: patient?.phone,
      patientId: patient?.patientId,
      // programName: patient?.health_plan.name,
      enrollmentStartDate: formatDateString(patient?.createdOn),
      totalFee: `${
        patient?.health_plan.name === "Trial"
          ? 2500
          : patient?.health_plan.name === "Trial-Endocare"
          ? 2000
          : patient?.health_plan.name === "Optimisation"
          ? 15000
          : patient?.health_plan.name === "Intense Care"
          ? 12500
          : ""
      }`,

      //
      amountPending: `${
        patient?.health_plan.name === "Trial"
          ? 2500 -
            patient?.health_amount_paid.reduce(
              (acc, curr) => acc + curr.paids,
              0
            )
          : patient?.health_plan.name === "Trial-Endocare"
          ? 2000 -
            patient?.health_amount_paid.reduce(
              (acc, curr) => acc + curr.paids,
              0
            )
          : patient?.health_plan.name === "Optimisation"
          ? 15000 -
            patient?.health_amount_paid.reduce(
              (acc, curr) => acc + curr.paids,
              0
            )
          : patient?.health_plan.name === "Intense Care"
          ? 12500 -
            patient?.health_amount_paid.reduce(
              (acc, curr) => acc + curr.paids,
              0
            )
          : ""
      }`,
      lastPayment: formatDateString(
        patient?.health_amount_paid[patient?.health_amount_paid.length - 1]
          ?.createdOn
      ),
      nextPaymentDate: formatDateString(patient?.next_payment_date),
    })
  );
  // console.log(
  //   "modifiedPatientsPendingPaymentData -->",
  //   modifiedPatientsPendingPaymentData
  // );
  // const totalPendingPayment = modifiedPatientsPendingPaymentData?.reduce(
  //   (acc, curr) => acc + Number(curr.amountPending),
  //   0
  // );

  // console.info("totalPendingPayment", totalPendingPayment);

  // calling useEffect
  useEffect(() => {
    downloadPatientsPendingPaymentData2();
  }, []);

  console.log("patientsPendingPaymentData ==>", patientsPendingPaymentData);

  useEffect(() => {
    if (bool) {
      const modifiedPatientsPendingPaymentData =
        patientsPendingPaymentData?.map((patient) => ({
          patientName: patient?.name,
          phoneNumber: patient?.phone,
          patientId: patient?.patientId,
          programName: patient?.health_plan.map((hp) => {
            return hp.healthPlan.name;
          }),
          enrollmentStartDate: formatDateString(patient?.createdOn),

          totalFee: patient?.health_plan.reduce(
            (total, plan) => total + plan.healthPlan.price,
            0
          ),

          amountPending:
            patient?.health_plan.reduce(
              (total, plan) => total + plan.healthPlan.price,
              0
            ) -
            patient.health_amount_paid.reduce(
              (total, plan) => total + plan.paids,
              0
            ),

          lastPayment: formatDateString(
            patient?.health_amount_paid[patient?.health_amount_paid.length - 1]
              ?.createdOn
          ),
          nextPaymentDate: formatDateString(patient?.next_payment_date),
        }));

      console.log(
        "modifiedPatientsPendingPaymentData -->",
        modifiedPatientsPendingPaymentData
      );

      // const csvData = Papa.unparse(patientCsvData);
      const csvData = Papa.unparse(modifiedPatientsPendingPaymentData);

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

      // Create a temporary anchor element to download the CSV file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "patientsPendingPaymentData.csv";
      link.click();
      setBool(false);
      // document.body.removeChild(link);
    }
  }, [downloadPatientsPendingPaymentData]);

  // console.log("patientsPendingPaymentData -->", patientsPendingPaymentData);

  return (
    <>
      <div className="card__Container--Evenly">
        <div className="card__Block">
          <h5 className="card__Heading">
            Pending Payment
            <span className="card__Heading--Span card__Bg--Red">Active</span>
          </h5>
          <p className="card__Info">
            {/* Some quick example text to build on the card title and make up the
            bulk of the card's content. */}
          </p>
          <button
            onClick={downloadPatientsPendingPaymentData}
            type="button"
            className="card__Btn card__Bg--Red card__Btn--Bg-Red"
          >
            Download CSV
          </button>

          <span className="px-2 font-semibold  text-green-700 ">
            ₹ {pendingAmount}
            {/* {rupeesIndianLocale.format(
              totalPendingPayment === undefined ? 0 : totalPendingPayment
            )} */}
          </span>

          {patientsPendingPaymentDataLoading && <LoadingBox></LoadingBox>}
        </div>
        <div className="card__Block">
          <h5 className="card__Heading">
            Patient Enrolment
            <span className="card__Heading--Span card__Bg--Teal">
              Per Program
            </span>
          </h5>
          <p className="card__Info">
            {/* Some quick example text to build on the card title and make up the
            bulk of the card's content. */}
          </p>
          {/* 
          <button
            // disabled={!patientData}
            onClick={downloadpatientData}
            type="button"
            className="card__Btn card__Bg--Red card__Btn--Bg-Red"
          >
            Download CSV
          </button>
           */}
          <button
            type="button"
            className="card__Btn card__Btn--Gap-1 card__Bg--Teal card__Btn--Bg-Teal"
            onClick={() => navigate("/Admin/dashboard/patient/enrolment/view/")}
          >
            View Enrolments
          </button>
        </div>
        <div className="card__Block">
          <h5 className="card__Heading">
            Employee Summary
            <span className="card__Heading--Span card__Bg--Cyan">Doctors</span>
          </h5>
          <p className="card__Info">
            {/* Some quick example text to build on the card title and make up the
            bulk of the card's content. */}
          </p>
          {/* 
          <button
            onClick={fetchEmployeeData}
            type="button"
            className="card__Btn card__Bg--Red card__Btn--Bg-Red"
          >
            Download CSV
          </button>
          {employeeDataLoading && <LoadingBox></LoadingBox>}
           */}

          <button
            type="button"
            className="card__Btn card__Btn--Gap-2 card__Bg--Cyan card__Btn--Bg-Cyan"
            onClick={() => navigate("/Admin/dashboard/summary/employee/view/")}
          >
            View Summary
          </button>
        </div>
      </div>
    </>
  );
};

export default Summaryinfo;
