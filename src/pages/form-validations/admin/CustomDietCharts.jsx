import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  activateDtChart,
  deactivateDtChart,
  getAllDietChart,
} from "../../../action/AdminAction";
import { getLatesDietChart } from "../../../action/PatientAction";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import {
  ACTIVATE_DTCHART_RESET,
  DEACTIVATE_DTCHART_RESET,
} from "../../../constant.js/AdminConstant";
import Papa from "papaparse";
import { truncate } from "../../../constant.js/Constant";
import UserImg from "../../../Assets/user/user.jpg";

const CustomDietCharts = () => {
  const dispatch = useDispatch();
  const [filterDatas, setFilterDatas] = useState([]);
  const [show, setShow] = useState(false);
  const getFomrsList = useSelector((state) => state.patientFormList);
  const { loading, error, forms } = getFomrsList;

  //filters
  const [calorieFilter, setCalorieFilter] = useState({
    lower_value: "0-100000",
    upper_value: "0-100000",
  });
  console.log("calorieFilter ===>", calorieFilter);

  const [carbohydratesFilter, setCarbohydratesFilter] = useState({
    lower_value: "0-100000",
    upper_value: "0-100000",
  });
  console.log("carbohydratesFilter ===>", carbohydratesFilter);

  const [protiensFilter, setProtiensFilter] = useState({
    range: "0-100000",
  });
  console.log("protiensFilter ===>", protiensFilter);

  const [fatFilter, setFatFilter] = useState({
    range: "0-100000",
  });
  console.log("fatFilter ===>", fatFilter);

  const deitChartList = useSelector((state) => state.deitChartList);
  const { loading: loadingDiet, error: errorDiet, dietchart } = deitChartList;
  const [myDietChart, setMyDietChart] = useState(dietchart);

  console.info("dietchart-->", dietchart);
  console.info("myDietChart-->", myDietChart);

  // console.log("dietchart--->", dietchart);

  const latestDietChart = useSelector((state) => state.latestDietChart);

  const handleFilterDietCharts = () => {
    var myFilterDietChart = dietchart.filter((dChart) => {
      if (true) {
        return (
          dChart.calorie_lower >= calorieFilter.lower_value.split("-")[0] &&
          dChart.calorie_lower <= calorieFilter.lower_value.split("-")[1] &&
          dChart.calorie_upper >= calorieFilter.upper_value.split("-")[0] &&
          dChart.calorie_upper <= calorieFilter.upper_value.split("-")[1] &&
          dChart.ch_lower >= carbohydratesFilter.lower_value.split("-")[0] &&
          dChart.ch_lower <= carbohydratesFilter.lower_value.split("-")[1] &&
          dChart.ch_upper >= carbohydratesFilter.upper_value.split("-")[0] &&
          dChart.ch_upper <= carbohydratesFilter.upper_value.split("-")[1] &&
          dChart.protiens >= protiensFilter.range.split("-")[0] &&
          dChart.protiens <= protiensFilter.range.split("-")[1] &&
          dChart.fats >= fatFilter.range.split("-")[0] &&
          dChart.fats <= fatFilter.range.split("-")[1] &&
          true
        );
      }
    });

    setMyDietChart(myFilterDietChart);
  };

  const {
    loading: LoadingDietLatest,
    error: errorDietLatest,
    deitChartLatest,
  } = latestDietChart;

  const activateDtChartVariables = useSelector(
    (state) => state.activateDtChart
  );
  const {
    loading: loadingChartAc,
    error: errorChartAc,
    success: successChartAc,
  } = activateDtChartVariables;
  const deactivateDtChartVariables = useSelector(
    (state) => state.deactivateDtChart
  );
  const {
    loading: loadingChartDe,
    error: errorChartDe,
    success: successChartDe,
  } = deactivateDtChartVariables;

  // const truncate = (str, n) => {
  //   return str?.length > n ? str.substr(0, n - 1) : str;
  // };

  // useEffect(() => {}, [handleFilterDietCharts]);

  useEffect(() => {
    setMyDietChart(dietchart);
  }, [dietchart]);

  useEffect(() => {
    dispatch(getAllDietChart());
    dispatch(getLatesDietChart());
    if (successChartAc) {
      dispatch({ type: ACTIVATE_DTCHART_RESET });
      Swal.fire({
        icon: "success",
        text: "activated successfully",
      });
    }
    if (successChartDe) {
      dispatch({ type: DEACTIVATE_DTCHART_RESET });
      Swal.fire({
        icon: "success",
        text: "deactivated successfully",
      });
    }
  }, [successChartDe, successChartAc]);

  const acttivateDietCharts = (state, id) => {
    if (state === "Active") {
      Swal.fire({
        title: "Do you want to deactivet diet Chart?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(deactivateDtChart(id));
          // Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else if (state === "De-Active") {
      Swal.fire({
        title: "Do you want to activate diet chart?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(activateDtChart(id));
          // Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  const filterData = (id) => {
    // console.log(id);

    const filterdData = dietchart.filter((e) => e._id === id);
    // console.log(filterdData[0]);
    setFilterDatas([
      {
        ...filterdData[0],
        file: UserImg,
      },
    ]);
    setShow(true);
  };

  // console.log("filterDatas==>", filterDatas);

  const downloadDietChartCsv = () => {
    const flattenedData = {
      ...filterDatas[0],
      doctorName: filterDatas[0].doctorId.name,
      doctorEmail: filterDatas[0].doctorId.email,
      doctorId: filterDatas[0].doctorId._id,
    };
    delete flattenedData.__v;
    const csvData = Papa.unparse([flattenedData]);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    // Create a temporary anchor element to download the CSV file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filterDatas[0]?.doctorId.name}-diectchart.csv`;
    link.click();
  };

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-start pb-4 mr-6 text-xl font-medium leading-6 text-gray-900">
          Search By
        </h2>
        <div className=" grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
          <div className="col-span-2 ">
            Calories Range
            <div className="flex gap-1">
              <select
                id="lower-value"
                name="lower-value"
                onClick={(e) =>
                  setCalorieFilter({
                    ...calorieFilter,
                    lower_value: e.target.value,
                  })
                }
                className="form__Select flex-1"
                autoComplete="lower-value"
                // value={calorieFilter.upper_value}
              >
                <option value="0-100000"> Lower Value</option>
                <option value="0-10"> Under 10</option>
                <option value="10-50"> 10 to 50 </option>
                <option value="50-100"> 50 to 100 </option>
                <option value="100-100000"> 100 & Above </option>
              </select>
              {/* {console.info("calorieFilter-->", calorieFilter)} */}
              <select
                id="lower-value"
                name="lower-value"
                className="form__Select flex-1"
                autoComplete="lower-value"
                // value="Lower Value"
                onClick={(e) =>
                  setCalorieFilter({
                    ...calorieFilter,
                    upper_value: e.target.value,
                  })
                }
              >
                <option value="0-100000"> Upper Value</option>
                <option value="0-10"> Under 10</option>
                <option value="10-50"> 10 to 50 </option>
                <option value="50-100"> 50 to 100 </option>
                <option value="100-100000"> 100 & Above </option>
              </select>
            </div>
          </div>
          <div className="col-span-2 ">
            <div className="flex-1">
              Carbohydrates Range
              <div className="flex gap-1">
                <select
                  id="lower-value"
                  name="lower-value"
                  onClick={(e) =>
                    setCarbohydratesFilter({
                      ...carbohydratesFilter,
                      lower_value: e.target.value,
                    })
                  }
                  className="form__Select flex-1"
                  autoComplete="lower-value"
                  // value={calorieFilter.upper_value}
                >
                  <option value="0-100000"> Lower Value</option>
                  <option value="0-10"> Under 10</option>
                  <option value="10-50"> 10 to 50 </option>
                  <option value="50-100"> 50 to 100 </option>
                  <option value="100-100000"> 100 & Above </option>
                </select>
                {/* {console.info("carbohydratesFilter-->", carbohydratesFilter)} */}
                <select
                  id="lower-value"
                  name="lower-value"
                  className="form__Select flex-1"
                  autoComplete="lower-value"
                  onClick={(e) =>
                    setCarbohydratesFilter({
                      ...carbohydratesFilter,
                      upper_value: e.target.value,
                    })
                  }
                >
                  <option value="0-100000"> Upper Value</option>
                  <option value="0-10"> Under 10</option>
                  <option value="10-50"> 10 to 50 </option>
                  <option value="50-100"> 50 to 100 </option>
                  <option value="100-100000"> 100 & Above </option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            Proteins Range
            <select
              id="proteins"
              name="proteins"
              className="form__Select flex-1 "
              autoComplete="proteins"
              onClick={(e) =>
                setProtiensFilter({
                  ...protiensFilter,
                  range: e.target.value,
                })
              }
            >
              <option value="0-100000"> Select</option>
              <option value="0-10"> Under 10</option>
              <option value="10-50"> 10 to 50 </option>
              <option value="50-100"> 50 to 100 </option>
              <option value="100-100000"> 100 & Above </option>
            </select>
          </div>
          {/* {console.info("protiensFilter-->", protiensFilter)} */}
          <div className="col-span-1">
            Fats Range
            <select
              id="fat"
              name="fat"
              className="form__Select flex-1"
              autoComplete="fat"
              onClick={(e) =>
                setFatFilter({
                  ...fatFilter,
                  range: e.target.value,
                })
              }
            >
              <option value="0-100000"> Select</option>
              <option value="0-10"> Under 10</option>
              <option value="10-50"> 10 to 50 </option>
              <option value="50-100"> 50 to 100 </option>
              <option value="100-100000"> 100 & Above </option>
            </select>
          </div>
          {/* {console.info("fatFilter-->", fatFilter)} */}
          <div className="col-span-1 justify-self-start self-end">
            <button
              className="  px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg al  align-middle focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
              onClick={() => handleFilterDietCharts()}
            >
              Search
            </button>

            {/* Food Type
            <select
              id="food-type"
              name="food-type"
              className="form__Select  "
              autoComplete="food-type"
              value="Lower Value"
            >
              <option> Veg </option>
              <option> NonVeg </option>
              <option> Egg </option>
            </select> */}
          </div>
        </div>
      </div>
      <div className="my-10">
        <table className="table__Container">
          <thead className="table__Head">
            <tr>
              <th className="table__Head--Text">Sl No.</th>

              <th className="table__Head--Text">Diet Chart Name</th>
              <th className="table__Head--Text">Created By</th>
              <th className="table__Head--Text">Created Date</th>
              <th className="table__Head--Text">Access</th>
              <th className="table__Head--Text">Actions</th>
            </tr>
          </thead>
          {loadingDiet ? (
            <LoadingBox></LoadingBox>
          ) : errorDiet ? (
            <MessageBox>{error}</MessageBox>
          ) : myDietChart && myDietChart != [] ? (
            myDietChart.map((dt, index) => (
              <tbody key={dt._id}>
                <tr className="table__Body--Row">
                  <td className="table__Body--Row_Data">{index + 1}</td>
                  <td className="table__Body--Row_Data">
                    DC_{dt?.calorie_lower}-{dt?.calorie_upper}-{dt?.ch_lower}-
                    {dt?.ch_upper}-{dt?.protiens}-{dt?.fats}
                  </td>
                  <td className="table__Body--Row_Data">
                    {dt.doctorId ? dt.doctorId.name : ""}
                  </td>
                  <td className="table__Body--Row_Data">
                    {truncate(dt.createdOn, 11)}
                  </td>
                  <td className="table__Body--Row_Data">
                    <select
                      id="status"
                      name="status"
                      autoComplete="status-name"
                      className="form__Select"
                      onChange={() => acttivateDietCharts(dt.status, dt._id)}
                    >
                      <option>{dt.status}</option>
                      {dt.status === "Active" ? (
                        <option>De-Active</option>
                      ) : dt.status === "De-Active" ? (
                        <option>Active</option>
                      ) : (
                        ""
                      )}
                    </select>
                  </td>
                  <td className="table__Body--Row_Data">
                    <FiEye
                      onClick={() => filterData(dt._id)}
                      className="table__Body--Status_Icons"
                      data-bs-toggle="modal"
                      data-bs-target="#modalCharts"
                    />
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody className="w-full  flex justify-center ">
              <tr className="text-lg mt-2">No Diet Chart Found</tr>
            </tbody>
          )}
        </table>
      </div>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalCharts"
        tabIndex="-1"
        aria-labelledby="modalChartsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="modalDietChartLabel"
              >
                DC_{filterDatas[0]?.calorie_lower}-
                {filterDatas[0]?.calorie_upper}-{filterDatas[0]?.ch_lower}-
                {filterDatas[0]?.ch_upper}-{filterDatas[0]?.protiens}-
                {filterDatas[0]?.fats}
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {loadingDiet ? (
              <LoadingBox></LoadingBox>
            ) : errorDiet ? (
              <MessageBox>{errorDiet}</MessageBox>
            ) : show ? (
              <div className="modal-body relative p-4">
                <div className="form__Grid--Cols-6">
                  <div className="form__Cols--Span-6">
                    <label
                      htmlFor="prescribedBy"
                      className="form__Label-Heading"
                    >
                      Doctor Name
                    </label>
                    <p className="form__Heading">
                      {filterDatas[0].doctorId
                        ? filterDatas[0].doctorId.name
                        : ""}
                    </p>
                  </div>
                  <div className="form__Cols--Span-6">
                    <label
                      htmlFor="prescribedDate"
                      className="form__Label-Heading"
                    >
                      Prescribed Date
                    </label>
                    <p className="form__Heading">
                      {truncate(filterDatas[0].createdOn, 11)}
                    </p>
                  </div>
                  <div className="form__Cols--Span-6">
                    <label
                      htmlFor="lowerCalories"
                      className="form__Label-Heading"
                    >
                      Low Calories Range
                    </label>
                    <p className="form__Heading">
                      {filterDatas[0].calorie_lower}
                    </p>
                  </div>
                  <div className="form__Cols--Span-6">
                    <label
                      htmlFor="highCalories"
                      className="form__Label-Heading"
                    >
                      High Clories Range
                    </label>
                    <p className="form__Heading">
                      {filterDatas[0].calorie_upper}
                    </p>
                  </div>
                  <div className="form__Cols--Span-6">
                    <label
                      htmlFor="lowerCarbohydrates"
                      className="form__Label-Heading"
                    >
                      Low Carbohydrates Range
                    </label>
                    <p className="form__Heading">{filterDatas[0].ch_lower}</p>
                  </div>
                  <div className="form__Cols--Span-6">
                    <label
                      htmlFor="highCarbohydrates"
                      className="form__Label-Heading"
                    >
                      High Carbohydrates Range
                    </label>
                    <p className="form__Heading">{filterDatas[0].ch_upper}</p>
                  </div>
                  <div className="form__Cols--Span-6">
                    <label htmlFor="proties" className="form__Label-Heading">
                      Protiens Range
                    </label>
                    <p className="form__Heading">{filterDatas[0].protiens}</p>
                  </div>
                  <div className="form__Cols--Span-6">
                    <label htmlFor="fats" className="form__Label-Heading">
                      Fats Range
                    </label>
                    <p className="form__Heading">{filterDatas[0].fats}</p>
                  </div>
                  <div className="form__Cols--Span-6">
                    <label htmlFor="foodType" className="form__Label-Heading">
                      Food Type (Veg / Nonveg / Egg)
                    </label>

                    <p className="form__Heading">Veg</p>
                  </div>
                  <div className="form__Cols--Span-6">
                    <label htmlFor="foodCusine" className="form__Label-Heading">
                      Food Cusine
                    </label>
                    <p className="form__Heading">
                      {filterDatas[0].cuisine_type}
                    </p>
                  </div>
                </div>
                <div className="form__Grid--Rows-none">
                  <div className="form__Cols--Span-6 mt-4">
                    <label
                      htmlFor="downloadDietChart"
                      className="form__Label-Heading"
                    >
                      Download Diet`s Chart
                    </label>
                    <p className="form__Heading mt-2 ">
                      <a
                        href={filterDatas[0]?.file}
                        download={filterDatas[0]?.file}
                        target="_blank"
                        className="px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight cursor-pointer uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none       focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150     ease-in-out ml-1"
                      >
                        Download Diet Chart
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <MessageBox>No Diet Chart</MessageBox>
            )}

            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomDietCharts;
