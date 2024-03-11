import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../../user/shared/AdminNav";
import axios from "axios";
import { Url } from "../../../constant.js/PatientConstant";
import { CiEdit, CiSaveDown1 } from "react-icons/ci";
import Swal from "sweetalert2";
import { VscSaveAs } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";

const AdminProfile = () => {
  const navigate = useNavigate();

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminDocInfo } = adminSignin;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminData, setAdminData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${Url}/admin/get-adminInfo`, {
          headers: {
            Authorization: `Bearer ${adminDocInfo.token}`,
          },
        });
        setAdminData(data?.data);
        setNewPassword(data?.data.password);
      } catch (error) {
        setError("Error fetching admin information");
      }
    };

    fetchAdminInfo();
    setUpdateSuccess(false);
  }, [adminDocInfo.token, updateSuccess]);

  console.log("adminData", adminData);

  const updatePassword = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${Url}/admin/update-password`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${adminDocInfo.token}`,
          },
        }
      );
      setUpdateSuccess(true);
      Swal.fire({
        icon: "success",
        text: "Password updated successfully",
      });
    } catch (error) {
      setError("Error updating password");
      console.error("Error updating password:", error);
    }
    setIsEdit(false);
  };

  const backFunc = () => {
    navigate("/Admin/dashboard/");
  };

  return (
    <>
      <div className="dashboard__Container">
        <AdminNav />
        <main>
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
                      Doctor Personal Account Information
                    </h3>
                  </div>

                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1 text-sm text-green-900 font-semibold sm:col-span-2 sm:mt-0">
                          {adminData?.email}
                        </dd>
                      </div>

                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-500">
                          Password
                        </dt>

                        <dd className="mt-1 text-sm justify-between text-gray-900 sm:col-span-2 sm:mt-0 flex">
                          {isEdit ? (
                            <input
                              className="form__EditInput"
                              id="password"
                              type="text"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          ) : (
                            <dd className="mt-1 text-sm text-green-900 font-semibold sm:col-span-2 sm:mt-0">
                              {adminData?.password}
                            </dd>
                          )}

                          <span className="align-middle flex justify-center items-center">
                            {isEdit ? (
                              <div className="flex gap-2 relative top-2.5">
                                <VscSaveAs
                                  onClick={() => updatePassword()}
                                  className="mx-2 mb-3 cursor-pointer relative bottom-3 text-lg hover:text-gray-800 text-gray-700"
                                />
                                <RxCross1
                                  onClick={() => {
                                    setIsEdit(false);
                                    setNewPassword(adminData?.password);
                                  }}
                                  className="mx-2 mb-3 cursor-pointer relative bottom-3 text-lg hover:text-gray-800 text-gray-700"
                                />
                              </div>
                            ) : (
                              <CiEdit
                                onClick={() => setIsEdit(true)}
                                className="mx-2 mb-3.5 flex gap-2 top-[1px] cursor-pointer relative bottom-3 text-2xl hover:text-gray-800 text-gray-700"
                              />
                            )}
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  {/* )} */}
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

export default AdminProfile;
