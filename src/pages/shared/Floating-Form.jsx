import React, { useEffect, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getForms } from "../../action/PatientAction";
import { updateForm } from "../../action/DoctorAction";
import Swal from "sweetalert2";
import { UPDATE_FORM_RESET } from "../../constant.js/PatientConstant";
import { useNavigate } from "react-router-dom";

const FloatingForm = ({ id }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const form = useSelector((state) => state.formSubmit);
  const { success } = form;
  const [showModal, setShowModal] = useState(false); // Added state for modal visibility

  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;

  useEffect(() => {
    const user = "doctor";
    dispatch(getForms(user));
  }, [dispatch, success]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: "success",
        text: "form type set successfully",
      });
      setShowModal(false); // Hide modal after success
    }
  }, [success]);

  const formData = useSelector((state) => state.patientFormList);

  const { loading, forms } = formData;

  const save = () => {
    dispatch(updateForm(patId, selectedForm, selectedFrequency));
  };

  // useEffect(() => {
  //   if (success) {
  //     Swal.fire({
  //       icon: "success",
  //       text: "Appointment created successfully",
  //     });
  //     dispatch({ type: UPDATE_FORM_RESET });
  //     navigate(`/userrole/:roleid/dashboard/patient/forms/${id}`);
  //   }
  // }, [success]);

  const viewFormModalHandler = () => {
    setShowModal(true);
  }

  return (
    <>
      <div className="fixed right-5 bottom-6">
        <button
          className="dropdown-toggle px-6 py-5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase  rounded-full shadow-md transition duration-150 ease-in-out flex items-center whitespace-nowrap focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg active:text-white"
          type="button"
          onClick={() => setShowModal(true)} // Show the modal when the button is clicked
        >
          <FiPaperclip className="fab__Btn-Icon" />
        </button>
      </div>
      {showModal ? (
        <div
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed flex justify-center  items-center h-screen top-0 left-0 right-0 z-50 block w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h5
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                Select Form with Frequency
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
            {/* .filter((form) => form.actions[0]?.patientId !== id) */}
            <div className="p-6 text-xl space-y-6">
              <div className="form__Grid--Rows-none">
                <div className="form__Cols--Span-6">
                  <label htmlFor="formNames" className="form__Label-Heading">
                    Select Forms
                  </label>
                  <select
                    id="formNames"
                    name="formNames"
                    autoComplete="formNames"
                    className="form__Select"
                    onChange={(e) => setSelectedForm(e.target.value)}
                  >
                    <option>Select Forms</option>
                    {loading ? (
                      <option>Loading forms...</option>
                    ) : (
                      forms
                        ?.filter(
                          (form) =>
                            !form.actions.some(
                              (action) => action.patientId === patId
                            )
                        )
                        .map((form) => (
                          <option key={form._id} value={form._id}>
                            {form.form_title}
                          </option>
                        ))
                    )}
                    {/* .filter((form) => form.actions?.patientId !== id)*/}
                  </select>
                </div>
                <div className="form__Cols--Span-6">
                  <label
                    htmlFor="formFrequency"
                    className="form__Label-Heading"
                  >
                    Select Form Frequency
                  </label>
                  <select
                    id="formFrequency"
                    name="formFrequency"
                    autoComplete="formFrequency"
                    className="form__Select"
                    onChange={(e) => setSelectedFrequency(e.target.value)}
                  >
                    <option>Select Form Frequency</option>
                    <option value="daily">daily</option>
                    <option value="weekly">weekly</option>
                    <option value="biweekly">bi-Weekly</option>
                    <option value="monthly">monthly</option>
                    <option value="ontime">one Time</option>
                  </select>
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
                onClick={save}
                type="button"
                className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
              >
                Create Your Form Frequency
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

export default FloatingForm;
