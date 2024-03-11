import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PatientRoute({ children }) {
  const patientSignin = useSelector((state) => state.patientSignin);
  const doctorSignin = useSelector((state) => state.doctorSignin);
  const { patientInfo } = patientSignin;
  const { doctorInfo } = doctorSignin;
  return (patientInfo || doctorInfo) ? children : <Navigate to="/" />;
};

export default PatientRoute

