import React from "react";
import AdminNav from "./AdminNav";
import { Link } from "react-router-dom";
import { CustomDietCharts } from "../../pages/form-validations/admin/index";

const CustomCharts = () => {
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
  <div className="dashboard__Main-Inner-Content">
              <Link to="/Admin/dashboard/">
                <h2 className="text-center py-6 text-xl font-medium leading-6 text-gray-900">
                  BACK
                </h2>
              </Link>

              <CustomDietCharts />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CustomCharts;
