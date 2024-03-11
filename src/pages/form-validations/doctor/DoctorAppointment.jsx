import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { listPatients } from "../../../action/PatientAction";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";

const DoctorAppointment = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  return (
    <>
      {/* Replace with your content */}

      <div className="dashboard__Main-Inner-Content">
        <div className="flex justify-start">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
              Number of Appointment
            </h5>
            <h6 className="text-gray-700 text-base mb-4">12</h6>
            <input
              type="date"
              name="appointment"
              id="appointment"
              autoComplete="given-name"
              className="form__Input"
            />
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
                  Doctor Name
                </th>
                <th className="text-lg font-bold text-gray-900 px-2 py-4">
                  Patient Name
                </th>
                <th className="text-lg font-bold text-gray-900 px-2 py-4">
                  Appointment Date
                </th>
                <th className="text-lg font-bold text-gray-900 px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {loading ? <LoadingBox></LoadingBox>:
                error? <MessageBox>{error}</MessageBox>:
                patients.data && patients.data.map((itm,i)=>(
              <tr key={itm._id} className="bg-white border-b">
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                  {i+1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                  {itm.team}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                  {itm.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                  11-10-2022
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 text-center">
                  <div className="flex flex-row justify-center">
                    <div className="inline-block p-6">
                      <FiEye
                        className="h-6 w-6 hover:text-green-500"
                        onClick={() =>
                          navigate(
                            "/userrole/:roleid/dashboard/doctor/meeting/info/",{state:{id:itm._id}}
                          )
                        }
                      />
                    </div>
                    <div className="inline-block p-6">
                      <FiEdit className="h-6 w-6 hover:text-blue-500" />
                    </div>
                  </div>
                </td>
              </tr>
            ))} */}
            </tbody>
          </table>
        </div>

        <MessageBox>No Data</MessageBox>
      </div>

      {/* /End replace */}
    </>
  );
};

export default DoctorAppointment;
