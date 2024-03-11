import React from "react";

const PatientCountUnpaid = ({unpaidCount}) => {
    return (
        <>
            <div className="py-4">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    Patient Count
                    <span className="text-xs inline-block mx-3 py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-500 text-white rounded-full">
                        Unpaid
                    </span>
                </h5>
                <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    {unpaidCount}
                </button>
            </div>
        </>
    );
};

export default PatientCountUnpaid;