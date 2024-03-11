import axios from "axios";
import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Url } from "../../../constant.js/PatientConstant";
import { DetailsPatients } from "../../../action/PatientAction";

const PatientAccountStatus = () => {
  const dispatch = useDispatch();
  const myPatientId = useSelector((state) => state.patientId);
  const { patId } = myPatientId;

  const doctorInfo = JSON.parse(window.localStorage.getItem("doctorInfo"));
  const todayDate = format(new Date(), "MM-dd-yyyy");

  const [selectedOption, setSelectedOption] = useState("Active");

  const patientDetail = useSelector((state) => state.patientDetails);
  const { loading, patient } = patientDetail;

  const [update, setUpdate] = useState(false);

  // console.log("patient", patient);

  const [doctorAction, setDoctorAction] = useState({
    doctor_name: doctorInfo.user.name,
    date: todayDate,
    reason: "",
  });

  const [record, setRecord] = useState([]);
  const activateUrl = `${Url}/patients/activate/${patId}`;

  const deActivateUrl = `${Url}/patients/deactivate/${patId}`;

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //   changing status of patient

  const handleStatus = async () => {
    try {
      if (selectedOption === "De-Active") {
        const res = await axios.put(
          deActivateUrl,
          { message: doctorAction.reason },
          {
            headers: {
              Authorization: `Bearer ${doctorInfo.token}`,
            },
          }
        );
        console.log("Account Deactivated", res);
      } else if (selectedOption === "Active") {
        const res = await axios.put(
          activateUrl,
          { message: doctorAction.reason },
          {
            headers: {
              Authorization: `Bearer ${doctorInfo.token}`,
            },
          }
        );
        console.log("Account Activated", res);
      }
    } catch (err) {
      console.log("err", err);
    }

    setRecord([...record, doctorAction]);
    setDoctorAction({
      doctor_name: doctorInfo.user.name,
      date: todayDate,
      reason: "",
    });

    if (selectedOption === "De-Active") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully De-Activated",
        showConfirmButton: false,
        timer: 1500,
      });
      setUpdate(!update);
    } else if (selectedOption === "Active") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Activated",
        showConfirmButton: false,
        timer: 1500,
      });
      setUpdate(!update);
    }
  };

  useEffect(() => {
    dispatch(DetailsPatients(patId));
  }, [dispatch, update]);

  return (
    <>
      <div className="card__Block">
        <h5 className="card__Heading">
          Patient Status
          <span className="card__Heading--Span card__Bg--Teal">Account</span>
        </h5>
        <form>
          <div className="form__Grid--Rows-none">
            <div className="form__Cols--Span-6">
              <label htmlFor="currentStatus" className="form__Label-Heading">
                Current Patient Status
              </label>
              <p id="currentStatus" className="form__Heading">
                {patient?.data?.status}
              </p>
            </div>
            <div className="form__Cols--Span-6">
              <select
                id="form"
                name="form"
                autoComplete="form-name"
                className="form__Select"
                value={selectedOption}
                onChange={handleChange}
              >
                <option value="" data-default>
                  Select Patient Status
                </option>
                <option value="Active">Active</option>
                <option value="De-Active">De-Active</option>
              </select>
            </div>
            <div className="form__Cols--Span-6">
              <textarea
                className="form__Textarea"
                rows="3"
                placeholder="Please Add Why account is deactivated."
                value={doctorAction.reason}
                onChange={(e) =>
                  setDoctorAction({ ...doctorAction, reason: e.target.value })
                }
              ></textarea>
            </div>
            <div className="form__Cols--Span-6">
              <button
                type="button"
                className="card__Btn card__Bg--Teal card__Btn--Bg-Teal"
                onClick={handleStatus}
              >
                Update Status
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="my-10">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-10 p-3 text-lg font-semibold tracking-wide text-left">
                Sl No.
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-left">
                Doctor Name
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-left">
                Date
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-left">
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {record.map((r, i) => (
              <tr className="bg-white border-b cursor-pointer" key={i}>
                <td className="p-3 text-base text-gray-700 whitespace-nowrap">
                  {i + 1}
                </td>
                <td className="p-3 text-base text-gray-700 whitespace-nowrap">
                  {r.doctor_name}
                </td>
                <td className="p-3 text-base text-gray-700 whitespace-nowrap">
                  {r.date}
                </td>
                <td className="p-3 text-base text-gray-700 whitespace-nowrap">
                  {r.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PatientAccountStatus;
