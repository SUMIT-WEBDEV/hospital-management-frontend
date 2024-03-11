import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function DoctorRoute({ children }) {
  const doctorSignin = useSelector((state) => state.doctorSignin);
  const { doctorInfo } = doctorSignin;
  console.log(doctorInfo?.status, "info");
  return doctorInfo ? children : <Navigate to="/" />;
}

export default DoctorRoute;
