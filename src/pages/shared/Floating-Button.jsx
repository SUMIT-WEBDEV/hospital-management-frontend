import { LinkedinFilled } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Ripple, initTE } from "tw-elements";
initTE({ Ripple });

const FloatingButton = () => {
  return (
    <>
      {/* <div classnameName="fixed right-5 bottom-5">
        <div classnameName="">
          <div classnameName="dropup relative">
            <button
              classnameName="dropdown-toggle px-6 py-5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md transition duration-150 ease-in-out flex items-center whitespace-nowrap focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg active:text-white"
              type="button"
              id="dropdownMenuButton1u"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FiFilePlus classnameName="h-6 w-6 text-gray-100" />
            </button>
            <ul
              classnameName="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
              aria-labelledby="dropdownMenuButton1u"
            >
              <li>
                <Link
                  classnameName="dropdown-item text-sm py-2 px-4 font-medium block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                  to="/userrole/:roleid/dashboard/doctor/enrol/patient/"
                >
                  Create Patient
                </Link>
              </li>
              <li>
                <Link
                  classnameName="dropdown-item text-sm py-2 px-4 font-medium block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                  to="/userrole/:roleid/dashboard/doctor/create/form/"
                >
                  Create Form
                </Link>
              </li>
              <li>
                <Link
                  classnameName="dropdown-item text-sm py-2 px-4 font-medium block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                  to="/userrole/:roleid/dashboard/doctor/create/dietchart/"
                >
                  Upload Diet Chart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div class="floating-container">
        <div class="floating-button">+</div>
          <div class="element-container">
            <Link to="/userrole/:roleid/dashboard/doctor/create/dietchart/">
              <span class="float-element tooltip-left">
                <i class="material-icons">description</i>
                </span>  
            </Link>    
            <Link to="/userrole/:roleid/dashboard/doctor/create/form/">
              <span class="float-element">
                <i class="material-icons">note add</i>
              </span>
            </Link>
            <Link to="/userrole/:roleid/dashboard/doctor/enrol/patient/">
              <span class="float-element">
              <i class="material-icons">person add</i>
            </span>
            </Link>
          </div>
      </div>
    </>
  );
};

export default FloatingButton;
