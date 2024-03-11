import React, { useState } from "react";
import { useEffect } from "react";
import { FiEye, FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  createObservations,
  listObservation,
} from "../../../action/PatientAction";
import { CREATE_OBSERVATION_RESET } from "../../../constant.js/PatientConstant";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { truncate } from "../../../constant.js/Constant";

const DocPatientObservations = () => {
  const observationCreate = useSelector((state) => state.observationCreate);
  const { success } = observationCreate;
  const [desc, setDesc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;

  const data = localStorage.getItem("doctorInfo");
  const parsedData = JSON.parse(data);
  const DocName = parsedData.user.name;
  const doctorId = parsedData.user._id;

  const submitHandler = () => {
    dispatch(createObservations(patId, desc, DocName, doctorId)).then(() => {
      if (!observationCreate.error) {
        dispatch(listObservation(patId));
        setDesc("");
        Swal.fire({
          icon: "success",
          text: "Observation created successfully",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Failed to create observation",
        });
      }
    });
  };

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: "success",
        text: "Observation created successfully",
      });
      setDesc("");
    }
  }, [success]);

  useEffect(() => {
    dispatch(listObservation(patId));
  }, [dispatch]);

  const observationn = useSelector((state) => state.observationList);

  const { loading, observation } = observationn;
  const { patient_name, observations } = observation || {};

  return (
    <>
      <div className="flex justify-start my-5">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
            Create Observations
          </h5>
          <p className="text-gray-700 text-base mb-4"></p>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => setShowModal(true)}
          >
            Create Observations
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
                    Create Patient Observation
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
                      <label
                        htmlFor="observation-info"
                        className="form__Label-Heading"
                      >
                        Enter Patients Observation
                      </label>
                      <textarea
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                        value={desc}
                        rows={3}
                        name="observation-info"
                        id="observation-info"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Patients Observation"
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
                    type="button"
                    onClick={submitHandler}
                    className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  >
                    Create &amp; Save Observation
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

      <div className="mt-10 mb-32 overflow-x-scroll ">
        <table className=" table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-lg font-bold text-gray-900 px-2 py-4">
                Sl No.
              </th>
              <th className="text-lg font-bold text-gray-900 px-2 py-4">
                Observed Name
              </th>
              <th className="text-lg font-bold text-gray-900 px-2 py-4">
                Patient Name
              </th>
              <th className="text-lg font-bold text-gray-900 px-2 py-4">
                Observed Info
              </th>
              <th className="text-lg font-bold text-gray-900 px-2 py-4">
                Observed Date
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : observations?.length > 0 ? (
              observations.map((ap, i) => (
                <tr className="bg-white border-b" key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center align-top">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center align-top">
                    {ap?.docName}
                    {/* Doc Name */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-start align-top">
                    {/* Krithi Shetty */}
                    {patient_name}
                  </td>
                  <td className="px-6  py-4  text-base text-justify capitalize font-medium text-gray-900">
                    {ap.desc}
                  </td>
                  <td className="px-6  py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center align-top pt-4 ">
                    {truncate(ap?.createdOn, 11)}
                  </td>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocPatientObservations;
