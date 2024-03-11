import React, { useReducer, useEffect } from "react";

import { validate } from "../utils/validators";
import Datepicker from "react-tailwindcss-datepicker";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        // isValid: true
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props?.initialValue || "",
    isTouched: false,
    isValid: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  useEffect(() => {
    if (props.initialValue) {
      dispatch({
        type: "INITIALIZE",
        val: props.initialValue || "",
      });
    }
  }, [props.initialValue]);
  const changeHandler = (event) => {
    if (props.element === "inputNumber" && event.target.value.length > 10) {
      event.target.value = event.target.value.slice(0, 10);
    }

    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  let element;
  switch (props.element) {
    case "input":
      element = (
        <input
          id={props.id}
          type={props.type}
          min={props.min}
          max={props.max}
          className="form__Input phone-no"
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState?.value}
          required
        />
      );
      break;

    case "inputNumber":
      element = (
        <input
          id={props.id}
          type={props.type}
          // min={props.min}
          className="form__Input phone-no"
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState?.value}
          maxLength="5"
          required
        />
      );
      break;
    case "textarea":
      element = (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState?.value}
          className="form__Textarea"
        />
      );
      break;
    case "datepicker":
      element = (
        <Datepicker
          id={props.id}
          selected={new Date(inputState?.value)}
          onChange={(date) =>
            dispatch({
              type: "CHANGE",
              val: date,
              validators: props.validators,
            })
          }
          onBlur={touchHandler}
          className="form__Input"
          value={value}
          dateFormat={props.dateFormat || "dd/MM/yyyy"}
          showYearDropdown
          scrollableMonthYearDropdown
          required
        />
      );
      break;
    default:
      element = (
        <input
          id={props.id}
          type={props.type}
          className="form__Input"
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState?.value}
          required
        />
      );
  }

  return (
    <div>
      <label htmlFor={props.id} className="form__Label-Heading">
        {props.label}
      </label>

      {element}
      {props.element !== "datepicker" &&
        !inputState.isValid &&
        inputState.isTouched && (
          <p className="form__Input--Error">{props.errorText}</p>
        )}
      {props.element === "datepicker" &&
        !inputState.isValid &&
        inputState.isTouched && (
          <p className="form__Input--Error">{props.errorText}</p>
        )}
    </div>
  );
};

export default Input;
