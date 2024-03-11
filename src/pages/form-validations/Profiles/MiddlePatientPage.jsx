// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { patientStore } from "../../../action/PatientAction";

// function MiddlePatientPage() {
//   const patientSign = useSelector((state) => state.patientFirstReducer);
//   const { loading: loadingPatient, error: errorPatient, patInfo } = patientSign;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleUserSelect = (userId, userToken) => {
//     // Store selected userId and userToken in localStorage
//     // localStorage.setItem("patientInfo", JSON.stringify(userId));
//     // localStorage.setItem("selectedUserToken", userToken);

//     const patientInfo = {
//       activeUser: "patient",
//       user: userId,
//       token: userToken,
//     };

//     // Store the object in localStorage as JSON
//     localStorage.setItem("activeUser", "patient");
//     localStorage.setItem("patientInfo", JSON.stringify(patientInfo));
//     dispatch(patientStore(patientInfo));

//     // Redirect to the dashboard or perform other actions as needed
//     // navigate("/userrole/:roleid/dashboard/"); // Replace with the correct dashboard route
//     navigate("/userrole/:roleid/dashboard/patient/mydata/");
//   };

//   return (
//     <div>
//       {patInfo?.user ? (
//         patInfo.user.map((userId, index) => (
//           <div
//             key={index}
//             onClick={() => handleUserSelect(userId, patInfo.tokens[index])}
//           >
//             {userId?.name}
//           </div>
//         ))
//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// }

// export default MiddlePatientPage;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { patientStore } from "../../../action/PatientAction";
import User from "../../../Assets/user/profile.webp";

function MiddlePatientPage() {
  //   const patientSign = useSelector((state) => state.patientFirstReducer);
  //   const { loading: loadingPatient, error: errorPatient, patInfo } = patientSign;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patInfo = JSON.parse(localStorage.getItem("patientInfos"));

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

  return (
    <div className="flex justify-center items-center h-screen ">
      <div
        className="bg-green-400 p-8 rounded-lg shadow-lg sm:w-3/4 md:w-1/2 lg:w-1/3"
        style={{
          background: "rgba(0, 0, 0, 0.1)",
          boxShadow:
            "0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)",
        }}
      >
        {patInfo?.user ? (
          patInfo.user.map((userId, index) => (
            <div
              key={index}
              className="mb-4 cursor-pointer flex flex-col md:flex-row gap-2.5 
              justify-between items-center w-full"
              onClick={() => handleUserSelect(userId, patInfo.tokens[index])}
            >
              <div className="flex items-center">
                <img
                  src={userId.photo ? userId.photo : User}
                  alt={userId.name}
                  className="w-16 h-16 rounded-full mb-2 mr-4"
                />
                <p className="text-xl font-semibold">{userId.name}</p>
              </div>

              <button className="bg-green-600 mb-3 text-white px-4 py-2 rounded hover:bg-green-700">
                Go to Dashboard
              </button>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default MiddlePatientPage;
