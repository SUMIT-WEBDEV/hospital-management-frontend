import React from "react";
import AdminNav from "../shared/AdminNav";
import AdminTabs from "../shared/AdminTabs";

// import Summaryinfo from "../../pages/form-validations/admin/Summaryinfo";
// import AccessControl from "../../pages/form-validations/admin/AccessControl";
// import Charts from "../../pages/form-validations/admin/Charts";
// import DataCollection from "../../pages/form-validations/admin/DataCollection";
const SuperAdmin = () => {
  return (
    <>
      <div className="dashboard__Container">
        <AdminNav />
        <header className="header__Shadow">
          <div className="header__Container">
            <h1 className="header__Heading--Primary">
              Dashboard - SUPER ADMIN
            </h1>
          </div>
        </header>
        <main>
          <div className="dashboard__Main-Content">
            {/* Replace with your content */}
            <div className="dashboard__Main-Inner-Content">
              <AdminTabs />
              {/* <ul
                className="nav tabs__List-Container"
                id="tabs-tabJustify"
                role="tablist"
              >
                <li className="nav-item flex-grow text-center" role="presentation">
                  <a
                    href="#tabs-summaryJustify"
                    className="tabs__List-Link"
                    id="tabs-summary-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-summaryJustify"
                    role="tab"
                    aria-controls="tabs-summaryJustify"
                    aria-selected="true"
                  >
                    Summary
                  </a>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <a
                    href="#tabs-controlsJustify"
                    className="tabs__List-Link"
                    id="tabs-controls-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-controlsJustify"
                    role="tab"
                    aria-controls="tabs-controlsJustify"
                    aria-selected="false"
                  >
                    Access Controls
                  </a>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <a
                    href="#tabs-chartsJustify"
                    className="tabs__List-Link"
                    id="tabs-charts-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-chartsJustify"
                    role="tab"
                    aria-controls="tabs-chartsJustify"
                    aria-selected="false"
                  >
                    Forms &amp; Diet Charts
                  </a>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <a
                    href="#tabs-dataJustify"
                    className="tabs__List-Link"
                    id="tabs-data-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-dataJustify"
                    role="tab"
                    aria-controls="tabs-dataJustify"
                    aria-selected="false"
                  >
                    Data
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="tabs-tabContentJustify">
                <div
                  className="tab-pane fade show active"
                  id="tabs-summaryJustify"
                  role="tabpanel"
                  aria-labelledby="tabs-summary-tabJustify"
                >
                  <Summaryinfo />
                </div>
                <div
                  className="tab-pane fade"
                  id="tabs-controlsJustify"
                  role="tabpanel"
                  aria-labelledby="tabs-controls-tabJustify"
                >
                  <AccessControl />
                </div>
                <div
                  className="tab-pane fade"
                  id="tabs-chartsJustify"
                  role="tabpanel"
                  aria-labelledby="tabs-charts-tabJustify"
                >
                  <Charts />
                </div>
                <div
                  className="tab-pane fade"
                  id="tabs-dataJustify"
                  role="tabpanel"
                  aria-labelledby="tabs-data-tabJustify"
                >
                  <DataCollection />
                </div>
              </div> */}
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};

export default SuperAdmin;
