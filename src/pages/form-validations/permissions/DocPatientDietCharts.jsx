import MessageBox from "../../../Components/MessageBox";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import {
  getAllDietChart,
  getDietChartOfPatient,
} from "../../../action/AdminAction";
import LoadingBox from "../../../Components/LoadingBox";
import { getLatesDietChartByDoctor } from "../../../action/DoctorAction";
import { UPLOAD_DIET_CHART_RESET } from "../../../constant.js/DoctorConstant";
import { truncate } from "../../../constant.js/Constant";

const DocPatientDietCharts = () => {
  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;

  const dispatch = useDispatch();

  //patient
  const patientdeitChartList = useSelector((state) => state.patientDiet);
  const { loading, error, patientdietchart } = patientdeitChartList;
  const [reload, setReload] = useState(false);
  const [showLatModal, setShowLatModal] = useState(false);
  const [showOldModal, setShowOldModal] = useState(false);

  const deitChartLatest = patientdietchart ? patientdietchart[0] : [];
  console.log("patientdietchart ======>", deitChartLatest);

  // const deitChartList = useSelector((state) => state.deitChartList);
  // const { loading: loadingDiet, errorDiet, dietchart } = deitChartList;

  // const latestDietChart = useSelector((state) => state.latestDietChart);
  // const { error, deitChartLatest } = latestDietChart;

  useEffect(() => {
    const user = "Doctor";
    dispatch(getDietChartOfPatient(user, patId));
    // if (success) {
    //   dispatch({ type: UPLOAD_DIET_CHART_RESET });
    // }
  }, [dispatch, reload]);

  // useEffect(() => {
  //   const user = "Doctor";
  //   dispatch(getDietChartOfPatient(user, patId));
  // }, [reload]);

  const componentRef = useRef();
  const componentRef2 = useRef();

  const viewLatestChartHandler = () => {
    setReload(!reload)
    setShowLatModal(true)
  };

  return (
    <>
      <div className="tab__Card--Container tab__Card--Gap-1">
        <div className="tab__Card--Block">
          <h5 className="tab__Card--Title">
            Prescribed Diet Chart
            <span className="tab__Tag--New">Latest</span>
          </h5>
          <p className="tab__Card--Info"></p>
          <button
            type="button"
            className="tab__Btn tab__Btn--Hover tab__Btn--Focus tab__Btn-Active"
            onClick={() => viewLatestChartHandler()}
          >
            View
          </button>
        </div>
        <div className="tab__Card--Block">
          <h5 className="tab__Card--Title">
            Prescribed Diet Chart
            <span className="tab__Tag--Old">Old</span>
          </h5>
          <p className="tab__Card--Info"></p>
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
              <h5
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                DietCharts
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
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : deitChartLatest ? (
              <>
                <div className="p-6 text-xl space-y-6" ref={componentRef}>
                  <div className="form__Grid--Cols-6">
                    <div className="form__Cols--Span-6">
                      <label
                        htmlFor="prescribedBy"
                        className="form__Label-Heading"
                      >
                        Doctor Name
                      </label>
                      <p className="form__Heading">
                        {deitChartLatest?.doctorId?.name}
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
                        {truncate(deitChartLatest?.assignedOn, 11)}
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
                        {deitChartLatest?.dietChartId?.calorie_lower}
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
                        {deitChartLatest?.dietChartId?.calorie_upper}
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
                        {deitChartLatest?.dietChartId?.ch_lower}
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
                        {deitChartLatest?.dietChartId?.ch_upper}
                      </p>
                    </div>
                    <div className="form__Cols--Span-6">
                      <label htmlFor="proties" className="form__Label-Heading">
                        Protiens Range
                      </label>
                      <p className="form__Heading">
                        {deitChartLatest?.dietChartId?.protiens}
                      </p>
                    </div>
                    <div className="form__Cols--Span-6">
                      <label htmlFor="fats" className="form__Label-Heading">
                        Fats Range
                      </label>
                      <p className="form__Heading">
                        {deitChartLatest?.dietChartId?.fats}
                      </p>
                    </div>
                    <div className="form__Cols--Span-6">
                      <label htmlFor="foodType" className="form__Label-Heading">
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
                        {deitChartLatest?.dietChartId?.cuisine_type}
                      </p>
                    </div>
                  </div>
                  <div className="form__Grid--Rows-none">
                    <div className="form__Cols--Span-6">
                      <label
                        htmlFor="foodCusine"
                        className="form__Label-Heading"
                      >
                        Download Diet Charts
                      </label>
                      <a
                        href={deitChartLatest?.dietChartId?.file}
                        type="button"
                        className="px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                        style={{ marginBottom: "16px", width: "200px" }}
                      >
                        Download Diet Charts!
                      </a>
                    </div>
                  </div>
                </div>
                {console.log("deitChartLatest ===> ", deitChartLatest)}

                {/* <ReactToPrint
                  trigger={() => (
                    <button
                      type="button"
                      className="px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      style={{ marginBottom: "16px", width: "200px" }}
                    >
                      Download Diet Charts!
                    </button>
                  )}
                  content={() => componentRef.current}
                /> */}
              </>
            ) : (
              <MessageBox>No latest Diet Chart</MessageBox>
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
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                DietChart (Old Date Wise / Prescribed By)
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
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox>{error}</MessageBox>
              ) : patientdietchart?.length > 0 ? (
                patientdietchart.map((dt) => (
                  <>
                    <div className="p-2" key={dt._id}>
                      <div className="relative w-full overflow-hidden">
                        <input
                          type="checkbox"
                          className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                        />
                        <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                          <h1 className="text-lg font-semibold text-gray-600">
                            {dt?.doctorId ? dt?.doctorId?.name : ""} /
                            {truncate(dt?.assignedOn, 11)}
                          </h1>
                        </div>

                        <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                          <FiChevronDown className="w-6 h-6" />
                        </div>

                        <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                          <div className="p-4" ref={componentRef2}>
                            <div className="form__Grid--Cols-6">
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="prescribedBy"
                                  className="form__Label-Heading"
                                >
                                  Doctor Name
                                </label>
                                <p className="form__Heading">
                                  {dt?.doctorId ? dt?.doctorId?.name : ""}
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
                                  {truncate(dt.assignedOn, 11)}
                                </p>
                              </div>
                              <div className="form__Cols--Span-6">
                                <label
                                  htmlFor="lowerCalories"
                                  className="form__Label-Heading"
                                >
                                  {/* {dt.calorie_lower} */}
                                  Low Clories Range
                                </label>
                                <p className="form__Heading">
                                  {dt?.dietChartId?.calorie_lower}
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
                                  {dt?.dietChartId?.calorie_upper}
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
                                  {dt?.dietChartId?.ch_lower}
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
                                  {dt?.dietChartId?.ch_upper}
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
                                  {dt?.dietChartId?.protiens}
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
                                  {dt?.dietChartId?.fats}
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
                                  {dt?.dietChartId?.cuisine_type}
                                </p>
                              </div>
                            </div>
                            <div className="form__Grid--Rows-none">
                              <div className="form__Cols--Span-6"></div>
                            </div>

                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="fats"
                                className="form__Label-Heading"
                              >
                                Download Diet Charts
                              </label>
                              <a
                                href={dt?.dietChartId?.file}
                                type="button"
                                className="px-5 py-3 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                style={{ marginBottom: "16px", width: "200px" }}
                              >
                                Download Diet Charts!
                              </a>
                            </div>
                          </div>

                          {/* <ReactToPrint
                            trigger={() => (
                              <button
                                type="button"
                                className="px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                style={{ marginBottom: "16px", width: "200px" }}
                              >
                                Download Diet Charts!
                            </button>
                            )}
                            content={() => componentRef2.current}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <MessageBox>No diet chart</MessageBox>
              )}
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

export default DocPatientDietCharts;
