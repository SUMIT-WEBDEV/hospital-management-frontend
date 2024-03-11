import React, { useReducer, useEffect } from "react";

import { validate } from "../utils/validators";

const selectReducer = (state, action) => {
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

const Select = (props) => {
  const [inputState, dispatch] = useReducer(selectReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValue || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    if (props.initialValue) {
      dispatch({
        type: "INITIALIZE",
        val: props.initialValue || "",
      });
    }
  }, [props.initialValue]);
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: props.healthPlanOptions
        ? props.healthPlanOptions.find((opt) => opt.value == event.target.value)
            ?.id
        : event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "healthPlanSelect" ? (
      <select
        // value={inputState?.value}
        id={props.id}
        className="form__Select"
        onChange={changeHandler}
        onBlur={touchHandler}
        options={props.options}
      >
        {props.options.map((option) => (
          <option
            selected={inputState.value == option.value}
            value={option.value}
            key={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    ) : props.element === "select" ? (
      <select
        // value={inputState?.value}
        required
        id={props.id}
        className="form__Select capitalize"
        onChange={changeHandler}
        onBlur={touchHandler}
        options={props.options}
      >
        {props.options.map((option, index) => (
          <option
            selected={inputState.value === option.value}
            key={option.value}
            value={index === 0 ? "" : option.value} // Set value as empty string for the first option
          >
            {option.value}
          </option>
        ))}
      </select>
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState?.value}
      />
    );

  return (
    <div>
      <label htmlFor={props.id} className="form__Label-Heading">
        {props.label}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className="form__Input--Error">{props.errorText}</p>
      )}
    </div>
  );
};

export default Select;
