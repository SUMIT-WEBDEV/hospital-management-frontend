import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stepper } from "react-form-stepper";
import Navbar from "../../../user/shared/Navbar";

import Input from "../../../Components/Input";
import Select from "../../../Components/Select";
import Selects from "react-select";
import AsyncSelect from "react-select/async";
import { useForm } from "../../../hooks/form-hooks";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../utils/validators";
import { useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../../action/AdminAction";
import { Url } from "../../../constant.js/PatientConstant";
import axios from "axios";

const PatientHealthInfo = () => {
  const initialEndingDate = new Date().setMonth(11);
  const [primaryTeam, setPrimaryTeam] = useState([]);
  const [secondaryTeam, setSecondaryTeam] = useState([]);
  const [healthName, setHealthName] = useState("");

  const [dateValue, setDateValue] = useState(); // value for start and end date

  const valueOfDate = {
    // startDate: new Date(),
    // endDate: new Date(initialEndingDate).toISOString(),
    healthName: healthName,
    startDate: new Date()?.toISOString()?.substring(0, 10),
    endDate: dateValue ? dateValue.substring(0, 10) : "",
  };

  console.log("value of date", valueOfDate);
  console.log("value of date", dateValue);

  const customStyles = {
    menuPortal: (base) => ({
      ...base,
      zIndex: 1000,
    }),
  };
  // const handleValueChange = (newValue) => {
  //   console.log("newValue:", newValue);
  //   setValue({
  //     startDate: new Date(newValue.startDate).toISOString(),
  //     endDate: new Date(newValue.endDate).toISOString(),
  //   });
  // };
  // const [planDate, setPlanDate] = useState("");
  const [options, setOptions] = useState([""]);
  const location = useLocation();
  const { phone, name, email, dob, gender, profileImage, age } = location.state;
  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;
  const [healthPlanOptions, setHealthPlanOptions] = useState([]);
  const [optionsError, setOptionsError] = useState(null);

  const doctorSignin = useSelector((state) => state.doctorSignin);
  const { doctorInfo } = doctorSignin;
  const handlePrimaryTeamChange = (selectedOptions) => {
    setPrimaryTeam(selectedOptions);
    // console.log("selectedOptions", selectedOptions);
  };

  const handleSecondaryTeamChange = (selectedOptions) => {
    setSecondaryTeam(selectedOptions);
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      height: {
        value: "",
        isValid: false,
      },
      weight: {
        value: "",
        isValid: false,
      },
      caretakerName: {
        value: "",
        isValid: false,
      },
      relation: {
        value: "",
        isValid: false,
      },
      caretakerNumber: {
        value: "",
        isValid: false,
      },
      caretakerTime: {
        value: "",
        isValid: false,
      },
      healthPlan: {
        value: "",
        isValid: false,
      },
      // planDate: {
      //   value: value,
      //   isValid: false,
      // },
    },
    false
  );
  async function fetchData() {
    try {
      const response = await fetch(`${Url}/health-plan`, {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setHealthPlanOptions([
        {
          value: "Please Select Health Plan",
          label: "Please Select Health Plan",
        },
        ...json?.data.flatMap((opt) => ({
          id: opt._id,
          value: opt.name,
          duration: opt.duration,
        })),
      ]);
    } catch (err) {
      setOptionsError(err.message);
    }
  }

  console.log("healthPlanOptions------------->", healthPlanOptions);

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("----->", healthPlanOptions);
  const relationOptions = [
    { value: "Please Select Caretaker Relation" },
    { value: "Father" },
    { value: "Mother" },
    { value: "Brother" },
    { value: "Sister" },
    { value: "Son" },
    { value: "Daughter" },
    { value: "Son-In-Law" },
    { value: "Daughter-In-Law" },
    { value: "Spouse" },
  ];

  let navigate = useNavigate();

  const nextStep = (e) => {
    e.preventDefault();
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
        height: {
          value: "",
          isValid: false,
        },
        weight: {
          value: "",
          isValid: false,
        },
        caretakerName: {
          value: "",
          isValid: false,
        },
        relation: {
          value: "",
          isValid: false,
        },
        caretakerNumber: {
          value: "",
          isValid: false,
        },
        caretakerTime: {
          value: "",
          isValid: false,
        },
        healthPlan: {
          value: "",
          isValid: false,
        },
        // planDate: {
        //   value: value,
        //   isValid: false,
        // },
      },
      false
    );

    const height = formState.inputs.height.value;
    const weight = formState.inputs.weight.value;
    const caretakerName = formState.inputs.caretakerName.value;
    const relation = formState.inputs.relation.value;
    const caretakerNumber = formState.inputs.caretakerNumber.value;
    const caretakerTime = formState.inputs.caretakerTime.value;
    const healthPlan = formState.inputs.healthPlan.value;
    const planDate = valueOfDate;

    console.log("planDate--------------------------------------", planDate);

    console.log("----", formState, formState.inputs);
    navigate("/userrole/:roleid/dashboard/doctor/enrol/personalinfo/", {
      state: {
        phone,
        name,
        email,
        dob,
        profileImage,
        age,
        gender,
        height,
        weight,
        caretakerName,
        relation,
        caretakerNumber,
        caretakerTime,
        healthPlan,
        planDate,
        primaryTeam,
        secondaryTeam,
        healthName,
      },
    });
    window.location.reload(true);
  };

  useEffect(() => {
    // Perform dynamic calculation here based on the selected health plan
    // and update the date value accordingly
    const selectedPlan = formState.inputs.healthPlan.value;

    const selectedName = healthPlanOptions.find(
      (op) => op.id === selectedPlan
    )?.value;

    const selectedDuration = healthPlanOptions.find(
      (option) => option.id === selectedPlan
    )?.duration;

    // console.log()
    setHealthName(selectedName);

    console.log("name is ", selectedName);
    console.log("selectedPlan is ", selectedPlan);
    console.log("duration is ", selectedDuration);

    if (selectedDuration) {
      const currentDate = new Date();
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + selectedDuration);

      // console.log("newDewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwewewate", newDate);

      // Update the value of the date field
      setDateValue(newDate.toISOString());
    } else {
      setDateValue(""); // Reset the date value if no health plan is selected
    }
  }, [formState.inputs.healthPlan.value, healthPlanOptions]);

  console.log("dateValue is", dateValue);

  const dispatch = useDispatch();
  useEffect(() => {
    const user = "doctor";
    dispatch(getAllDoctors(user));
  }, []);

  const fetchUsers = () => {
    return axios
      .get(`${Url}/doctors/get-all`, {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
        },
      })
      .then(function (response) {
        const res = response.data.data;

        // Filter out doctors with status "De-Active"
        const filteredUsers = res.filter((user) => user.status !== "De-Active");
        console.log("fiteredUsers ==>", filteredUsers);
        return filteredUsers;
      });
  };

  console.log("formstate", formState);

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
                  { label: "CreatePatient" },
                  { label: "PatientHealthInfo" },
                  { label: "PatientPersonalInfo" },
                ]}
                activeStep={1}
              />
              <div className="dashboard__Grid-Box">
                <div className="dashboard__Grid-Cols">
                  <form onSubmit={nextStep}>
                    <div className="form__Box-Shadow">
                      <div className="form__Box-Space">
                        <div className="form__Grid--Cols-6">
                          <div className="form__Cols--Span-6">
                            {/*
                            <label
                              htmlFor="height"
                              className="form__Label-Heading"
                            >
                              Patient Height
                            </label>
                            <input
                              required
                              onChange={(e) => setHeight(e.target.value)}
                              type="text"
                              name="height"
                              id="hight"
                              autoComplete="given-name"
                              className="form__Input"
                            />
                            */}
                            <Input
                              element="input"
                              type="number"
                              min="0"
                              label="Patient Height"
                              id="height"
                              placeholder="Patient Height"
                              validators={[VALIDATOR_MINLENGTH(1)]}
                              errorText="Please Enter Valid Number"
                              onInput={inputHandler}
                            />
                          </div>
                          <div className="form__Cols--Span-6">
                            <Input
                              element="input"
                              type="number"
                              min="0"
                              label="Patient Weight"
                              id="weight"
                              placeholder="Patient Weight"
                              validators={[VALIDATOR_MINLENGTH(1)]}
                              errorText="Please Enter Name"
                              onInput={inputHandler}
                            />
                          </div>
                          <div className="form__Cols--Span-6">
                            {/*
                            <label
                              htmlFor="caretaker-name"
                              className="form__Label-Heading"
                            >
                              Caretakers Full Name
                            </label>
                            <input
                              required
                              onChange={(e) => setCaretakerName(e.target.value)}
                              type="text"
                              name="caretaker-name"
                              id="caretaker-name"
                              autoComplete="given-name"
                              className="form__Input"
                            />
                            */}
                            <Input
                              element="input"
                              type="text"
                              label="Caretakers Full Name"
                              id="caretakerName"
                              placeholder="Caretakers Full Name"
                              validators={[VALIDATOR_MINLENGTH(1)]}
                              errorText="Please Enter Valid Name"
                              onInput={inputHandler}
                            />
                          </div>
                          <div className="form__Cols--Span-6">
                            <Select
                              element="select"
                              id="relation"
                              label="Select Relation"
                              options={relationOptions}
                              validators={[VALIDATOR_REQUIRE()]}
                              errorText="Please Select Your Relationship"
                              onInput={inputHandler}
                            />
                          </div>
                          <div className="form__Cols--Span-6">
                            <Input
                              element="input"
                              type="number"
                              label="Caretakers Number"
                              id="caretakerNumber"
                              placeholder="Caretakers Number"
                              validators={[VALIDATOR_MINLENGTH(10)]}
                              errorText="Please Enter Valid Number"
                              onInput={inputHandler}
                            />
                          </div>
                          <div className="form__Cols--Span-6">
                            <Input
                              element="input"
                              type="time"
                              label="Caretakers Preferred Time"
                              id="caretakerTime"
                              placeholder="Caretakers Preferred Time"
                              validators={[VALIDATOR_MINLENGTH(1)]}
                              errorText="Please Select Valid Time"
                              onInput={inputHandler}
                            />
                          </div>
                          <div className="form__Cols--Span-6">
                            <>
                              <label>Select Primary Health Team</label>
                              <AsyncSelect
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                cacheOptions
                                defaultOptions
                                getOptionLabel={(e) => e.name}
                                getOptionValue={(e) => e._id}
                                loadOptions={fetchUsers}
                                onChange={handlePrimaryTeamChange}
                                isMulti
                              />
                            </>
                          </div>

                          <div className="form__Cols--Span-6">
                            <>
                              <label>Select Secondary Health Team</label>
                              <AsyncSelect
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                cacheOptions
                                defaultOptions
                                getOptionLabel={(e) => e.name}
                                getOptionValue={(e) => e._id}
                                loadOptions={fetchUsers}
                                onChange={handleSecondaryTeamChange}
                                isMulti
                              />
                            </>
                          </div>
                          <div className="form__Cols--Span-6">
                            <Select
                              element="select"
                              id="healthPlan"
                              label="Select Health Plan"
                              options={healthPlanOptions}
                              healthPlanOptions={healthPlanOptions}
                              validators={[VALIDATOR_REQUIRE()]}
                              errorText="Please Select Health Plan"
                              onInput={inputHandler}
                            />
                          </div>

                          <div className="form__Cols--Span-6">
                            {/* <Input
                              element="datepicker"
                              type="time"
                              label="Health Plan Date (Start + End)"
                              id="planDate"
                              placeholder="Health Plan Date (Start + End)"
                              validators={[VALIDATOR_REQUIRE()]}
                              errorText="Please Select Valid Dates"
                              onInput={inputHandler}
                              value={value}
                              // value={dateValue}
                            /> */}

                            <label className="form__Label-Heading">
                              Health Plan Date (Start + End)
                            </label>

                            <input
                              // type="input"
                              type="text"
                              className="form__Input"
                              // label="Health Plan Date (Start + End)"
                              // id="planDate"
                              // placeholder="Health Plan Date (Start + End)"
                              // validators={[VALIDATOR_MINLENGTH(1)]}
                              // errorText="Please Select Valid Dates"
                              // onInput={inputHandler}
                              // name="planDate"
                              value={
                                valueOfDate.endDate
                                  ? `${valueOfDate.startDate} - ${valueOfDate.endDate}`
                                  : ""
                              }
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form__Btn-Bg">
                        <div className="text-right">
                          <button type="submit" className="form__Btn-Submit">
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
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

export default PatientHealthInfo;
