import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadDietCharts } from "../../../action/DoctorAction";
import { UPLOAD_DIET_CHART_RESET } from "../../../constant.js/DoctorConstant";
import Navbar from "../../../user/shared/Navbar";
import Swal from "sweetalert2";

const UploadDietChart = () => {
  const [calorieLow, setCalorieLow] = useState();
  const [caloireHigh, setCaloireHigh] = useState();
  const [chRangeL, setChRangeL] = useState();
  const [chRangeU, setChRangeU] = useState();
  const [protien, setProtien] = useState();
  const [fat, setFat] = useState();
  const [foodType, setFoodType] = useState("");
  const [cusineType, setCusineType] = useState("");
  const [dietChart, setDietChart] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const dietChartUpload = useSelector((state) => state.dietChartUpload);
  const { loading, error, success } = dietChartUpload;
  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submitHandler");
    dispatch(
      uploadDietCharts(
        calorieLow,
        caloireHigh,
        chRangeL,
        chRangeU,
        protien,
        fat,
        foodType,
        cusineType,
        dietChart
      )
    );
    //
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: UPLOAD_DIET_CHART_RESET });
      Swal.fire({
        icon: "success",
        text: "Diet Chart created succesfully",
      });

      navigate("/userrole/:roleid/dashboard/doctor/");
    }
  }, [success]);
  function handleFileChange(event) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([reader.result], {
        type: file.type,
      });
      const finalFile = new File([blob], file.name);
      setDietChart(finalFile);
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
              <div>
                <div className="dashboard__Grid-Box">
                  <div className="dashboard__Grid-Cols">
                    <form onSubmit={submitHandler}>
                      <div className="form__Box-Shadow">
                        <div className="form__Box-Space">
                          <div className="form__Grid--Cols-6">
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="calories-low-value"
                                className="form__Label-Heading"
                              >
                                Calories Range (Lower Value)
                              </label>
                              <input
                                onChange={(e) => setCalorieLow(e.target.value)}
                                required
                                type="number"
                                name="calories-low-value"
                                id="calories-low-value"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="calories-high-value"
                                className="form__Label-Heading"
                              >
                                Calories Range (Upper Value)
                              </label>
                              <input
                                onChange={(e) => setCaloireHigh(e.target.value)}
                                required
                                type="number"
                                name="calories-high-value"
                                id="calories-high-value"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="carbohydrates-low-value"
                                className="form__Label-Heading"
                              >
                                Carbohydrates Range (Lower Value)
                              </label>
                              <input
                                onChange={(e) => setChRangeL(e.target.value)}
                                required
                                type="number"
                                name="carbohydrates-low-value"
                                id="carbohydrates-low-value"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="carbohydrates-high-value"
                                className="form__Label-Heading"
                              >
                                Carbohydrates Range (Upper Value)
                              </label>
                              <input
                                onChange={(e) => setChRangeU(e.target.value)}
                                required
                                type="number"
                                name="carbohydrates-high-value"
                                id="carbohydrates-high-value"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="protiens"
                                className="form__Label-Heading"
                              >
                                Protiens
                              </label>
                              <input
                                onChange={(e) => setProtien(e.target.value)}
                                required
                                type="text"
                                name="protiens"
                                id="protiens"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="fats"
                                className="form__Label-Heading"
                              >
                                Fats
                              </label>
                              <input
                                onChange={(e) => setFat(e.target.value)}
                                required
                                type="text"
                                name="fats"
                                id="protiens"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="food-type"
                                className="form__Label-Heading"
                              >
                                Select Food Type
                              </label>
                              <select
                                onChange={(e) => setFoodType(e.target.value)}
                                required
                                id="food-type"
                                name="food-type"
                                autoComplete="food-type-name"
                                className="form__Select"
                              >
                                <option>Select Food Type</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="non-veg">Non-Vegetarian</option>
                                <option value="egtarian">Eggtarian</option>
                              </select>
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="cuisine-type"
                                className="form__Label-Heading"
                              >
                                Select Cuisine Type
                              </label>
                              {/* <select
                                onChange={(e) => setCusineType(e.target.value)}
                                required
                                id="cuisine-type"
                                name="cuisine-type"
                                autoComplete="cuisine-type-name"
                                className="form__Select"
                              >
                                <option>Select Cuisine Type</option>
                                <option value="cusine A">Cuisine A</option>
                                <option value="cusine B">Cuisine B</option>
                              </select> */}
                              <input
                                onChange={(e) => setCusineType(e.target.value)}
                                required
                                type="text"
                                id="cuisine-type"
                                name="cuisine-type"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                            </div>
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="dietchart"
                                className="form__Label-Heading"
                              >
                                Select Diet Chart File
                              </label>
                              <input
                                onChange={handleFileChange}
                                type="file"
                                name="dietchart"
                                id="dietchart"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form__Btn-Bg">
                          <button
                            // onClick={nextStep}
                            type="submit"
                            className="form__Btn-Submit"
                          >
                            Save
                          </button>
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

export default UploadDietChart;
