import React, { useEffect, useState } from "react";
import LoginForm from "../../pages/form-validations/LoginForm";

import Logo from "../../Assets/img/logo-login.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../../Components/LoadingBox";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const patientSignin = useSelector((state) => state.patientSignin);
  const doctorSignin = useSelector((state) => state.doctorSignin);
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminDocInfo } = adminSignin;
  const { patientInfo } = patientSignin;
  const { doctorInfo } = doctorSignin;
  // console.log(localStorage.getItem("activeUser"));

  useEffect(() => {
    switch (localStorage.getItem("activeUser")) {
      case null || undefined:
        setLoading(false);
      case "doctor":
        doctorInfo.token
          ? navigate("/userrole/:roleid/dashboard/doctor/")
          : setLoading(true);
        break;
      case "patient":
        patientInfo
          ? navigate("/userrole/:roleid/dashboard/patient/mydata/")
          : setLoading(false);
        break;
      case "admin":
        adminDocInfo ? navigate("/Admin/dashboard/") : setLoading(false);
        break;

      default:
        setLoading(false);
        break;
    }
  }, []);

  return (
    <>
      {!loading ? (
        <section className="login__Container">
          <div className="login__Container--Box">
            <div>
              <img
                className="login__Container--Img"
                src={Logo}
                alt="Your Company"
              />
              <h2 className=" mt-6 text-center md:text-3xl font-bold tracking-tight  text-2xl text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <LoginForm />
          </div>
        </section>
      ) : (
        <LoadingBox></LoadingBox>
      )}
    </>
  );
};

export default Login;
