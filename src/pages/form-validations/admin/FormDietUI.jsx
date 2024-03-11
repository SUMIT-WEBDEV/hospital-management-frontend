import React from "react";
import { useNavigate } from "react-router-dom";

const FormDietUI = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className="card__Container--Evenly">
        <div className="card__Block">
          <h5 className="card__Heading">
            Custom Forms
            <span className="card__Heading--Span card__Bg--Teal">Active</span>
          </h5>
          <p className="card__Info">
            {/* Some quick example text to build on the card title and make up the
            bulk of the card's content. */}
          </p>
          <button
            type="button"
            className="card__Btn card__Bg--Teal card__Btn--Bg-Teal"
            onClick={() => navigate('/Admin/dashboard/forms/')}
          >
            View Forms
          </button>
        </div>
        <div className="card__Block">
          <h5 className="card__Heading">
            Diet Charts
            <span className="card__Heading--Span card__Bg--Cyan">Active</span>
          </h5>
          <p className="card__Info">
            {/* Some quick example text to build on the card title and make up the
            bulk of the card's content. */}
          </p>
          <button
            type="button"
            className="card__Btn card__Bg--Cyan card__Btn--Bg-Cyan"
            onClick={() => navigate('/Admin/dashboard/charts/')}
          >
            View Diet Charts
          </button>
        </div>
      </div>
    </>
  );
};

export default FormDietUI;
