import React, { useState } from "react";
import { useEffect } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  activateDtChart,
  activateForm,
  deactivateDtChart,
  deactivateForm,
  getAllDietChart,
} from "../../../action/AdminAction";
import { getForms } from "../../../action/PatientAction";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import {
  ACTIVATE_DTCHART_RESET,
  ACTIVATE_FORM_RESET,
  DEACTIVATE_DTCHART_RESET,
  DEACTIVATE_FORM_RESET,
} from "../../../constant.js/AdminConstant";
import axios from "axios";
import { Url } from "../../../constant.js/PatientConstant";
import { truncate } from "../../../constant.js/Constant";

// const {
//   adminSignin: { adminDocInfo }
// }

var someDate = new Date();
var numberOfDaysToAdd = 3;
var date = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
var defaultValue = new Date(date).toISOString().split("T")[0];
console.log(defaultValue);
// localStorage.getItem(keyname)
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWRtaW4iLCJ0eXBlIjoiYWRtaW4ifSwiaWF0IjoxNjg4MDQyNTM5LCJleHAiOjE3MTk2MDAxMzl9.FaZW5UdporOMUTac2_50oA6EIHq2yRTCaqPwVVM9Xhk";

const CustomFormTable = () => {
  const adminToken = useSelector(
    (state) => state.adminSignin.adminDocInfo.token
  );

  console.log("adminToken-->", adminToken);

  const dispatch = useDispatch();
  const getFomrsList = useSelector((state) => state.patientFormList);
  const { loading, error, forms } = getFomrsList;
  const [filterDatas, setFilterDatas] = useState([]);

  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [reload, setReload] = useState(false);

  const activateFormVariables = useSelector((state) => state.activateform);
  const {
    loading: loadingFormAc,
    error: errorFormAc,
    success: successFormAc,
  } = activateFormVariables;
  const deactivateFormVariables = useSelector((state) => state.deactivateform);
  const {
    loading: loadingFormDe,
    error: errorFormDe,
    success: successFormDe,
  } = deactivateFormVariables;

  const fetchUpdateFormApi = async (updateFilterDatasNew) => {
    console.info("id--->", updateFilterDatasNew._id);

    const res = await axios.put(
      `${Url}/forms/update-form/${updateFilterDatasNew._id}`,

      updateFilterDatasNew,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );
    console.log("res--->", res);
  };

  const handleUpdate = () => {
    setUpdate(!update);
    const updateFilterDatasNew = {
      form_title: filterDatas[0].form_title,
      answered: filterDatas[0].answered,
      questions: filterDatas[0].questions,
      status: filterDatas[0].status,
      form_type: "daily",
      actions: filterDatas[0].actions,
      _id: filterDatas[0]._id,
    };
    console.info("updateFilterDatas------>", updateFilterDatasNew);

    fetchUpdateFormApi(updateFilterDatasNew);
    setReload(!reload);
    dispatch(getForms("admin"));

    // if (update === true) {
    //   Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "Updated Successfully",
    //     showConfirmButton: false,
    //     timer: 2000,
    //   });
    // }
  };

  console.info("filterDatas-->", filterDatas);
  useEffect(() => {
    dispatch(getForms("admin"));

    if (successFormAc) {
      dispatch({ type: ACTIVATE_FORM_RESET });
      Swal.fire({
        icon: "success",
        text: "activated successfully",
      });
    }
    if (successFormDe) {
      dispatch({ type: DEACTIVATE_FORM_RESET });
      Swal.fire({
        icon: "success",
        text: "deactivated successfully",
      });
    }
  }, [successFormAc, successFormDe, reload]);

  const activateForms = (state, id) => {
    if (state === "Active") {
      Swal.fire({
        title: "Do you want to deactivate forms?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(deactivateForm(id));
          // Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else if (state === "De-Active") {
      Swal.fire({
        title: "Do you want to activate forms?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(activateForm(id));
          // Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  const filterData = (id) => {
    console.log(id);
    const filterdData = forms.filter((e) => e._id === id);
    console.log(typeof filterdData);
    // console.log(filterdData[0])
    setFilterDatas(filterdData);
    setShow(true);
  };

  console.log("forms--->", forms);

  return (
    <>
      <div className="my-10">
        <table className="table__Container">
          <thead className="table__Head">
            <tr>
              <th className="table__Head--Text">Sl No.</th>
              <th className="table__Head--Text">Form Name</th>
              <th className="table__Head--Text">Created By</th>
              <th className="table__Head--Text">Created Date</th>
              <th className="table__Head--Text">Access</th>
              <th className="table__Head--Text">Actions</th>
            </tr>
          </thead>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            forms.map((frm, index) => (
              <tbody key={frm._id}>
                <tr className="table__Body--Row">
                  <td className="table__Body--Row_Data">{index + 1}</td>
                  <td className="table__Body--Row_Data">{frm.form_title}</td>
                  <td className="table__Body--Row_Data">
                    {frm.doctorId ? frm.doctorId.name : ""}
                  </td>
                  <td className="table__Body--Row_Data">
                    {truncate(frm?.createdOn, 11)}
                  </td>
                  <td className="table__Body--Row_Data">
                    <select
                      id="status"
                      name="status"
                      autoComplete="status-name"
                      className="form__Select"
                      onChange={() => activateForms(frm.status, frm._id)}
                    >
                      <option value={frm.status}>{frm.status}</option>
                      {frm.status === "Active" ? (
                        <option>De-Active</option>
                      ) : frm.status === "De-Active" ? (
                        <option>Active</option>
                      ) : (
                        ""
                      )}
                    </select>
                  </td>
                  <td className="table__Body--Row_Data ">
                    <FiEye
                      onClick={() => filterData(frm._id)}
                      className="table__Body--Status_Icons "
                      data-bs-toggle="modal"
                      data-bs-target="#modalForms"
                    />
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </table>
      </div>
      {/* view modal box */}
      <div
        className="modal fade  fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalForms"
        tabIndex="-1"
        aria-labelledby="modalFormsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered w-auto pointer-events-none relative">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="tab__Modal--Title" id="modalFormsLabel">
                Forms Created by Doctor
              </h5>
              <button
                type="button"
                className="tab__Modal--Btn_Close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* {!loadingLatest && !errorLatest && prescLatest ? (  */}
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox>{error}</MessageBox>
            ) : (
              <>
                <div className="modal-body relative p-4">
                  <div className="form__Grid--Cols-6">
                    {show && (
                      <>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="prescribedBy"
                            className="form__Label-Heading"
                          >
                            Doctor Name
                          </label>
                          {/* {update ? (
                            <input
                              className="form__Input"
                              type="text"
                              value={filterDatas[0].doctorId.name}
                              onChange={(event) =>
                                setFilterDatas([
                                  {
                                    ...filterDatas[0],
                                    doctorId: {
                                      ...filterDatas[0].doctorId,
                                      name: event.target.value,
                                    },
                                  },
                                ])
                              }
                            ></input>
                          ) : (
                            <p className="  form__Heading">
                              {filterDatas[0].doctorId
                                ? filterDatas[0].doctorId.name
                                : ""}
                            </p>
                          )} */}
                          <p className="  form__Heading">
                            {filterDatas[0].doctorId
                              ? filterDatas[0].doctorId.name
                              : ""}
                          </p>
                        </div>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="prescribedDate"
                            className="form__Label-Heading"
                          >
                            Form Created Date
                          </label>
                          {/* {update ? (
                            <input
                              className="form__Input"
                              // value={"hi"}
                              defaultValue={defaultValue}
                              onChange={(e) => console.info(e.target.value)}
                              type="date"
                            />
                          ) : (
                            <p className="form__Heading">
                              {truncate(filterDatas[0].createdOn, 11)}
                            </p>
                          )} */}
                          <p className="form__Heading">
                            {truncate(filterDatas[0].createdOn, 11)}
                          </p>
                        </div>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="medicineType"
                            className="form__Label-Heading"
                          >
                            Form Title
                          </label>
                          {update ? (
                            <input
                              className="form__Input"
                              type="text"
                              value={filterDatas[0].form_title}
                              onChange={(event) =>
                                setFilterDatas([
                                  {
                                    ...filterDatas[0],
                                    form_title: event.target.value,
                                  },
                                ])
                              }
                            ></input>
                          ) : (
                            <p className="form__Heading">
                              {filterDatas[0].form_title}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  {filterDatas[0] &&
                    filterDatas[0].questions.length > 0 &&
                    filterDatas[0].questions.map((qs, index) => (
                      <div className="py-6 form__Grid--Cols-6" key={index}>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="medicineName"
                            className="form__Label-Heading"
                          >
                            Question Name
                          </label>
                          {update ? (
                            <input
                              className="form__Input"
                              type="text"
                              value={
                                filterDatas[0].questions[index].question_title
                              }
                              onChange={(event) =>
                                setFilterDatas([
                                  {
                                    ...filterDatas[0],
                                    questions: [
                                      ...filterDatas[0].questions,
                                    ].map((ques, i) => {
                                      if (index === i) {
                                        return {
                                          ...ques,
                                          question_title: event.target.value,
                                        };
                                      } else {
                                        return ques;
                                      }
                                    }),
                                  },
                                ])
                              }
                            ></input>
                          ) : (
                            <p className="form__Heading">{qs.question_title}</p>
                          )}
                        </div>
                        <div className="form__Cols--Span-6">
                          <label
                            htmlFor="medicineName"
                            className="form__Label-Heading"
                          >
                            Question Type
                          </label>
                          {/* {update ? ( */}
                          {false ? (
                            <select
                              id="type"
                              name="type"
                              autoComplete="question-type-name"
                              // className="form__Select"
                              className="form__Select"
                              value={filterDatas[0].questions[index].type}
                              onChange={(event) =>
                                setFilterDatas([
                                  {
                                    ...filterDatas[0],
                                    questions: [
                                      ...filterDatas[0].questions,
                                    ].map((ques, i) => {
                                      if (index === i) {
                                        return {
                                          ...ques,
                                          type: event.target.value,
                                        };
                                      } else {
                                        return ques;
                                      }
                                    }),
                                  },
                                ])
                              }
                            >
                              <option value="radio">Radio </option>
                              <option value="checkbox">Checkbox </option>
                              <option value="textArea">Text Area</option>
                            </select>
                          ) : (
                            <p className="form__Heading">{qs.type}</p>
                          )}
                        </div>

                        {/*  */}
                        {qs.type !== "textArea" ? (
                          <>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="medicineDuration"
                                className="form__Label-Heading"
                              >
                                Choice Name
                              </label>
                              {update ? (
                                <input
                                  className="form__Input"
                                  type="text"
                                  value={
                                    filterDatas[0].questions[index].choice1
                                  }
                                  onChange={(event) =>
                                    setFilterDatas([
                                      {
                                        ...filterDatas[0],
                                        questions: [
                                          ...filterDatas[0].questions,
                                        ].map((ques, i) => {
                                          if (index === i) {
                                            return {
                                              ...ques,
                                              choice1: event.target.value,
                                            };
                                          } else {
                                            return ques;
                                          }
                                        }),
                                      },
                                    ])
                                  }
                                />
                              ) : (
                                <p className="form__Heading">{qs.choice1}</p>
                              )}
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="medicineDuration"
                                className="form__Label-Heading"
                              >
                                Choice Name
                              </label>
                              {update ? (
                                <input
                                  className="form__Input"
                                  type="text"
                                  value={
                                    filterDatas[0].questions[index].choice2
                                  }
                                  onChange={(event) =>
                                    setFilterDatas([
                                      {
                                        ...filterDatas[0],
                                        questions: [
                                          ...filterDatas[0].questions,
                                        ].map((ques, i) => {
                                          if (index === i) {
                                            return {
                                              ...ques,
                                              choice2: event.target.value,
                                            };
                                          } else {
                                            return ques;
                                          }
                                        }),
                                      },
                                    ])
                                  }
                                ></input>
                              ) : (
                                <p className="form__Heading">{qs.choice2}</p>
                              )}
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="medicineDuration"
                                className="form__Label-Heading"
                              >
                                Choice Name
                              </label>
                              {update ? (
                                <input
                                  className="form__Input"
                                  type="text"
                                  value={
                                    filterDatas[0].questions[index].choice3
                                  }
                                  onChange={(event) =>
                                    setFilterDatas([
                                      {
                                        ...filterDatas[0],
                                        questions: [
                                          ...filterDatas[0].questions,
                                        ].map((ques, i) => {
                                          if (index === i) {
                                            return {
                                              ...ques,
                                              choice3: event.target.value,
                                            };
                                          } else {
                                            return ques;
                                          }
                                        }),
                                      },
                                    ])
                                  }
                                ></input>
                              ) : (
                                <p className="form__Heading">{qs.choice3}</p>
                              )}
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="medicineDuration"
                                className="form__Label-Heading"
                              >
                                Choice Name
                              </label>
                              {update ? (
                                <input
                                  className="form__Input"
                                  type="text"
                                  value={
                                    filterDatas[0].questions[index].choice4
                                  }
                                  onChange={(event) =>
                                    setFilterDatas([
                                      {
                                        ...filterDatas[0],
                                        questions: [
                                          ...filterDatas[0].questions,
                                        ].map((ques, i) => {
                                          if (index === i) {
                                            return {
                                              ...ques,
                                              choice4: event.target.value,
                                            };
                                          } else {
                                            return ques;
                                          }
                                        }),
                                      },
                                    ])
                                  }
                                ></input>
                              ) : (
                                <p className="form__Heading">{qs.choice4}</p>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* <div className="form__Cols--Span-12">
                              <label
                                htmlFor="medicineDuration"
                                className="form__Label-Heading"
                              >
                                Write Answer
                              </label>
                              {update ? (
                                <input
                                  className="form___Textarea w-full rounded-md shadow-sm mt-1 border-gray-300"
                                  type="text"
                                  value={filterDatas[0].questions[index].answer}
                                  onChange={(event) =>
                                    setFilterDatas([
                                      {
                                        ...filterDatas[0],
                                        questions: [
                                          ...filterDatas[0].questions,
                                        ].map((ques, i) => {
                                          if (index === i) {
                                            return {
                                              ...ques,
                                              answer: event.target.value,
                                            };
                                          } else {
                                            return ques;
                                          }
                                        }),
                                      },
                                    ])
                                  }
                                />
                              ) : (
                                <p className="form__Heading">{qs.choise1}</p>
                              )}
                            </div> */}
                          </>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}

            {/* ): */}
            {/* <MessageBox>No latest Prescription</MessageBox> */}
            {/* } */}

            <div className="modal-footer flex   flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                // data-bs-dismiss="modal"
                onClick={() => handleUpdate()}
              >
                Update
              </button>
              {/* <button
                type="button"
                className="px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700    focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                data-bs-dismiss="modal"
                onClick={() => setUpdate(false)}
              >
                Save
              </button> */}
              <button
                type="button"
                className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                data-bs-dismiss="modal"
                onClick={() => setUpdate(false)}
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

export default CustomFormTable;
