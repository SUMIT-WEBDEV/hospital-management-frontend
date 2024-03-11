import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnsForm } from "../../../action/PatientAction";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { truncate } from "../../../constant.js/Constant";

const PatientAnswersTable = () => {
  const ansFormState = useSelector((state) => state.formAns);
  const { loadingAns, error, ansforms } = ansFormState;
  console.log("ansforms ==>", ansforms);

  const allAnsNum = ansforms?.flatMap((f) => f?.questions[0]?.answers.length);
  // console.log("allAnsNum ==>", allAnsNum);

  const ansFormsNew = allAnsNum
    ?.map((elem, index) => {
      const multiForm = [];
      for (let i = 0; i < elem; i++) {
        // console.log("i", i);
        const filterdAns = {
          ...ansforms[index],
          questions: [
            {
              ...ansforms[index]?.questions[0],
              answers: [ansforms[index]?.questions[0]?.answers[i]],
            },
          ],
        };
        // console.log(ansforms[index]);
        multiForm.push(filterdAns);
      }
      return multiForm;
    })
    ?.flat(1);

  const dispatch = useDispatch();

  const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
  const patientData = JSON.parse(localStorage.getItem("patientData"));

  const activeUser = localStorage.getItem("activeUser");

  const getId = () => {
    if (activeUser === "patient") {
      return patientInfo?.user?._id;
    } else if (activeUser === "doctor") {
      const pId = localStorage.getItem("patId");
      return pId;
    }
  };

  const UID = getId();

  // console.log("ansFormsNew ===>", ansFormsNew);

  // const getFomrsList = useSelector((state) => state.patientFormList);
  // const { loadingAns, error, forms } = getFomrsList;
  // console.log("forms ==>", forms);

  // console.log("patientInfo ==>", patientInfo);
  // console.log("activeUser  ==>", activeUser);

  const filterFormAns = ansforms?.map((frm) => {
    return {
      ...frm,
      actions: frm?.actions.filter((ac) => ac?.patientId == UID),
      questions: frm?.questions.map((qs) => {
        return {
          ...qs,
          answers: qs?.answers.filter((ans) => ans.patientId == UID),
        };
      }),
    };
  });

  console.log("filterFormAns ====>", filterFormAns);

  const filterFormAns2 = ansFormsNew?.map((frm) => {
    return {
      ...frm,
      actions: frm?.actions.filter((ac) => ac?.patientId == UID),
      questions: frm?.questions.map((qs) => {
        return {
          ...qs,
          answers: qs?.answers.filter((ans) => ans.patientId == UID),
        };
      }),
    };
  });

  console.log("filterFormAns2 ====>", filterFormAns2);

  useEffect(() => {
    dispatch(getAnsForm(activeUser, UID));
  }, []);

  return (
    <>
      <div className="py-16 relative  bg-white rounded-3xl">
        {loadingAns ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox></MessageBox>
        ) : (
          <div className="my-10">
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
                    Answer
                  </th>
                  <th className="text-lg font-bold text-center text-gray-900 px-2 py-4">
                    Date (Response Saved)
                  </th>
                  {/* <th className="text-lg font-bold text-center text-gray-900 px-2 py-4">
                    Date
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {loadingAns ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox>{error}</MessageBox>
                ) : filterFormAns2?.length > 0 ? (
                  filterFormAns2
                    .filter((frm) => frm?.questions[0]?.answers?.length != 0)
                    .sort((a, b) => {
                      let x =
                        a.questions[0].answers[0].fillingDate.toLowerCase();
                      let y =
                        b.questions[0].answers[0].fillingDate.toLowerCase();
                      if (x < y) {
                        return 1;
                      }
                      if (x > y) {
                        return -1;
                      }
                      return 0;
                    })
                    ?.map((frm, i) => (
                      <tr className="bg-white border-b" key={frm._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium        text-gray-900 text-center">
                          {i + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium     text-gray-900 text-center">
                          {frm.form_title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base capitalize font-medium text-gray-900 text-center">
                          {frm.actions[0].form_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium     text-gray-900 text-center">
                          {frm.questions[0].answers.map((ans) => ans.data)}
                        </td>
                        <td className="p-3  text-base text-center w-52 text-gray-700 whitespace-nowrap">
                          {frm.questions[0].answers.map((ans) =>
                            truncate(ans.fillingDate)
                          )}
                        </td>
                        {/* <td className="p-3  text-base text-center w-52 text-gray-700      whitespace-nowrap">
                          {truncate(frm.createdOn)}
                          </td> */}
                      </tr>
                    ))
                ) : (
                  <MessageBox>No Response</MessageBox>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default PatientAnswersTable;
