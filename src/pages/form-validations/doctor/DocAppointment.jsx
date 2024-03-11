import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentOnDate } from "../../../action/DoctorAction";
import DocAppointmentTable from "./DocAppointmentTable";

const DocAppointment = () => {
  const dispatch = useDispatch();
  // const [date,setDate]=useState()
  const appointmentDate = useSelector((state) => state.appointmentDate);
  const { loading, error, count } = appointmentDate;

  const handleChange = (e) => {
    const dates = e.target.value;
    dispatch(getAppointmentOnDate(dates));
  };

  return (
    <>
      <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div className="border border-gray-400 lg:border-0 lg:border-gray-400 bg-gray-50 rounded lg:rounded-none lg:rounded p-4 flex flex-col justify-between leading-normal drop-shadow-lg">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">
              Number of Appointments
            </div>
            <div className="px-6 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {count >= 0 ? count : "0"}
                {/* {count && count} */}
              </span>
            </div>
            <div className="flex items-center">
              <div className="text-sm">
                <input
                  type="date"
                  name="appointment"
                  id="appointment"
                  autoComplete="given-name"
                  className="form__Input"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DocAppointmentTable />
    </>
  );
};

export default DocAppointment;
