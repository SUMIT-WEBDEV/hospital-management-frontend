import React, { useState } from "react";
import { useEffect } from "react";
import { FiEye, FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createObservations } from "../../../action/PatientAction";
import { CREATE_OBSERVATION_RESET } from "../../../constant.js/PatientConstant";

import PatientObservedTable from "./PatientObservedTable";

const PatientObservation = ({ id }) => {
  const observationCreate = useSelector((state) => state.observationCreate);
  const { success } = observationCreate;
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const submitHandler = () => {
    dispatch(createObservations(id, desc));
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
            data-bs-toggle="modal"
            data-bs-target="#createObservations"
          >
            Create Observations
          </button>
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="createObservations"
            tabIndex="-1"
            aria-labelledby="createObservationsLabel"
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
                      <label
                        htmlFor="observation-info"
                        className="form__Label-Heading"
                      >
                        Enter Patients Observation
                      </label>
                      <textarea
                        onChange={(e) => setDesc(e.target.value)}
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
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button
                    type="button"
                    className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitHandler}
                    data-bs-dismiss="modal"
                    className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  >
                    Create &amp; Save Observation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        <table className="min-w-full table-auto">
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
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center">
                Dr. Rajiv Singla
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center">
                Krithi Shetty
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base text-justify capitalize font-medium text-gray-900">
                So I started to walk into the water. I won't lie to you boys, I
                was terrified.
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                11-10-2022
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                2
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center">
                Dr. Rajiv Singla
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center">
                Krithi Shetty
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base text-justify capitalize font-medium text-gray-900">
                So I started to walk into the water. I won't lie to you boys, I
                was terrified.
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                11-10-2022
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                3
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center">
                Dr. Rajiv Singla
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center">
                Krithi Shetty
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base text-justify capitalize font-medium text-gray-900">
                So I started to walk into the water. I won't lie to you boys, I
                was terrified.
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                11-10-2022
              </td>
            </tr>
          </tbody>
        </table>
        <PatientObservedTable success={success} />
      </div>
    </>
  );
};

export default PatientObservation;
