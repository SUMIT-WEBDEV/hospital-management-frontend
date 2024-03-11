import React from "react";
import { Link } from "react-router-dom";

const DocPatientFooter = () => {
  return (
    <>
      <footer className="footer__Box">
        <div style={{ maxWidth: "100%" }} className="footer__Container">
          <div className="footer__Flex--Box">
            <Link
              to={{
                pathname: `/userrole/:roleid/dashboard/patient/forms/`,
              }}
              className="footer__Flex--Links"
            >
              My Data
            </Link>
            <Link
              to={{
                pathname: `/userrole/:roleid/dashboard/patient/med/`,
              }}
              className="footer__Flex--Links"
              // to="/userrole/:roleid/dashboard/patient/med/"
            >
              Prescriptions
            </Link>
            {/* <Link
              to="/userrole/:roleid/dashboard/common/chat/"
              className="footer__Flex--Links"
            >
              Chat
            </Link> */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default DocPatientFooter;
