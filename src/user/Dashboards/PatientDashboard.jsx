import React from "react";
import PatientFooter from "../shared/PatientFooter";
import PatientNav from "../shared/PatientNav";
import FloatingButton from "../../pages/shared/Floating-Button";

const PatientDashboard = () => {
  return (
    <>
      <div className="dashboard__Container">
        <PatientNav />
        <main>
          <div className="dashboard__Main-Content">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
      <PatientFooter />
    </>
  );
};

export default PatientDashboard;
