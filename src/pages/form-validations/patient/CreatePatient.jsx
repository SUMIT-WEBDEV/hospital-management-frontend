import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper } from "react-form-stepper";
import Navbar from "../../../user/shared/Navbar";

import Input from "../../../Components/Input";
import Select from "../../../Components/Select";
import { useForm } from "../../../hooks/form-hooks";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../utils/validators";
import moment from "moment/moment";

const CreatePatient = () => {
  // const [phone, setPhone] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [dob, setDob] = useState("");
  // const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [currStepper, setCurrStepper] = useState(0);
  const genderOptions = [
    { value: "Please Select a Gender" },
    { value: "Male" },
    { value: "Female" },
  ];

  let navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      phone: {
        value: "",
        isValid: false,
      },
      age: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      dob: {
        value: "",
        isValid: false,
      },
      gender: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  console.log("FormState--->", formState);

  useEffect(() => {
    // const myAge = moment().diff(formState.inputs.dob.value, "years");
    const parseToday = new Date().toLocaleDateString();
    const today = parseToday.split("/").toString("-");

    console.log(
      "new today ==>",
      moment().diff(formState.inputs.dob.value, "days").toString()
    );

    if (moment().diff(formState.inputs.dob.value, "days").toString() == "NaN") {
      setFormData(
        {
          ...formState.inputs,
          age: {
            value: "",
            isValid: true,
          },
        },
        false
      );
    } else if (moment().diff(formState.inputs.dob.value, "days") < 31) {
      setFormData(
        {
          ...formState.inputs,
          age: {
            value: `${moment().diff(formState.inputs.dob.value, "days")}  ${
              moment().diff(formState.inputs.dob.value, "days") > 1
                ? "days"
                : "day"
            }`,
            isValid: true,
          },
        },
        false
      );
    } else if (
      moment().diff(formState.inputs.dob.value, "days") > 30 &&
      moment().diff(formState.inputs.dob.value, "days") < 366
    ) {
      setFormData(
        {
          ...formState.inputs,
          age: {
            value: `${moment().diff(formState.inputs.dob.value, "months")}  ${
              moment().diff(formState.inputs.dob.value, "months") > 1
                ? "months"
                : "month"
            }`,
            isValid: true,
          },
        },
        false
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          age: {
            value: `${moment().diff(formState.inputs.dob.value, "years")}  ${
              moment().diff(formState.inputs.dob.value, "years") > 1
                ? "years"
                : "month"
            }`,
            isValid: true,
          },
        },
        false
      );
    }

    console.log("setFormData--->", formState);
  }, [formState.inputs.dob]);

  const nextStep = (e) => {
    console.log("nextStep");
    e.preventDefault();

    // Check if all inputs are valid
    const isAllValid = Object.values(formState.inputs).every(
      (input) => input.isValid
    );

    if (!isAllValid) {
      alert("Please fill all the fields.");
      return;
    }

    setFormData(
      {
        ...formState.inputs,
        phone: {
          value: "",
          isValid: false,
        },
        age: {
          value: "",
          isValid: true,
        },
        name: {
          value: "",
          isValid: false,
        },
        email: {
          value: "",
          isValid: false,
        },
        dob: {
          value: "",
          isValid: false,
        },
        gender: {
          value: "",
          isValid: false,
        },
      },
      false
    );

    const name = formState.inputs.name.value;
    const age = formState.inputs.age.value;
    const phone = formState.inputs.phone.value;
    const email = formState.inputs.email.value;
    const dob = formState.inputs.dob.value;
    const gender = formState.inputs.gender.value;

    navigate("/userrole/:roleid/dashboard/doctor/enrol/healthinfo/", {
      state: { name, phone, email, dob, gender, profileImage, age },
    });
    // current stepper state
    setCurrStepper(0);
    window.location.reload(true);
  };

  function handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([reader.result], {
        type: file.type,
      });
      const finalFile = new File([blob], file.name);
      setProfileImage(finalFile);
    };
    reader.readAsArrayBuffer(file);
  }
  return (
    <>
      <div className="dashboard__Container">
        <Navbar />
        <main>
          <div className="dashboard__Main-Content">
            {/* Replace with your content */}
            <div className="dashboard__Main-Inner-Content">
              <Stepper
                steps={[
                  { label: "Create Patient" },
                  { label: "Patient Health Info" },
                  { label: "Patient Personal Info" },
                ]}
                activeStep={0}
              />
              <div>
                <div className="dashboard__Grid-Box">
                  <div className="dashboard__Grid-Cols">
                    <form onSubmit={nextStep}>
                      <div className="form__Box-Shadow">
                        <div className="form__Box-Space">
                          <div className="form__Grid--Cols-2">
                            <div className="form__Cols--Span-2">
                              <label className="form__Label-Heading">
                                Photo
                              </label>
                              <div className="form__Flex-ImgBox">
                                <span className="form__Flex-SpanBox">
                                  <svg
                                    className="form__Flex-Svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                  </svg>
                                </span>
                                <input
                                  type="file"
                                  name="appointment-date"
                                  id="appointment-date"
                                  autoComplete="given-name"
                                  className="form__Input"
                                  onChange={handleFileChange}
                                />{" "}
                                {/* <button
                                  type="button"
                                  className="form__Flex-Btn"
                                >
                                  Change
                                </button> */}
                              </div>
                            </div>
                          </div>
                          <div className="form__Grid--Cols-6">
                            <div className="form__Cols--Span-6">
                              {/*
                              <label
                                htmlFor="phone"
                                className="form__Label-Heading"
                              >
                                Patient Phone Number
                              </label>
                              <input
                                onChange={(e) => setNumber(e.target.value)}
                                type="tel"
                                name="phone"
                                required
                                id="phone"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                              */}
                              <Input
                                element="inputNumber"
                                type="number"
                                min="10"
                                label="Patient Phone Number"
                                id="phone"
                                placeholder="Enter Phone Number"
                                validators={[VALIDATOR_MINLENGTH(10)]}
                                errorText="Please Enter Valid Phone Number"
                                onInput={inputHandler}
                                // maxlength="10"
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              {/*
                              <label
                                htmlFor="full-name"
                                className="form__Label-Heading"
                              >
                                Patient Full Name
                              </label>
                              <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                required
                                name="full-name"
                                id="full-name"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                              */}
                              <Input
                                element="input"
                                type="text"
                                label="Patient Full Name"
                                id="name"
                                placeholder="Patient Full Name"
                                validators={[VALIDATOR_MINLENGTH(1)]}
                                errorText="Please Enter Your Name"
                                onInput={inputHandler}
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              {/*
                              <label
                                htmlFor="email"
                                className="form__Label-Heading"
                              >
                                Patient Email
                              </label>
                              <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="mail"
                                required
                                id="mail"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                              */}
                              <Input
                                element="input"
                                type="email"
                                label="Patient Email"
                                id="email"
                                placeholder="Patient Email"
                                validators={[VALIDATOR_MINLENGTH(1)]}
                                errorText="Please Enter Valid Email Address"
                                onInput={inputHandler}
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              {/*
                              <label
                                htmlFor="dob"
                                className="form__Label-Heading"
                              >
                                Patient D.O.B
                              </label>
                              <input
                                onChange={(e) => setDob(e.target.value)}
                                type="date"
                                name="dob"
                                required
                                id="dob"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                              */}
                              <Input
                                element="input"
                                type="date"
                                label="Patient D.O.B"
                                id="dob"
                                max={moment().format("YYYY-MM-DD")}
                                placeholder="Patient D.O.B"
                                validators={[VALIDATOR_MINLENGTH(1)]}
                                errorText="Please Select Valid D.O.B"
                                onInput={inputHandler}
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              {/*
                              <label
                                htmlFor="gender"
                                className="form__Label-Heading"
                              >
                                Patient Gender
                              </label>
                              <select
                                onChange={(e) => setGender(e.target.value)}
                                id="gender"
                                name="gender"
                                required
                                autoComplete="gender-name"
                                className="form__Select"
                              >
                                <option>Select Patient Gender</option>
                                <option value="male">Male</option>
                                <option value="fe-male">Fe-Male</option>
                                <option value="other">Other</option>
                              </select>
                              */}
                              <Select
                                element="select"
                                id="gender"
                                label="Select Gender"
                                options={genderOptions}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please Select Gender"
                                onInput={inputHandler}
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              <label htmlFor="">Patient Age</label>
                              <input
                                id="age"
                                type="text"
                                className="form__Input phone-no"
                                value={formState.inputs.age.value}
                                placeholder="patient age"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form__Btn-Bg">
                          <a href="/home">
                            <button type="submit" className="form__Btn-Submit">
                              Save
                            </button>
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
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

export default CreatePatient;
