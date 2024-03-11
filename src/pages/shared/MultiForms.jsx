import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getForms,
  submitForm,
  getPatientForms,
  getAnsForm,
  getPatientProfile,
} from "../../action/PatientAction";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import { fromJSON } from "postcss";
import Swal from "sweetalert2";
import { SUBMIT_FORM_RESET } from "../../constant.js/PatientConstant";
import { truncate } from "../../constant.js/Constant";
import Pagination from "./Pagination";

export const Form1 = ({ type }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const getFomrsList = useSelector((state) => state.patientFormList);
  const { loading, error, forms } = getFomrsList;

  const { doctorInfo } = useSelector((state) => state.doctorSignin);

  // const myPatientId = useSelector((state) => state.patientId);
  // const { patId } = myPatientId;

  const patientProfileList = useSelector((state) => state.patientProfileList);
  const { profile } = patientProfileList;

  const formStatus = useSelector((state) => state.formSubmit);

  const [formData, setFormData] = useState([
    {
      formId: "",
      questionId: "",
      answer: [],
    },
  ]);

  console.log("proooooofile", profile?.patient?._id);

  const patId = profile?.patient?._id;

  const [selectedForm, setSelectedForm] = useState(null);
  const [formType, setFormType] = useState("allForms");
  const [newForm, setNewForm] = useState(forms);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(2);

  const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));

  const activeUser = localStorage.getItem("activeUser");

  // console.log("selectedForm ====>", selectedForm);

  const [buttonClicked, setButtonClicked] = useState(false);

  console.log("formsssssssss", forms);

  const handleType = (type) => {
    if (type === "allForms") {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
    setFormType(type);
    const filterForms = forms.filter(
      (frm) => frm.actions[0].form_type === type
    );
    setNewForm(filterForms);
  };

  useEffect(() => {
    dispatch(getPatientProfile());
  }, []);

  console.log("newForm =>", newForm);

  const nextStep = (e) => {
    e.preventDefault();

    const formObj = {
      formId: formData[0].formId,
      answers: formData.map((e) => ({
        questionId: e.questionId,
        answer: e.answer,
      })),
    };
    dispatch(submitForm(formObj));
  };

  useEffect(() => {
    if (formStatus.success) {
      Swal.fire({
        icon: "success",
        text: "Your answer saved successfully",
      });
    } else if (formStatus.error) {
      Swal.fire({
        icon: "info",
        text: formStatus.error,
      });

      //s
    }
    dispatch({ type: SUBMIT_FORM_RESET });

    setFormData([
      {
        formId: "",
        questionId: "",
        answer: [],
      },
    ]);
    dispatch(getAnsForm(activeUser, patientInfo?.user?._id));

    setOpenDropdownIndex(null);
  }, [formStatus.success, formStatus.error]);

  const [prevFormsCount, setPrevFormsCount] = useState(0);

  // console.log("forms length", forms?.length);
  // console.log("forms prevFormsCount", prevFormsCount);

  useEffect(() => {
    if (buttonClicked || !buttonClicked) {
      dispatch(getForms());
      setButtonClicked(false);
    }
  }, [buttonClicked, dispatch]);

  // useEffect(() => {
  //   dispatch(getForms());
  // }, [dispatch]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     dispatch(getForms());
  //   }, 600000);
  //   setPrevFormsCount(forms.length);

  //   return () => clearInterval(intervalId);
  // }, [dispatch]);

  useEffect(() => {
    if (doctorInfo?.token) {
      const user = "doctor";
      dispatch(getPatientForms(user, patId));
    }
  }, [dispatch, patId]);

  useEffect(() => {
    if (!loading && !error) {
      for (let i = 0; i < forms.length; i++) {
        for (let j = 0; j < forms[i].questions.length; j++) {
          const filterdForm = forms[i].questions[j].type !== "textArea";
          // console.log(filterdForm,'flll');
        }
      }
    }
  });

  useEffect(() => {}, [forms, newForm]);
  // const handleChange=(e,i,formId,qsId)=>{
  //   console.log(formId,qsId);
  //   let data = [...formData]
  // data[i][e.target.name]=e.target.value
  // setFormData(data)
  // console.log(formData);
  // }

  const handleChange = (e, i, formIds, questionIds) => {
    console.log("e.target.type", e.target.type);
    if (e.target.type === "radio") {
      const selectedAnswer = e.target.value;
      const updatedFormData = formData.map((form, index) => {
        if (index === i) {
          form.answer = selectedAnswer;
          form.formId = formIds;
          form.questionId = questionIds;
        }
        return form;
      });
      setFormData(updatedFormData);
      console.log(updatedFormData);
    } else if (e.target.type === "checkbox") {
      const newFormData = [...formData];
      const selectedAnswer = e.target.value;
      let foundQuestion = formData.find((e) => e.questionId === questionIds);
      let findQuestionIndex = formData.findIndex(
        (e) => e.questionId === questionIds
      );
      let formObj = {};
      let updatedFormData = [];
      if (foundQuestion) {
        if (e.target.checked && findQuestionIndex > -1) {
          formData[findQuestionIndex].answer = formData[
            findQuestionIndex
          ].answer.concat([selectedAnswer]);
          updatedFormData = [...formData];
        } else {
          formData[findQuestionIndex].answer = formData[
            findQuestionIndex
          ].answer.filter((e) => e !== selectedAnswer);
          updatedFormData = [...formData];
        }
      } else {
        formObj = {
          formId: formIds,
          questionId: questionIds,
          answer: [selectedAnswer],
        };
        updatedFormData = [
          ...formData.slice(0, i),
          formObj,
          ...formData.slice(i),
        ];
      }
      setFormData(updatedFormData);
    } else if (e.target.type === "textarea") {
      const newFormData = [...formData];
      let updatedFormData = [];
      const selectedAnswer = e.target.value;
      console.log("selectedAnswer", selectedAnswer);
      let findQuestionIndex = formData.findIndex(
        (e) => e.questionId === questionIds
      );
      if (findQuestionIndex > -1) {
        formData[findQuestionIndex].answer = `${e.target.value}`;
        updatedFormData = [...formData];
      } else {
        let formObj = {
          formId: formIds,
          questionId: questionIds,
          answer: `${e.target.value}`,
        };
        updatedFormData = [
          ...formData.slice(0, i),
          formObj,
          ...formData.slice(i),
        ];
      }
      setFormData(updatedFormData);
    }
  };

  const createObj = (fromId, e) => {
    console.log(fromId, "frm", e);

    if (forms) {
      const selectedForm = forms.find((e) => e._id === fromId);
      console.log(selectedForm.questions, "sl");
      for (let i = 0; i < selectedForm.questions; i++) {
        let obj = {
          formId: "",
          questionId: "",
          answer: [],
        };
        setFormData([...formData, obj]);
      }
      console.log("formData create obj", formData);
    }
  };

  {
    /* .filter((e) => !e?.actions[0]?.form_type === type) */
  }
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // function to handle checkbox clicked
  const handleCheckboxClick = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const pid = "65166f71a38fcd8820294712";

  console.log("patId 65166f71a38fcd8820294712 patid", patId);

  const formResponseHandler = (f) => {
    setSelectedForm(f);
    setShowModal(true);
  }

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox></MessageBox>
      ) : forms.length > 0 ? (
        <div className="my-10">
          <div className="flex mr-5">
            <select
              className="form__SelectType"
              onChange={(e) => handleType(e.target.value)}
            >
              <option value="allForms">All Forms</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
              <option value="onetime">Onetime</option>
            </select>

            <button
              type="button"
              onClick={() => setButtonClicked(true)}
              className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1 h-[38.6px] mt-[4.2px]"
            >
              Reload
            </button>
          </div>

          <table className="min-w-full table-auto table-res">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-lg font-bold text-gray-900 px-2 py-4">
                  Sl No.
                </th>
                <th className="text-lg font-bold text-gray-900 px-2 py-4">
                  Form Name
                </th>
                <th className="text-lg font-bold text-gray-900 px-2 py-4">
                  Form Type
                </th>
                <th className="text-lg font-bold text-gray-900 px-2 py-4">
                  Date
                </th>
                <th className="text-lg font-bold text-gray-900 px-2 py-4">
                  Add Responses
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox>{error}</MessageBox>
              ) : showForm ? (
                newForm.length > 0 ? (
                  newForm.map((f, i) => {
                    const dateAction = f.actions.find(
                      (action) => patId === action.patientId
                    );
                    return (
                      <tr className="bg-white border-b" key={f._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                          {i + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium   text-gray-900 text-center">
                          {f.form_title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium  text-gray-900 text-center">
                          {f.actions[0]?.form_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                          {/* {truncate(f.actions[0].view_date, 11)} */}
                          {truncate(dateAction?.view_date, 11)}
                        </td>
                        <td className="p-3  text-center flex justify-center items-center text-gray-700 whitespace-nowrap">
                          <div className="form__Btn">
                            <button
                              type="submit"
                              className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                              onClick={() => formResponseHandler()}
                            >
                              Click Here
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <MessageBox>no forms</MessageBox>
                )
              ) : forms.length > 0 ? (
                forms.map((f, i) => {
                  const dateAction = f.actions.find(
                    (action) => patId === action.patientId
                  );

                  return (
                    <tr className="bg-white border-b" key={f._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center">
                        {f.form_title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium  text-gray-900 text-center">
                        {f.actions[0]?.form_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                        {truncate(dateAction?.view_date, 11)}
                      </td>
                      <td className="p-3  text-center flex justify-center items-center text-gray-700 whitespace-nowrap">
                        <div className="form__Btn">
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                            onClick={() => formResponseHandler()}
                          >
                            Click Here
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <MessageBox>no forms</MessageBox>
              )}
            </tbody>
          </table>
          {/* <Pagination data={forms} setData={setNewForm} /> */}

          {/* modal box */}
          {showModal ? (
            <div className="py-4">
            <div
              className="fixed flex justify-center  items-center h-screen top-0 left-0 right-0 z-50 block w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
              data-modal-backdrop="static"
              tabIndex="-1"
              aria-hidden="true"
            >
              <div className="relative w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    {/* <h5
                      className="text-xl font-medium leading-normal text-gray-800"
                      id="modalPatientProfileLabel"
                    >
                      test form 1
                    </h5> */}
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
                    {/* <form onSubmit={submitHandler}> */}

                    <form>
                      {selectedForm != null ? (
                        <>
                          {/* modalbox starts */}
                          {loading ? (
                            <LoadingBox></LoadingBox>
                          ) : error ? (
                            <MessageBox>{error}</MessageBox>
                          ) : forms.length > 0 ? (
                            forms
                              .filter((e) => e._id === selectedForm?._id)
                              .map((frm, index) => (
                                <div className="p-2" key={frm._id}>
                                  <div className="relative w-full overflow-hidden">
                                    <input
                                      onClick={(e) => createObj(frm._id, e)}
                                      type="checkbox"
                                      checked={openDropdownIndex === index}
                                      onChange={() =>
                                        handleCheckboxClick(index)
                                      }
                                      className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                                    />
                                    <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                                      <h1 className="text-lg font-semibold text-gray-600">
                                        {frm.form_title}
                                      </h1>
                                    </div>
                                    {/* Down Arrow Icon */}
                                    <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                                      <FiChevronDown className="w-6 h-6" />
                                    </div>
                                    {/* Content */}
                                    <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                                      <div className="p-4">
                                        <div className="dashboard__Grid-Box">
                                          <div className="dashboard__Grid-Cols">
                                            <form>
                                              <div className="form__Box-Shadow">
                                                <div className="form__Box-Space">
                                                  <div className="form__Grid--Rows-none">
                                                    <div className="form__Cols--Span-6">
                                                      <h2 className="text-xl text-center font-bold pt-5">
                                                        {frm.form_title}
                                                      </h2>
                                                    </div>
                                                  </div>

                                                  {frm.questions.map(
                                                    (qs, i) => (
                                                      <>
                                                        {qs.type !==
                                                        "textArea" ? (
                                                          <>
                                                            <h5
                                                              className="text-lg font-medium pt-5"
                                                              key={qs._id}
                                                            >
                                                              {
                                                                qs.question_title
                                                              }
                                                            </h5>
                                                            <div className="form__Grid--Cols-6">
                                                              <div className="form__Cols--Span-6">
                                                                <div className="flex justify-start items-start">
                                                                  <div className="flex h-5 items-center">
                                                                    <input
                                                                      data-formid={
                                                                        frm._id
                                                                      }
                                                                      name={`question-${qs._id}`}
                                                                      type={
                                                                        qs.type
                                                                      }
                                                                      value={
                                                                        qs.choice1
                                                                      }
                                                                      checked={
                                                                        openDropdownIndex ===
                                                                          index &&
                                                                        formData[
                                                                          index
                                                                        ]?.answer.includes(
                                                                          qs.choice1
                                                                        )
                                                                      }
                                                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                      onChange={(
                                                                        e
                                                                      ) =>
                                                                        handleChange(
                                                                          e,
                                                                          i,
                                                                          frm._id,
                                                                          qs._id
                                                                        )
                                                                      }
                                                                    />
                                                                  </div>
                                                                  <div className="ml-3 text-sm">
                                                                    <label
                                                                      htmlFor="choice"
                                                                      className="font-medium text-gray-700"
                                                                    >
                                                                      {
                                                                        qs.choice1
                                                                      }
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="form__Cols--Span-6">
                                                                <div className="flex items-start">
                                                                  <div className="flex h-5 items-center">
                                                                    <input
                                                                      onChange={(
                                                                        e
                                                                      ) =>
                                                                        handleChange(
                                                                          e,
                                                                          i,
                                                                          frm._id,
                                                                          qs._id
                                                                        )
                                                                      }
                                                                      id="choice"
                                                                      name={`question-${qs._id}`}
                                                                      value={
                                                                        qs.choice2
                                                                      }
                                                                      checked={
                                                                        openDropdownIndex ===
                                                                          index &&
                                                                        formData[
                                                                          index
                                                                        ]?.answer.includes(
                                                                          qs.choice2
                                                                        )
                                                                      }
                                                                      type={
                                                                        qs.type
                                                                      }
                                                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                  </div>
                                                                  <div className="ml-3 text-sm">
                                                                    <label
                                                                      htmlFor="choice"
                                                                      className="font-medium text-gray-700"
                                                                    >
                                                                      {
                                                                        qs.choice2
                                                                      }
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="form__Cols--Span-6">
                                                                <div className="flex justify-start items-start">
                                                                  <div className="flex h-5 items-center">
                                                                    <input
                                                                      id="choice"
                                                                      name={`question-${qs._id}`}
                                                                      type={
                                                                        qs.type
                                                                      }
                                                                      value={
                                                                        qs.choice3
                                                                      }
                                                                      checked={
                                                                        openDropdownIndex ===
                                                                          index &&
                                                                        formData[
                                                                          index
                                                                        ]?.answer.includes(
                                                                          qs.choice3
                                                                        )
                                                                      }
                                                                      onChange={(
                                                                        e
                                                                      ) =>
                                                                        handleChange(
                                                                          e,
                                                                          i,
                                                                          frm._id,
                                                                          qs._id
                                                                        )
                                                                      }
                                                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                  </div>
                                                                  <div className="ml-3 text-sm">
                                                                    <label
                                                                      htmlFor="choice"
                                                                      className="font-medium text-gray-700"
                                                                    >
                                                                      {
                                                                        qs.choice3
                                                                      }
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="form__Cols--Span-6">
                                                                <div className="flex items-start">
                                                                  <div className="flex h-5 items-center">
                                                                    <input
                                                                      id="choice"
                                                                      name={`question-${qs._id}`}
                                                                      type={
                                                                        qs.type
                                                                      }
                                                                      value={
                                                                        qs.choice4
                                                                      }
                                                                      checked={
                                                                        openDropdownIndex ===
                                                                          index &&
                                                                        formData[
                                                                          index
                                                                        ]?.answer.includes(
                                                                          qs.choice4
                                                                        )
                                                                      }
                                                                      onChange={(
                                                                        e
                                                                      ) =>
                                                                        handleChange(
                                                                          e,
                                                                          i,
                                                                          frm._id,
                                                                          qs._id
                                                                        )
                                                                      }
                                                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                  </div>
                                                                  <div className="ml-3 text-sm">
                                                                    <label
                                                                      htmlFor="choice-4"
                                                                      className="font-medium text-gray-700"
                                                                    >
                                                                      {
                                                                        qs.choice4
                                                                      }
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </>
                                                        ) : (
                                                          <>
                                                            <h5 className="text-lg font-medium pt-5">
                                                              {
                                                                qs.question_title
                                                              }
                                                            </h5>
                                                            <div className="form__Grid--Cols-6">
                                                              <div className="form__Cols--Span-6">
                                                                <div className="flex justify-start items-start">
                                                                  <textarea
                                                                    name={`question-${qs._id}`}
                                                                    id=""
                                                                    cols="100"
                                                                    rows="5"
                                                                    onChange={(
                                                                      e
                                                                    ) =>
                                                                      handleChange(
                                                                        e,
                                                                        i,
                                                                        frm._id,
                                                                        qs._id
                                                                      )
                                                                    }
                                                                  ></textarea>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </>
                                                        )}
                                                      </>
                                                    )
                                                  )}
                                                </div>

                                                <div className="form__Btn-Bg">
                                                  <button
                                                    onClick={nextStep}
                                                    type="submit"
                                                    className="form__Btn-Submit "
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
                                  </div>
                                </div>
                              ))
                          ) : (
                            <MessageBox>no forms</MessageBox>
                          )}
                          {/* modalbox  ends */}
                        </>
                      ) : (
                        <LoadingBox></LoadingBox>
                      )}
                    </form>
                  </div>
                  {/* <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          ) : (
            <h1></h1>
          )}
        </div>
      ) : (
        <MessageBox>no forms</MessageBox>
      )}
    </>
  );
};

export const Form2 = () => {
  let navigate = useNavigate();
  const nextStep = () => {
    navigate("/userrole/:roleid/dashboard/patient/mydata/");
  };
  return (
    <>
      <div className="p-2">
        <div className="relative w-full overflow-hidden">
          <input
            id="checkbox2"
            type="checkbox"
            className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
          />
          <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
            <h1 className="text-lg font-semibold text-gray-600">Form Title</h1>
          </div>
          {/* Down Arrow Icon */}
          <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
            <FiChevronDown className="w-6 h-6" />
          </div>
          {/* Content */}
          <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
            <div className="p-4">
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
                              Question Title 1
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
                                  Question Choice 2
                                </label>
                              </div>
                            </div>
                          </div>
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
                                  Question Choice 3
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
                                  Question Choice 4
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form__Grid--Rows-none">
                          <div className="form__Cols--Span-6">
                            <h5 className="text-lg font-medium pt-5">
                              Question Title 2
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
                                  Question Choice 2
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form__Cols--Span-6">
                            <div className="flex justify-start items-start">
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
                                  Question Choice 3
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
                                  Question Choice 4
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form__Grid--Rows-none">
                          <div className="form__Cols--Span-6">
                            <h5 className="text-lg font-medium pt-5">
                              Question Title 3
                            </h5>
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
                          onClick={(e) => nextStep(e)}
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
        </div>
      </div>
    </>
  );
};

export const Form3 = () => {
  let navigate = useNavigate();
  const nextStep = () => {
    navigate("/userrole/:roleid/dashboard/patient/mydata/");
  };
  return (
    <>
      <div className="p-2">
        <div className="relative w-full overflow-hidden">
          <input
            type="checkbox"
            id="checkbox3"
            className="peer absolute top-0 inset-x-0 w-full h-12 opacity z-10 cursor-pointer"
          />
          <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
            <h1 className="text-lg font-semibold text-gray-600">Form Title</h1>
          </div>
          {/* Down Arrow Icon */}
          <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
            <FiChevronDown className="w-6 h-6" />
          </div>
          {/* Content */}
          <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
            <div className="p-4">
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
                              Question Title 1
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
                                  Question Choice 2
                                </label>
                              </div>
                            </div>
                          </div>
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
                                  Question Choice 3
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
                                  Question Choice 4
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form__Grid--Rows-none">
                          <div className="form__Cols--Span-6">
                            <h5 className="text-lg font-medium pt-5">
                              Question Title 2
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
                                  Question Choice 2
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form__Cols--Span-6">
                            <div className="flex justify-start items-start">
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
                                  Question Choice 3
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
                                  className="h-4 w-4 border-gray-300 text-indigo-600   focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="choice-2"
                                  className="font-medium text-gray-700"
                                >
                                  Question Choice 4
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form__Grid--Rows-none">
                          <div className="form__Cols--Span-6">
                            <h5 className="text-lg font-medium pt-5">
                              Question Title 3
                            </h5>
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
                          onClick={(e) => nextStep(e)}
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
        </div>
      </div>
    </>
  );
};
