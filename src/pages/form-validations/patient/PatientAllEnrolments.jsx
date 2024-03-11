import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Url } from "../../../constant.js/PatientConstant";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { DetailsPatients } from "../../../action/PatientAction";
import { truncate } from "../../../constant.js/Constant";

const PatientAllEnrolments = () => {
  const dispatch = useDispatch();
  const [patientsData, setPatientsData] = useState([]);
  const [currentAmount, setCurrentAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [markPatientPayment, setMarkPatientPayment] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [clickedRowData, setClickedRowData] = useState(null); // State to hold clicked row data

  const [index, setIndex] = useState(0);

  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;

  const myPatientdetail = useSelector((state) => state.patientDetails) || {};
  const { loadingPatientDetail, success, patient } = myPatientdetail;

  const patientData = patient?.data;
  console.log("myPatientdetail22244 ===>", patient);
  console.log("myPatientdetail222 ===>", patientData);

  useEffect(() => {
    dispatch(DetailsPatients(patId));
  }, []);

  console.log(clickedRowData);

  // console.log("-myPatientId-->", myPatientId);
  // console.log("currentAmount ==>", currentAmount);

  const doctorInfo = JSON.parse(window.localStorage.getItem("doctorInfo"));

  const apiUrl = `${Url}/doctors/get-all-patients/`;

  const markPaymentApi = `${Url}/patients/mark-payment/${patId}`;

  // console.log("markPaymentApi", markPaymentApi);

  const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${doctorInfo.token}`,
    },
  });

  console.log("patId-->", patId);
  const fetchPatientsData = async () => {
    try {
      const res = await authAxios.get();
      setPatientsData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  console.log("patientData", patientData);
  const singlePatient = patientsData.filter((p) => patId === p._id);
  console.log("singlePatient", singlePatient);

  const handlePayAmount = async () => {
    console.log("currentAmount=>", currentAmount);
    // if (total === 0) {
    //   window.location.reload(true);
    // }
    if (currentAmount && paymentType) {
      const res = await axios.put(
        markPaymentApi,
        { healthId: clickedRowData.healthId, paids: currentAmount },
        {
          headers: {
            Authorization: `Bearer ${doctorInfo.token}`,
          },
        }
      );
      console.log("mark payment res", res);
      setMarkPatientPayment([res.data.data]);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Payment Done",
        showConfirmButton: false,
        timer: 1500,
      });

      setCurrentAmount("");
      setPaymentType("");

      // console.log("totaltotal ==>", total === currentAmount);
    } else {
      Swal.fire({
        title: "Please fill all the fields ",
        icon: "question",
        iconHtml: "!",
        cancelButtonText: "Ok",
        showCloseButton: true,
      });
      setCurrentAmount("");
      setPaymentType("");
    }
    dispatch(DetailsPatients(patId));
  };

  useEffect(() => {
    fetchPatientsData();
  }, []);

  // let total;
  // singlePatient.map((s) => {
  //   total =
  //     s.health_plan?.price -
  //     s.health_amount_paid.reduce((accumulator, payment) => {
  //       return accumulator + payment.paids;
  //     }, 0);
  // });

  const calculateTotalPayments = (healthId, healthAmountPaid) => {
    return healthAmountPaid
      .filter((h) => h?.healthId === healthId)
      .reduce((accumulator, payment) => {
        return accumulator + payment.paids;
      }, 0);
  };

  // let total;
  // patientData &&
  //   patientData?.health_plan?.map((p, i) => {
  //     total =
  //       p.healthPlan?.price -
  //       calculateTotalPayments(
  //         p.healthPlan?.name,
  //         patientData?.health_amount_paid
  //       );
  //   });

  // var dateStart = patientData.health_plan_date.startDate
  //   .split("T")[0]
  //   .split("-");
  // var dateEnd = patientData.health_plan_date.endDate.split("T")[0].split("-");
  var dateEnrolled = patientData?.createdOn?.split("T")[0].split("-");

  // Function to handle the "Pay now" button click and set the clicked row data
  const handlePayNowClick = (rowData) => {
    setClickedRowData(rowData);
    setShowModal(true)
  };

  console.log("clickedRowData is", clickedRowData);

  return (
    <>
      <div className="my-10">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-10 p-3 text-lg font-semibold tracking-wide text-center">
                Sl No.
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Patient Name
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Health Plan
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Duration
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Enrolled Date
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Balance
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Payments
              </th>

              {/* {console.log("total is", total)} */}

              {/* {total === 0 ? (
                ""
              ) : ( */}
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-left">
                Pay Now
              </th>
              {/* )} */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {console.log("singlePatient", singlePatient)}

            {patientData &&
              patientData?.health_plan?.map((p, i) => {
                const total =
                  p.healthPlan?.price -
                  calculateTotalPayments(
                    p?.healthId,
                    patientData?.health_amount_paid
                  );

                {
                  /* const duration = p?.healthPlan?.duration; */
                }
                {
                  /* 
                const nextdate = new Date(p?.createdOn);

                nextdate.setMonth(nextdate.getMonth() + duration); */
                }

                const healthPlanDate = patientData.health_plan_date[i];

                {
                  /* console.log(
                  "matchingHealthPlanDate is",
                  new Date(healthPlanDate.startDate).toISOString().split("T")[0]
                );
                console.log(
                  "matchingHealthPlanDate is",
                  new Date().toISOString().split("T")[0]
                ); */
                }

                const isButtonDisabled =
                  new Date(healthPlanDate.startDate)
                    .toISOString()
                    .split("T")[0] > new Date().toISOString().split("T")[0];

                console.log("isButtonDisabled", isButtonDisabled);

                return (
                  <tr
                    className="bg-white border-b cursor-pointer"
                    key={patientData?._id}
                  >
                    <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {i + 1}
                    </td>
                    <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {patientData?.name}
                    </td>
                    <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {p.healthPlan?.name}
                    </td>
                    <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {truncate(healthPlanDate.startDate)} /{" "}
                      {truncate(healthPlanDate.endDate)}
                    </td>
                    <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {truncate(p?.createdOn)}
                    </td>
                    <td className="p-3 text-base text-emerald-700 font-bold whitespace-nowrap text-center">
                      {p.healthPlan?.price -
                        calculateTotalPayments(
                          p?.healthId,
                          patientData?.health_amount_paid
                        )}

                      {/* {total} */}
                    </td>

                    {total === 0 ? (
                      <>
                        <td
                          className="p-3 text-base text-emerald-700 font-bold 
                           text-center whitespace-nowrap"
                        >
                          Paid
                        </td>
                        {/* <td className="p-3 text-base text-gray-700 whitespace-nowrap">
                            <button
                              type="button"
                              className="card__Btn card__Bg--gray card__Btn--Bg-Teal "
                              disabled
                            >
                              Paid
                            </button>
                          </td> */}
                      </>
                    ) : (
                      <>
                        <td className="p-3 text-base text-rose-700 font-bold whitespace-nowrap text-center">
                          Pending
                        </td>
                        <td className="p-3 text-base text-gray-700 whitespace-nowrap text-left">
                          <button
                            type="button"
                            className={`card__Btn ${
                              isButtonDisabled
                                ? "card__Bg--Grey"
                                : "card__Bg--Teal card__Btn--Bg-Teal"
                            }`}
                            disabled={isButtonDisabled}
                            // onClick={() => setIndex(i)}
                            onClick={() => handlePayNowClick(p)}
                          >
                            Pay now
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="my-10">
        <h2 className="w-full p-3 text-xl font-semibold tracking-wide text-center">
          Payment Status
        </h2>
        <table className="w-full mx-auto">
          <thead className="bg-gray-400 border-b-2">
            <tr className="bg-gray-50  border-gray-200 border-b cursor-pointer">
              <th className=" w-10 p-3 text-lg font-semibold tracking-wide text-center">
                Sl No.
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Patient Name
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Health Plan
              </th>

              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Duration
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Enrolled Date
              </th>
              <th className="w-10 p-3 text-lg font-semibold tracking-wide text-center">
                Payment Date
              </th>
              <th className="w-10 p-3 text-lg font-semibold tracking-wide text-center">
                Amount Paid
              </th>
              <th className="w-10 p-3 text-lg font-semibold tracking-wide text-center">
                Next Payment Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {patientData?.health_amount_paid?.length > 0 ? (
              patientData?.health_amount_paid?.map((p, i) => {
                const duration = patientData?.health_plan?.find(
                  (hp) => hp?.healthId === p?.healthId
                )?.healthPlan?.duration;

                const nextdate = new Date(p?.createdOn);

                nextdate.setMonth(nextdate.getMonth() + duration);

                return (
                  <tr className="bg-white border-b cursor-pointer" key={p._id}>
                    <td className=" w-2 p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {i + 1}
                    </td>
                    <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {patientData?.name}
                    </td>

                    <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {
                        patientData?.health_plan?.find(
                          (hp) => hp?.healthId === p?.healthId
                        )?.healthPlan?.name
                      }
                    </td>

                    <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {truncate(p?.createdOn)} / {truncate(nextdate)}
                    </td>

                    <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {/* enroll  */}
                      {truncate(
                        patientData?.health_plan?.find(
                          (hp) => hp?.healthId === p?.healthId
                        )?.createdOn
                      )}
                    </td>
                    <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                      {truncate(p?.createdOn, 11)}
                    </td>
                    <td className="p-3 text-base text-emerald-700 font-bold whitespace-nowrap text-center">
                      {p.paids}
                    </td>
                    {
                      <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                        {/* {`
                   ${nextPaymentDate[2]}-${nextPaymentDate[1]}-${nextPaymentDate[0]} 
                      `} */}
                        {moment().add(1, "M").format("DD-MM-YYYY")}
                      </td>
                    }
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                  No Previous Payement Done
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal ? (
        <div className="py-4">
        <div
          className="fixed flex justify-center  items-center h-screen top-0 left-0 right-0 z-50 block w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            data-modal-backdrop="static"
            tabIndex="-1"
            aria-hidden="true"
        >
          {patientsData.length &&
            singlePatient.map((p) => {
              {
                /* const dateStart = p.health_plan_date.startDate
                .split("T")[0]
                .split("-");
              const dateEnd = p.health_plan_date.endDate
                .split("T")[0]
                .split("-"); */
              }
              return (
                <div
                  className="relative w-full max-w-2xl max-h-full"
                  key={p._id}
                >
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h5
                        className="text-xl font-semibold text-gray-900 dark:text-white"
                      >
                        Patient Health Plan Payment
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
                      <div className="p-4">
                        <div className="form__Grid--Cols-6">
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="planName"
                              className="form__Label-Heading"
                            >
                              Health Plan Name
                            </label>
                            <p className="form__Heading">
                              {clickedRowData?.healthPlan?.name}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="planName"
                              className="form__Label-Heading"
                            >
                              Health Plan Duration
                            </label>
                            <p className="form__Heading">
                              {p.health_plan.duration} Months
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="planName"
                              className="form__Label-Heading"
                            >
                              Health Plan Duration (Start Date)
                            </label>
                            <p className="form__Heading">
                              {/* {`${dateStart[2]}-${dateStart[1]}-${dateStart[0]}`} */}
                              <>
                                {truncate(
                                  patientData?.health_plan_date.find(
                                    (h) =>
                                      h?.healthName ===
                                      clickedRowData?.healthPlan?.name
                                  )?.startDate,
                                  11
                                )}
                              </>
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="planName"
                              className="form__Label-Heading"
                            >
                              Health Plan Duration (End Date)
                            </label>
                            <p className="form__Heading">
                              {/* {`${dateEnd[2]}-${dateEnd[1]}-${dateEnd[0]}`} */}
                              {/* {patientData?.health_plan_date
                                .find(
                                  (h) =>
                                    h?.healthName ===
                                    clickedRowData?.healthPlan?.name
                                )
                                .map((hp) => (
                                  <>{truncate(hp.endDate, 11)}</>
                                ))} */}

                              {/* {patientData?.health_plan_date.find(
                                (h) =>
                                  h?.healthName ===
                                  clickedRowData?.healthPlan?.name
                              )?.endDate && ( */}
                              <>
                                {truncate(
                                  patientData?.health_plan_date.find(
                                    (h) =>
                                      h?.healthName ===
                                      clickedRowData?.healthPlan?.name
                                  )?.endDate,
                                  11
                                )}
                              </>
                              {/* )} */}
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="planName"
                              className="form__Label-Heading"
                            >
                              Past Amount Paid
                            </label>
                            <p className="form__Heading">
                              {
                                p.health_amount_paid[
                                  p.health_amount_paid?.length - 1
                                ].paids
                              }
                            </p>
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="planName"
                              className="form__Label-Heading"
                            >
                              Amount Paid Today
                            </label>
                            <input
                              id="medicineDurationDays"
                              name="medicineDurationDays"
                              type="number"
                              autoComplete="medicineDurationDays"
                              required
                              className="form__Input"
                              placeholder="write amount"
                              value={currentAmount}
                              onChange={(e) => setCurrentAmount(e.target.value)}
                            />
                          </div>
                          <div className="form__Cols--Span-6">
                            <label
                              htmlFor="planName"
                              className="form__Label-Heading"
                            >
                              Payment Type
                            </label>
                            <select
                              id="payment-mode"
                              name="payment-mode"
                              autoComplete="payment-mode-name"
                              className="form__Select"
                              value={paymentType}
                              onChange={(e) => setPaymentType(e.target.value)}
                            >
                              <option value="">Select Payment Mode</option>
                              <option value="Cash">Cash</option>
                              <option value="Card">Card</option>
                              <option value="UPI">UPI</option>
                              <option value="Netbanking">Netbanking</option>
                            </select>
                          </div>
                        </div>
                        <div className="py-6 form__Grid--Rows-none">
                          <div className="form__Cols--Span-6">
                            <button
                              type="button"
                              className="card__Btn card__Bg--Teal card__Btn--Bg-Teal"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => handlePayAmount()}
                            >
                              Pay Amount Now
                            </button>
                          </div>
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
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      ) : (
        <h1></h1>
      )}
    </>
  );
};

export default PatientAllEnrolments;
