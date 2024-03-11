import React, { useState } from "react";

import { useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../../Components/MessageBox";
import LoadingBox from "../../../Components/LoadingBox";
import {
  getLatesPrescriptionByDoc,
  getPrescriptionsByDoc,
} from "../../../action/PatientAction";
import { truncate } from "../../../constant.js/Constant";

const DocPatientPrescriptions = () => {
  const [showLatModal, setShowLatModal] = useState(false);
  const [showOldModal, setShowOldModal] = useState(false);
  const dispatch = useDispatch();

  const presctList = useSelector((state) => state.presctList);
  const { loading, error, presc } = presctList;

  const latestPrescription = useSelector((state) => state.latestPrescription);
  const {
    loading: loadingLatest,
    error: errorLatest,
    prescLatest,
  } = latestPrescription;

  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;

  console.log("myPatientIdpresc", myPatientId);

  useEffect(() => {
    dispatch(getLatesPrescriptionByDoc(patId));
    dispatch(getPrescriptionsByDoc());
  }, [dispatch]);

  console.log("presc", presc);

  return (
    <>
      <div className="tab__Card--Container">
        <div className="tab__Card--Block">
          <h5 className="tab__Card--Title">
            Prescribed Medicines
            <span className="tab__Tag--New">Latest</span>
          </h5>
          <p className="tab__Card--Info">
            {/* Some quick example text to build on the card title and make up the
          bulk of the card's content. */}
          </p>
          <button
            type="button"
            className="tab__Btn tab__Btn--Hover tab__Btn--Focus tab__Btn-Active"
            onClick={() => setShowLatModal(true)}
          >
            View
          </button>
        </div>
        <div className="tab__Card--Block">
          <h5 className="tab__Card--Title">
            Prescribed Medicines
            <span className="tab__Tag--Old">Old</span>
          </h5>
          <p className="tab__Card--Info">
            {/* Some quick example text to build on the card title and make up the
          bulk of the card's content. */}
          </p>
          <button
            type="button"
            className="tab__Btn tab__Btn--Hover tab__Btn--Focus tab__Btn-Active"
            onClick={() => setShowOldModal(true)}
          >
            View
          </button>
        </div>
      </div>
      {showLatModal ? (
        <div
            className="fixed flex justify-center  items-center h-screen top-0 left-0 right-0 z-50 block w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            data-modal-backdrop="static"
            tabIndex="-1"
            aria-hidden="true"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                Prescription
              </h5>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShowLatModal(false)}
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
            {!loadingLatest && !errorLatest && prescLatest ? (
              <div className="p-6 text-xl space-y-6">
                <div className="form__Grid--Cols-6">
                  <div className="form__Cols--Span-6">
                    <label
                      htmlFor="prescribedBy"
                      className="form__Label-Heading"
                    >
                      Doctor Name
                    </label>
                    <p className="form__Heading">
                      {prescLatest.doctorId ? prescLatest.doctorId.name : ""}
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
                      {truncate(prescLatest.createdOn, 11)}
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
                        <p className="form__Heading">{medicine.medType}</p>
                      </div>
                      <div className="form__Cols--Span-6">
                        <label
                          htmlFor={`medicineName${index}`}
                          className="form__Label-Heading"
                        >
                          Medicine Name
                        </label>
                        <p className="form__Heading">{medicine.medName}</p>
                      </div>
                      <div className="form__Cols--Span-6">
                        <label
                          htmlFor={`medicineMorningDose${index}`}
                          className="form__Label-Heading"
                        >
                          Medicine Morning Dose
                        </label>
                        <p className="form__Heading">{medicine.mornDose}</p>
                      </div>
                      <div className="form__Cols--Span-6">
                        <label
                          htmlFor={`medicineAfternoonDose${index}`}
                          className="form__Label-Heading"
                        >
                          Medicine Afternoon Dose
                        </label>
                        <p className="form__Heading">{medicine.aftDose}</p>
                      </div>
                      <div className="form__Cols--Span-6">
                        <label
                          htmlFor={`medicineEveningDose${index}`}
                          className="form__Label-Heading"
                        >
                          Medicine Evening Dose
                        </label>
                        <p className="form__Heading">{medicine.eveDose}</p>
                      </div>
                      <div className="form__Cols--Span-6">
                        <label
                          htmlFor={`medicineFrequency${index}`}
                          className="form__Label-Heading"
                        >
                          Medicine Frequency
                        </label>
                        <p className="form__Heading">{medicine.frequency}</p>
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
                        <p className="form__Heading">{medicine.specinst}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            ) : (
              <MessageBox>No latest Prescription</MessageBox>
            )}

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                onClick={() => setShowLatModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <h1></h1>
      )}
      {showOldModal ? (
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
                Prescription (Old Date Wise / Prescribed By)
              </h5>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShowOldModal(false)}
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
              <div className="p-2">
                {loading ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox>{error}</MessageBox>
                ) : presc.length > 0 ? (
                  presc.map((pres) => (
                    <div
                      key={pres._id}
                      className="relative w-full overflow-hidden"
                    >
                      <input
                        type="checkbox"
                        className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                      />
                      <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                        <h1 className="text-lg font-semibold text-gray-600">
                          {pres.doctorId ? pres.doctorId.name : ""} /{" "}
                          {truncate(pres.createdOn, 11)}
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
                                Doctor Name
                              </label>
                              <p className="form__Heading">
                                {pres.doctorId ? pres.doctorId.name : ""}{" "}
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
                                {truncate(pres.createdOn, 11)}
                              </p>
                            </div>
                            {prescLatest?.medicines?.map((medicine, index) => (
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
                  ))
                ) : (
                  <MessageBox>No prescriptions </MessageBox>
                )}
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                onClick={() => setShowOldModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <h1></h1>
      )}
    </>
  );
};

export default DocPatientPrescriptions;
