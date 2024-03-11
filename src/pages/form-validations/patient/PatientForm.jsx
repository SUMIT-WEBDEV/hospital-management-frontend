import React from "react";
import { useNavigate } from "react-router-dom";
import PatientNav from "../../../user/shared/PatientNav";

const PatientForm = () => {
  let navigate = useNavigate();
  const nextStep = () => {
    navigate("/userrole/:roleid/dashboard/patient/data/");
  };
  return (
    <>
      <div className="dashboard__Container">
        <PatientNav />
        <main>
          <div className="dashboard__Main-Content">
            {/* Replace with your content */}
            <div className="dashboard__Main-Inner-Content">
              <div>
                <div className="dashboard__Grid-Box">
                  <div className="dashboard__Grid-Cols">
                    <form action="#" method="POST">
                      <div className="form__Box-Shadow">
                        <div className="form__Box-Space">
                          <div className="form__Grid--Rows-none">
                            <div className="form__Cols--Span-6">
                              <h2 className="text-xl text-center font-bold pt-5">
                                Form Title
                              </h2>
                              <h5 className="text-lg font-medium pt-5">
                                Question Title
                              </h5>
                            </div>
                          </div>
                          <div className="form__Grid--Cols-6">
                            <div className="form__Cols--Span-6">
                              <div className="flex justify-start items-start">
                                <div className="flex h-5 items-center">
                                  <input
                                    id="choice-1"
                                    name="choice-1"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor="choice-1"
                                    className="font-medium text-gray-700"
                                  >
                                    Question Choice 1
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="form__Cols--Span-6">
                              <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                  <input
                                    id="choice-2"
                                    name="choice-2"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor="choice-2"
                                    className="font-medium text-gray-700"
                                  >
                                    Question Choice 1
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="form__Cols--Span-6">
                              <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                  <input
                                    id="choice-1"
                                    name="choice-1"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor="choice-1"
                                    className="font-medium text-gray-700"
                                  >
                                    Question Choice 1
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="form__Cols--Span-6">
                              <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                  <input
                                    id="choice-2"
                                    name="choice-2"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor="choice-2"
                                    className="font-medium text-gray-700"
                                  >
                                    Question Choice 1
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form__Grid--Rows-none">
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="food-type"
                                className="form__Label-Heading"
                              >
                                Question Choice - Paragraph
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="about"
                                  name="about"
                                  rows={3}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  placeholder="you@example.com"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form__Btn-Bg">
                          <button
                            onClick={nextStep}
                            type="submit"
                            className="form__Btn-Submit"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};

export default PatientForm;
