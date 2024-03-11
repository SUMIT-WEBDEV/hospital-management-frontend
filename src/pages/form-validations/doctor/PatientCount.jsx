import React from "react";
import PatientFilter from "./PatientFilter";
import PatientCountActive from "./PatientCountActive";
import PatientCountUnpaid from "./PatientCountUnpaid";
import PatientCountProgram from "./PatientCountProgram";

const PatientCount = ({ handleClick, paidCount, totalCount, status }) => {
  return (
    <>
      <div className="flex flex-col w-full md:flex-row justify-evenly">
        <div className="block h-auto p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <PatientCountActive paidCount={paidCount} />
          <PatientCountUnpaid unpaidCount={totalCount - paidCount || 0} />
          <PatientCountProgram totalCount={totalCount} />
        </div>
        {/* <div className="block h-auto p-6 rounded-lg shadow-lg bg-white max-w-sm">
                    
                </div>
                <div className="block h-auto p-6 rounded-lg shadow-lg bg-white max-w-sm">
                    
                </div> */}
        <PatientFilter handleClick={handleClick} status={status} />
      </div>
    </>
  );
};

export default PatientCount;
