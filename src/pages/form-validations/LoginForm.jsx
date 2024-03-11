import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import InputLog from "../../Components/InputLog";
import Select from "../../Components/Select";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";
import { useForm } from "../../hooks/form-hooks";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  patientLogin,
  patientOtp,
  patientStore,
} from "../../action/PatientAction";
import { useEffect } from "react";
import { SENDOTP_RESET } from "../../constant.js/PatientConstant";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import { adminLogin } from "../../action/AdminAction";

const LoginForm = () => {
  const [showSignin, setShowSignin] = useState(false);
  const patientOtps = useSelector((state) => state.patientOtp);
  const { loading, error, success } = patientOtps;
  const { patientInfo } = useSelector((state) => state.patientSignin);

  const patientSign = useSelector((state) => state.patientFirstReducer);

  const { loading: loadingPatient, error: errorPatient, patInfo } = patientSign;

  const doctorSignin = useSelector((state) => state.doctorSignin);

  const {
    loading: loadingDoctor,
    error: errorDoctor,
    doctorInfo,
  } = doctorSignin;

  const adminSignin = useSelector((state) => state.adminSignin);
  const {
    loading: loadingAdmin,
    error: errorAdmin,
    adminDocInfo,
  } = adminSignin;
  const [otp, setOtp] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [adminRight, setAdminRight] = useState(true);

  const dispatch = useDispatch();

  const otpHandler = (e) => {
    e.preventDefault();
    // console.log("hey");
    setShowSignin(true);
    dispatch(
      patientOtp(
        formState.inputs.emailAddress.value,
        formState.inputs.role.value
      )
    );
  };

  useEffect(() => {
    document.getElementById("element").style.display = "none";
    document.getElementById("elements").style.display = "none";
  }, []);
  useEffect(() => {
    if (success) {
      document.getElementById("element").style.display = "block";
      document.getElementById("elements").style.display = "block";
      dispatch({ type: SENDOTP_RESET });
    }
  }, [success]);
  const roleOptions = [
    { value: "Please Select a Role" },
    { value: "Admin" },
    { value: "Doctor" },
    { value: "Patient" },
  ];

  // { value: "Junior Doctor" },
  // { value: "Dietitian" },

  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const [user] = useAuthState(auth);
  // console.log(user, "user");

  const handleUserSelect = (userId, userToken) => {
    // Store selected userId and userToken in localStorage
    // localStorage.setItem("patientInfo", JSON.stringify(userId));
    // localStorage.setItem("selectedUserToken", userToken);

    const patientInfo = {
      activeUser: "patient",
      user: userId,
      token: userToken,
    };

    // Store the object in localStorage as JSON
    localStorage.setItem("activeUser", "patient");
    localStorage.setItem("patientInfo", JSON.stringify(patientInfo));
    dispatch(patientStore(patientInfo));

    // Redirect to the dashboard or perform other actions as needed
    // navigate("/userrole/:roleid/dashboard/"); // Replace with the correct dashboard route
    navigate("/userrole/:roleid/dashboard/patient/mydata/");
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      emailAddress: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      role: {
        value: "",
        isValid: false,
      },
      element: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const isDoctorOrDietitian = ["Doctor", "Dietitian", "Junior Doctor"].includes(
    formState?.inputs?.role?.value
  );

  // useEffect(() => {
  //   if (formState?.inputs?.role.value) {
  //     // console.log("success");
  //     setRight(false);
  //   } else {
  //     // console.log("failure");
  //   }
  // }, [formState?.inputs?.role]);

  const loggedHandler = () => {
    if (!isLogged) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.emailAddress.isValid &&
          formState.inputs.password.isValid
      );
      navigate("/userrole/:roleid/dashboard/doctor/");
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
      navigate("/userrole/:roleid/dashboard/doctor/");
    }
    setIsLogged((prevLogg) => !prevLogg);
  };

  const signOut = () => {
    signOut(auth);
  };

  const submitOtp = (e) => {
    e.preventDefault();
    dispatch(
      patientLogin(
        formState.inputs.emailAddress.value,
        formState.inputs.role.value,
        formState.inputs.element.value
      )
    );
  };
  const handleChange = (otp) => setOtp({ otp });

  useEffect(() => {
    // if(formState.inputs.role.value === 'admin' && adminDocInfo){
    //   navigate('/Admin/dashboard/')
    // }
    if (formState.inputs.role.value === "Admin" && adminDocInfo) {
      localStorage.setItem("activeUser", "admin");
      navigate("/Admin/dashboard/");
    }
  }, [formState, adminDocInfo]);

  useEffect(() => {
    // console.log(formState.inputs.role,'patinetinfo');

    if (isDoctorOrDietitian && doctorInfo?.user) {
      // console.log(doctorInfo,'yess');
      // localStorage.setItem("activeUser", "doctor");
      navigate("/userrole/:roleid/dashboard/doctor/");
    } else if (formState.inputs.role.value === "Patient" && patientInfo) {
      localStorage.setItem("activeUser", "patient");
      localStorage.setItem("patientInfos", JSON.stringify(patientInfo));
      navigate("/userrole/selectUser/");
    }
  }, [doctorInfo, patientInfo]);

  const testPatientLoginHandler = () => {
    navigate("/userrole/:roleid/dashboard/patient/mydata/");
  };

  const loginAdmin = (e) => {
    e.preventDefault();
    const user = "admin";
    dispatch(
      adminLogin(
        formState.inputs.emailAddress.value,
        formState.inputs.password.value,
        user
      )
    );
    // console.log('heyyyy');
  };

  return (
    <>
      <form className="login__Form-Box" onSubmit={loginAdmin}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="login__Form-Input">
          <div>
            <Select
              element="select"
              id="role"
              label="Select Role"
              options={roleOptions}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Select Role"
              onInput={inputHandler}
            />
          </div>

          {formState.inputs.role.value ? (
            <div>
              <InputLog
                element="input"
                id="emailAddress"
                type="email"
                label="Email Address"
                placeholder="Enter Email Address"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please Enter Valid Email Address"
                onInput={inputHandler}
                // disabled={right}
              />
            </div>
          ) : (
            ""
          )}

          <div className="patient-otp">
            <InputLog
              element="input"
              id="element"
              // type="password"
              label="otp"
              placeholder="Enter OTP"
              validators={[VALIDATOR_MINLENGTH(6)]}
              onInput={inputHandler}
            />
          </div>

          {isDoctorOrDietitian ? (
            <div className="generate-otp">
              {formState.inputs.emailAddress.isValid && (
                <button
                  // type="submit"
                  onClick={otpHandler}
                  className="group login__Button--Container-Btn"
                >
                  <span className="login__Button--Container-BtnSpan"></span>
                  Generate OTP
                </button>
              )}
            </div>
          ) : formState.inputs.role.value === "Patient" ? (
            <div className="generate-otp">
              {/* {console.log(formState)} */}
              {formState.inputs.emailAddress.isValid && (
                <button
                  onClick={otpHandler}
                  // type="submit"
                  className="group login__Button--Container-Btn"
                >
                  <span className="login__Button--Container-BtnSpan"></span>
                  Generate OTP
                </button>
              )}
            </div>
          ) : (
            ""
          )}

          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox>{error}</MessageBox>}

          {/* {success ? ( */}
          {formState.inputs.role.value === "Admin" ? (
            <div>
              <InputLog
                element="input"
                id="password"
                type="password"
                label="Password"
                placeholder="Enter Password"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="Please Enter Valid Password"
                onInput={inputHandler}
              />
            </div>
          ) : (
            ""
          )}

          {/* ):''} */}
        </div>
        {formState.inputs.role.value === "Admin" ? (
          <div>
            <button
              type="submit"
              className="group login__Button--Container-Btn"
              disabled={
                !formState.inputs.emailAddress.value ||
                !formState.inputs.password.value
              }
            >
              <span className="login__Button--Container-BtnSpan"></span>
              Sign in admin
            </button>
          </div>
        ) : (
          ""
        )}
        {formState.inputs.role.value !== "Admin" ? (
          <div id="elements">
            {showSignin && (
              <>
                {" "}
                <button
                  onClick={submitOtp}
                  className="group login__Button--Container-Btn"
                >
                  <span className="login__Button--Container-BtnSpan"></span>
                  Sign in
                </button>
                {/* adding msg */}
                {patientInfo?.error && doctorSignin?.error ? (
                  <div>
                    <p className="login__Form-Input--Error">
                      {doctorSignin?.error}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        ) : (
          ""
        )}

        {/* } */}
        {/* <div className="login__Divider--Box">
          <p className="login__Divider--Text">Or</p>
        </div> */}
      </form>

      {user ? (
        <div>
          {user !== null && (
            <button onClick={() => auth.signOut()}>Signout</button>
          )}
        </div>
      ) : (
        <div>
          {/* <button
            type="submit"
            className="group login__Social--Btn"
            onClick={googleSignIn}
          >
            <span className="login__Social--Span">
              <FaGoogle
                className="login__Social--Span-Icon"
                aria-hidden="true"
              />
            </span>
            Sign in with Google
          </button> */}
        </div>
      )}
    </>
  );
};

export default LoginForm;
