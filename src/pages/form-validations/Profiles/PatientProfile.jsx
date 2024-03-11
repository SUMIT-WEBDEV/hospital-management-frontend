import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientNav from "../../../user/shared/PatientNav";
import { Url } from "../../../constant.js/PatientConstant";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  DetailsPatients,
  getPatientProfile,
} from "../../../action/PatientAction";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { truncate } from "../../../constant.js/Constant";

const PatientProfile = () => {
  const patientProfileList = useSelector((state) => state.patientProfileList);
  const { loading, error, profile } = patientProfileList;
  const [healthPlanOptions, setHealthPlanOptions] = useState([]);
  const [optionsError, setOptionsError] = useState(null);
  const dispatch = useDispatch();
  const doctorSignin = useSelector((state) => state.doctorSignin);
  const { doctorInfo } = doctorSignin;

  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;

  const myPatientdetail = useSelector((state) => state.patientDetails) || {};
  const { loadingPatientDetail, patient } = myPatientdetail;

  // console.log("patientdetail--->", patientD);
  console.log("patientProfileList ===>", patientProfileList);
  useEffect(() => {
    dispatch(getPatientProfile());
  }, []);

  // get patient by doctor
  useEffect(() => {
    dispatch(DetailsPatients(patId));
  }, []);

  const navigate = useNavigate();
  const backFunc = () => {
    navigate("/userrole/:roleid/dashboard/patient/mydata/");
  };
  async function fetchData() {
    try {
      const response = await fetch(`${Url}/health-plan`, {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setHealthPlanOptions([
        ...json?.data.flatMap((opt) => ({ value: opt._id, label: opt.name })),
      ]);
    } catch (err) {
      setOptionsError(err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log("profile ==>", profile);
  const formatDateString = (dateString) => {
    if (typeof dateString !== "string") {
      return "";
    }
    const strippedDate = dateString.slice(0, 10);
    return strippedDate;
  };

  const uniqueHealthPlans = [
    ...new Set(patient?.data?.health_plan?.map((h) => h?.healthPlan?.name)),
  ];

  return (
    <>
      <div className="dashboard__Container">
        <PatientNav />
        <main>
          {!profile ? (
            <div className="dashboard__Main-Content">
              {/* Replace with your content */}
              <div className="dashboard__Main-Inner-Content">
                <button
                  type="button"
                  className="text-center py-6 text-xl font-medium leading-6 text-gray-900"
                  onClick={backFunc}
                >
                  {" "}
                  Back
                </button>
                <div className="px-4 py-6 sm:px-0">
                  <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Patient Personal Account Information
                      </h3>
                    </div>

                    {/* {console.log("patient ==>", patient)} */}
                    {!patient ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <div className="border-t border-gray-200">
                        <dl>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Accout Status
                            </dt>
                            <dd className="mt-1 text-sm text-green-900 font-semibold sm:col-span-2 sm:mt-0">
                              Active
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Name
                            </dt>
                            <dd className="mt-1 text-sm capitalize text-gray-900 sm:col-span-2 sm:mt-0">
                              {patient?.data?.name}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Age
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {patient?.data?.age}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Phone Number
                            </dt>
                            <dd className="mt-1 text-sm capitalize text-gray-900 sm:col-span-2 sm:mt-0">
                              {patient?.data?.phone}
                            </dd>
                          </div>

                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {patient?.data?.email}
                            </dd>
                          </div>

                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Primary Doctors
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {patient?.data?.primaryTeamIds.map(
                                (priDoc, i) => {
                                  if (
                                    patient?.data?.primaryTeamIds.length === 1
                                  )
                                    return (
                                      <span key={priDoc.doctorId}>
                                        {priDoc.name}
                                      </span>
                                    );
                                  else {
                                    return (
                                      <span key={priDoc.doctorId}>
                                        {i + 1}. {priDoc.name}
                                        {"  "}
                                      </span>
                                    );
                                  }
                                }
                              )}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Secondary Doctors
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {patient?.data?.secondaryTeamIds.map(
                                (secDoc, i) => {
                                  if (
                                    patient?.data?.secondaryTeamIds.length === 1
                                  )
                                    return (
                                      <span key={secDoc.doctorId}>
                                        {secDoc.name}
                                        {"  "}
                                      </span>
                                    );
                                  else {
                                    return (
                                      <span key={secDoc.doctorId}>
                                        {i + 1}. {secDoc.name}
                                        {"  "}
                                      </span>
                                    );
                                  }
                                }
                              )}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Health Plan Enrolled
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {uniqueHealthPlans.map((h, index) => (
                                <span key={index}>
                                  {h}
                                  {index < uniqueHealthPlans.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Caretaker Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {patient?.data.caretakers_name}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Caretaker Relation
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {patient?.data.caretakers_relation}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Caretaker Phone
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {patient?.data.caretakers_phone}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              {/* Health Teams Added */}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {/* {patient.data.caretakers_phone} */}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* /End replace */}
            </div>
          ) : (
            <div className="dashboard__Main-Content">
              {/* Replace with your content */}
              <div className="dashboard__Main-Inner-Content">
                <button
                  type="button"
                  className="text-center py-6 text-xl font-medium leading-6 text-gray-900"
                  onClick={backFunc}
                >
                  Back
                </button>
                <div className="px-4 py-6 sm:px-0">
                  <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Patient Personal Account Information test
                      </h3>
                    </div>

                    {patientProfileList?.profile ? (
                      <div className="border-t border-gray-200">
                        <dl>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Accout Status
                            </dt>
                            <dd className="mt-1 text-sm text-green-900 font-semibold sm:col-span-2 sm:mt-0">
                              Active
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Name
                            </dt>
                            <dd className="mt-1 text-sm capitalize text-gray-900 sm:col-span-2 sm:mt-0">
                              {profile?.patient?.name}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              D.O.B
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {formatDateString(profile?.patient?.dob)}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {profile?.patient?.email}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Phone Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {profile?.patient?.phone}
                            </dd>
                          </div>

                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Height
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {profile?.patient?.height}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Weight
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {profile?.patient?.weight}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Caretaker Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {profile?.patient?.caretakers_name}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Caretaker Relation
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {profile?.patient?.caretakers_relation}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Caretaker Phone Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {profile?.patient?.caretakers_phone}
                            </dd>
                          </div>

                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-bold text-gray-500">
                              Health Plan Enrolled Duration
                            </dt>
                            <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {truncate(
                                profile?.patient?.health_plan_date.startDate,
                                11
                              )}{" "}
                              to{" "}
                              {truncate(
                                profile?.patient?.health_plan_date?.endDate,
                                11
                              )}
                            </div>
                          </div>
                        </dl>
                      </div>
                    ) : (
                      <LoadingBox></LoadingBox>
                    )}
                  </div>
                </div>
              </div>
              {/* /End replace */}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default PatientProfile;
