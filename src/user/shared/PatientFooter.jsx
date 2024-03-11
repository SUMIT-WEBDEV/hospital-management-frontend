import React from "react";

import { Link } from "react-router-dom";

const PatientFooter = () => {
  return (
    <>
      <footer className="footer__Box">
        <div style={{ maxWidth: "100%" }} className="footer__Container">
          <div className="footer__Flex--Box">
            <Link
              to="/userrole/:roleid/dashboard/patient/mydata/"
              className="footer__Flex--Links"
            >
              My Data
            </Link>
            <Link
              to="/userrole/:roleid/dashboard/patient/prescriptions/"
              className="footer__Flex--Links"
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

export default PatientFooter;
