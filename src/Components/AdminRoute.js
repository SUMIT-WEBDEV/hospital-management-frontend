import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminDocInfo } = adminSignin;

  return adminDocInfo ? children : <Navigate to="/" />;
}

export default AdminRoute;
