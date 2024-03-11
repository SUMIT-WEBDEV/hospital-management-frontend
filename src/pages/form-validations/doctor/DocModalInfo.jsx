import React from "react";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { FiPaperclip, FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";

const DocModalInfo = ({ show, close }) => {
    const deitChartList = useSelector((state) => state.deitChartList);
    const { loading: loadingDiet, error: errorDiet, dietchart } = deitChartList;

    const prescriptionPatient = useSelector(
        (state) => state.prescriptionPatient
    );
    const {
        loading: loadingPres,
        error: errorPres,
        presc,
    } = prescriptionPatient;

    const truncate = (str, n) => {
        return str.length > n ? str.substr(0, n - 1) + "...." : str;
    };

    return (
        <>
            {show ? (
                <div
                    className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                    //id="modalAppointment"
                    tabIndex="-1"
                    onClick={() => close()}
                    //aria-labelledby="modalAppointmentLabel"
                    //aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
                        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                <h5
                                    className="text-xl font-medium leading-normal text-gray-800"
                                    //id="modalAppointmentLabel"
                                >
                                    Diet Chart (Old Date Wise / Prescribed By)
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    onClick={() => close()}
                                    //data-bs-dismiss="modal"
                                    //aria-label="Close"
                                ></button>
                            </div>
                            {loadingDiet ? (
                                <LoadingBox></LoadingBox>
                            ) : errorDiet ? (
                                <MessageBox>{errorDiet}</MessageBox>
                            ) : dietchart.length > 0 ? (
                                dietchart.map((dt) => (
                                    <div
                                        className="modal-body relative p-4"
                                        key={dt._id}
                                    >
                                        <div className="p-2">
                                            <div className="relative w-full overflow-hidden">
                                                <input
                                                    type="checkbox"
                                                    className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                                                />
                                                <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                                                    <h1 className="text-lg font-semibold text-gray-600">
                                                        {dt.doctorId
                                                            ? dt.doctorId.name
                                                            : ""}
                                                        /20-11-2022
                                                    </h1>
                                                </div>
                                                {/* Down Arrow Icon */}
                                                <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                                                    <FiChevronDown className="w-6 h-6" />
                                                </div>
                                                {/* Content */}
                                                <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                                                    <div className="p-4">
                                                        <div className="form__Grid--Cols-6">
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="prescribedBy"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Doctor Name
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {" "}
                                                                    {dt.doctorId
                                                                        ? dt
                                                                              .doctorId
                                                                              .name
                                                                        : ""}
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="prescribedFor"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Patient Name
                                                                </label>
                                                                <p className="form__Heading">
                                                                    Zafar Irshad
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="prescribedDate"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Prescribed
                                                                    Date
                                                                </label>
                                                                <p className="form__Heading">
                                                                    20-11-2022
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="lowerCalories"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Low Calories
                                                                    Range
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        dt.calorie_lower
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="highCalories"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    High Clories
                                                                    Range
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        dt.calorie_upper
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="lowerCarbohydrates"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Low
                                                                    Carbohydrates
                                                                    Range
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        dt.ch_lower
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="highCarbohydrates"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    High
                                                                    Carbohydrates
                                                                    Range
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        dt.ch_upper
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="proties"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Protiens
                                                                    Range
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        dt.protiens
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="fats"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Fats Range
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {dt.fats}
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="foodType"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Food Type
                                                                    (Veg /
                                                                    Nonveg /
                                                                    Egg)
                                                                </label>
                                                                <p className="form__Heading">
                                                                    Veg
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="foodCusine"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Food Cusine
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        dt.cuisine_type
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="py-3">
                                                            <div className="form__Grid--Rows-none">
                                                                <div className="form__Cols--Span-6">
                                                                    <label
                                                                        htmlFor="downloadDietChart"
                                                                        className="form__Label-Heading"
                                                                    >
                                                                        Download
                                                                        Diet
                                                                        Chart
                                                                    </label>
                                                                    <p className="form__Heading">
                                                                        <button
                                                                            type="button"
                                                                            className="px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                                                        >
                                                                            Download
                                                                            Diet
                                                                            Chart
                                                                        </button>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <MessageBox>No diet chart</MessageBox>
                            )}

                            {/* ******* */}

                            {loadingPres ? (
                                <LoadingBox></LoadingBox>
                            ) : errorPres ? (
                                <MessageBox>{errorPres}</MessageBox>
                            ) : presc.length > 0 ? (
                                presc.map((pre) => (
                                    <div
                                        className="modal-body relative p-4"
                                        key={pre._id}
                                    >
                                        <div className="p-2">
                                            <div className="relative w-full overflow-hidden">
                                                <input
                                                    type="checkbox"
                                                    className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                                                />
                                                <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                                                    <h1 className="text-lg font-semibold text-gray-600">
                                                        {pre.doctorId
                                                            ? pre.doctorId.name
                                                            : ""}{" "}
                                                        /
                                                        {truncate(
                                                            pre.createdOn,
                                                            11
                                                        )}
                                                    </h1>
                                                </div>
                                                {/* Down Arrow Icon */}
                                                <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                                                    <FiChevronDown className="w-6 h-6" />
                                                </div>
                                                {/* Content */}
                                                <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                                                    <div className="p-4">
                                                        <div className="form__Grid--Cols-6">
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="prescribedBy"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Doctor Name
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {" "}
                                                                    {pre.doctorId
                                                                        ? pre
                                                                              .doctorId
                                                                              .name
                                                                        : ""}{" "}
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="prescribedFor"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Patient Name
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {pre.patientId
                                                                        ? pre
                                                                              .patientId
                                                                              .name
                                                                        : ""}
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="prescribedDate"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Prescribed
                                                                    Date
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {truncate(
                                                                        pre.createdOn,
                                                                        11
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="medicineType"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Medicine
                                                                    Type
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        pre.medicine_type
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="medicineName"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Medicine
                                                                    Name
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        pre.medicine_name
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="medicineMorningDose"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Medicine
                                                                    Morning Dose
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        pre.morning_dose
                                                                    }
                                                                    s
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="medicineAfternoonDose"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Medicine
                                                                    Afternoon
                                                                    Dose
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        pre.afternoon_dose
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="medicineEveningDose"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Medicine
                                                                    Evening Dose
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        pre.evening_dose
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="medicineFrequency"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Medicine
                                                                    Frequency
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        pre.frequency
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="medicineDuration"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Medicine
                                                                    Duration
                                                                    (Number /
                                                                    Days /
                                                                    Weeks)
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        pre.duration_days
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="form__Grid--Rows-none">
                                                            <div className="form__Cols--Span-6">
                                                                <label
                                                                    htmlFor="medicineSplInstructions"
                                                                    className="form__Label-Heading"
                                                                >
                                                                    Medicine
                                                                    Special
                                                                    Instructions
                                                                </label>
                                                                <p className="form__Heading">
                                                                    {
                                                                        pre.special_inst
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <MessageBox>No Prescription</MessageBox>
                            )}

                            <div className="p-4">
                                <div className="relative w-full overflow-hidden">
                                    <input
                                        type="checkbox"
                                        className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                                    />
                                    <div className="bg-slate-50 shadow-lg h-12 w-full pl-5 rounded-md flex items-center">
                                        <h1 className="text-lg font-semibold text-gray-600">
                                            Rajiv Singla / Form Title /
                                            10-12-2022
                                        </h1>
                                    </div>
                                    {/* Down Arrow Icon */}
                                    <div className="absolute top-3 right-3 text-gray-600 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                                        <FiChevronDown className="w-6 h-6" />
                                    </div>
                                    {/* Content */}
                                    <div className="bg-white shadow-lg rounded-b-md overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                                        <div className="p-4">
                                            <div className="form__Grid--Cols-6">
                                                <div className="form__Cols--Span-6">
                                                    <label
                                                        htmlFor="formCreatedBy"
                                                        className="form__Label-Heading"
                                                    >
                                                        Doctor Name
                                                    </label>
                                                    <p className="form__Heading">
                                                        Rajiv Singla
                                                    </p>
                                                </div>
                                                <div className="form__Cols--Span-6">
                                                    <label
                                                        htmlFor="formCreatedDate"
                                                        className="form__Label-Heading"
                                                    >
                                                        Form Created Date
                                                    </label>
                                                    <p className="form__Heading">
                                                        10-12-2022
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="py-4">
                                                <div className="form__Grid--Rows-none">
                                                    <div className="form__Cols--Span-6">
                                                        <label
                                                            htmlFor="formQuestionTitle"
                                                            className="form__Label-Heading"
                                                        >
                                                            Form Question Title
                                                        </label>
                                                        <p className="form__Heading">
                                                            Question Title
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-2">
                                                <div className="form__Grid--Cols-6">
                                                    <div className="form__Cols--Span-6">
                                                        <label
                                                            htmlFor="formQuestionType"
                                                            className="form__Label-Heading"
                                                        >
                                                            Form Question Type
                                                        </label>
                                                        <p className="form__Heading">
                                                            Radio
                                                        </p>
                                                    </div>
                                                    <div className="form__Cols--Span-6">
                                                        <label
                                                            htmlFor="formQuestionChoice"
                                                            className="form__Label-Heading"
                                                        >
                                                            Form Question Choice
                                                        </label>
                                                        <p className="form__Heading">
                                                            Choice Name
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-4">
                                                <div className="form__Grid--Rows-none">
                                                    <div className="form__Cols--Span-6">
                                                        <label
                                                            htmlFor="formQuestionTitle"
                                                            className="form__Label-Heading"
                                                        >
                                                            Form Question Title
                                                        </label>
                                                        <p className="form__Heading">
                                                            Question Title
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-2">
                                                <div className="form__Grid--Cols-6">
                                                    <div className="form__Cols--Span-6">
                                                        <label
                                                            htmlFor="formQuestionType"
                                                            className="form__Label-Heading"
                                                        >
                                                            Form Question Type
                                                        </label>
                                                        <p className="form__Heading">
                                                            Checkbox
                                                        </p>
                                                    </div>
                                                    <div className="form__Cols--Span-6">
                                                        <label
                                                            htmlFor="formQuestionChoice"
                                                            className="form__Label-Heading"
                                                        >
                                                            Form Question Choice
                                                        </label>
                                                        <p className="form__Heading">
                                                            Choice Name
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-4">
                                                <div className="form__Grid--Rows-none">
                                                    <div className="form__Cols--Span-6">
                                                        <label
                                                            htmlFor="formQuestionTitle"
                                                            className="form__Label-Heading"
                                                        >
                                                            Form Question Title
                                                        </label>
                                                        <p className="form__Heading">
                                                            Question Title
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-2">
                                                <div className="form__Grid--Cols-6">
                                                    <div className="form__Cols--Span-6">
                                                        <label
                                                            htmlFor="formQuestionType"
                                                            className="form__Label-Heading"
                                                        >
                                                            Form Question Type
                                                        </label>
                                                        <p className="form__Heading">
                                                            Textarea
                                                        </p>
                                                    </div>
                                                    <div className="form__Cols--Span-6">
                                                        <label
                                                            htmlFor="formQuestionChoice"
                                                            className="form__Label-Heading"
                                                        >
                                                            Form Question Choice
                                                        </label>
                                                        <p className="form__Heading">
                                                            Patient Medical Info
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                <button
                                    type="button"
                                    className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    //data-bs-dismiss="modal"
                                    onClick={() => close()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default DocModalInfo;
