import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createForm } from "../../../action/DoctorAction";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { CREATE_FORM_RESET } from "../../../constant.js/DoctorConstant";
import Navbar from "../../../user/shared/Navbar";
import { VALIDATOR_REQUIRE } from "../../../utils/validators";
import Select from "../../../Components/Select";
import { useForm } from "../../../hooks/form-hooks";

const CreateForm = () => {
  // const [id, setId] = useState('')
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const formCreate = useSelector((state) => state.formCreate);
  const { loading, error, success } = formCreate;

  const [addMore, setAddMore] = useState([
    {
      type: "",
      question_title: "",
      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",
    },
  ]);

  const [form, setFrom] = useState(false);
  const formOptions = [
    { value: "Please Select form type" },
    { value: "daily" },
    { value: "weekly" },
    { value: "bi-weekly" },
  ];
  const [formState, inputHandler, setFormData] = useForm(
    {
      form_type: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const nextStep = () => {
    dispatch(createForm(title, addMore));
    // dispatch(createForm(title, addMore, formState.inputs.form_type.value));
    // console.log(addMore,'admmore')
  };
  // console.log("kjdhfe");
  // console.log("title=====", title);
  // console.log("addMore=====", addMore);

  const handleFormChange = (event, index) => {
    let data = [...addMore];
    data[index][event.target.name] = event.target.value;
    setAddMore(data);
    // console.log(addMore,'vii')
  };

  const addMoreFields = () => {
    let obj = {
      type: "",
      question_title: "",
      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",
    };
    setAddMore([...addMore, obj]);
  };

  const removeFields = (index) => {
    let data = [...addMore];
    data.splice(index, 1);
    setAddMore(data);
  };

  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Form created Succesfully.",
        text: "Thanks",
        type: "success",
        icon: "success",
      }).then((confirmed) => {
        if (confirmed) {
          navigate("/userrole/:roleid/dashboard/doctor/");
        }
      });
      dispatch({ type: CREATE_FORM_RESET });
    }
  }, [success]);

  return (
    <>
      <div className="dashboard__Container">
        <Navbar />
        <main>
          <div className="dashboard__Main-Content">
            {/* Replace with your content */}
            <div className="dashboard__Main-Inner-Content">
              <div>
                <div className="dashboard__Grid-Box">
                  <div className="dashboard__Grid-Cols">
                    <div className="form__Box-Shadow">
                      <div className="form__Box-Space">
                        <form>
                          <div className="form__Grid--Cols-6">
                            <div className="form__Cols--Span-6">
                              <label
                                htmlFor="form_title"
                                className="form__Label-Heading"
                              >
                                Form Title
                              </label>
                              <input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                name="form_title"
                                id="form_title"
                                autoComplete="given-name"
                                className="form__Input"
                              />
                            </div>
                            {/* <div className="form__Cols--Span-6">
                              
                              <Select
                                element="select"
                                id="form_type"
                                label="Select form type"
                                options={formOptions}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please Select Type"
                                onInput={inputHandler}
                               />
                            </div> */}
                            {/* <div className="form__Cols--Span-6 form__Gap-1">
                              <button
                                type="submit"
                                className="form__Btn-Green"
                              >
                                Create Form
                              </button>
                            </div> */}
                          </div>
                        </form>

                        {addMore.map((form, index) => (
                          <>
                            <form key={index}>
                              <div className="form__Grid--Cols-6" key={index}>
                                <div className="form__Cols--Span-6">
                                  <label
                                    htmlFor="type"
                                    className="form__Label-Heading"
                                  >
                                    Question Type
                                  </label>

                                  <select
                                    id="type"
                                    name="type"
                                    autoComplete="question-type-name"
                                    className="form__Select"
                                    value={form.type}
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                  >
                                    <option>Select Question Type</option>
                                    <option value="radio">Radio Type</option>
                                    <option value="checkbox">
                                      Checkbox Type
                                    </option>
                                    <option value="textArea">
                                      Text Area [Input will be text]
                                    </option>
                                  </select>
                                </div>
                                <div className="form__Cols--Span-6"></div>
                              </div>

                              {addMore[index].type &&
                              addMore[index].type === "radio" ? (
                                <>
                                  <div className="form__Grid--Rows-none">
                                    <div className="form__Cols--Span-6">
                                      <label
                                        htmlFor="question_title"
                                        className="form__Label-Heading"
                                      >
                                        Question Title
                                      </label>
                                      <input
                                        type="text"
                                        name="question_title"
                                        id="question_title"
                                        value={form.question_title}
                                        autoComplete="given-name"
                                        className="form__Input"
                                        onChange={(event) =>
                                          handleFormChange(event, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-6 gap-6">
                                    <div className="form__Cols--Span-3">
                                      <label
                                        htmlFor="choice1"
                                        className="form__Label-Heading"
                                      >
                                        Question choice
                                      </label>
                                      <input
                                        type="text"
                                        name="choice1"
                                        id="choice1"
                                        value={form.choice1}
                                        autoComplete="given-name"
                                        className="form__Input"
                                        onChange={(event) =>
                                          handleFormChange(event, index)
                                        }
                                      />
                                    </div>
                                    <div className="form__Cols--Span-3">
                                      <label
                                        htmlFor="choice2"
                                        className="form__Label-Heading"
                                      >
                                        Question choice
                                      </label>
                                      <input
                                        type="text"
                                        name="choice2"
                                        value={form.choice2}
                                        id="choice2"
                                        autoComplete="given-name"
                                        className="form__Input"
                                        onChange={(event) =>
                                          handleFormChange(event, index)
                                        }
                                      />
                                    </div>
                                    <div className="form__Cols--Span-3">
                                      <label
                                        htmlFor="choice3"
                                        className="form__Label-Heading"
                                      >
                                        Question choice
                                      </label>
                                      <input
                                        type="text"
                                        name="choice3"
                                        id="choice3"
                                        value={form.choice3}
                                        autoComplete="given-name"
                                        className="form__Input"
                                        onChange={(event) =>
                                          handleFormChange(event, index)
                                        }
                                      />
                                    </div>
                                    <div className="form__Cols--Span-3">
                                      <label
                                        htmlFor="question-choice-4"
                                        className="form__Label-Heading"
                                      >
                                        Question choice
                                      </label>
                                      <input
                                        type="text"
                                        name="choice4"
                                        id="choice4"
                                        value={form.choice4}
                                        autoComplete="given-name"
                                        className="form__Input"
                                        onChange={(event) =>
                                          handleFormChange(event, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : addMore[index].type &&
                                addMore[index].type === "checkbox" ? (
                                <>
                                  <div className="form__Grid--Rows-none">
                                    <div className="form__Cols--Span-6">
                                      <label
                                        htmlFor="title"
                                        className="form__Label-Heading"
                                      >
                                        Question Title
                                      </label>
                                      <input
                                        type="text"
                                        name="question_title"
                                        id="question_title"
                                        value={form.question_title}
                                        autoComplete="given-name"
                                        className="form__Input"
                                        onChange={(event) =>
                                          handleFormChange(event, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-6 gap-6">
                                    <div className="form__Cols--Span-3">
                                      <label
                                        htmlFor="choice1"
                                        className="form__Label-Heading"
                                      >
                                        Question choice
                                      </label>
                                      <input
                                        type="text"
                                        name="choice1"
                                        id="choice1"
                                        value={form.choice1}
                                        autoComplete="given-name"
                                        className="form__Input"
                                        onChange={(event) =>
                                          handleFormChange(event, index)
                                        }
                                      />
                                    </div>
                                    <div className="form__Cols--Span-3">
                                      <label
                                        htmlFor="choice2"
                                        className="form__Label-Heading"
                                      >
                                        Question choice
                                      </label>
                                      <input
                                        type="text"
                                        name="choice2"
                                        value={form.choice2}
                                        id="choice2"
                                        autoComplete="given-name"
                                        className="form__Input"
                                        onChange={(event) =>
                                          handleFormChange(event, index)
                                        }
                                      />
                                    </div>
                                    <div className="form__Cols--Span-3">
                                      <label
                                        htmlFor="choice3"
                                        className="form__Label-Heading"
                                      >
                                        Question choice
                                      </label>
                                      <input
                                        type="text"
                                        name="choice3"
                                        id="choice3"
                                        value={form.choice3}
                                        autoComplete="given-name"
                                        className="form__Input"
                                        onChange={(event) =>
                                          handleFormChange(event, index)
                                        }
                                      />
                                    </div>
                                    <div className="form__Cols--Span-3">
                                      <label
                                        htmlFor="question-choice-4"
                                        className="form__Label-Heading"
                                      >
                                        Question choice
                                      </label>
                                      <input
                                        type="text"
                                        name="choice4"
                                        id="choice4"
                                        value={form.choice4}
                                        autoComplete="given-name"
                                        className="form__Input"
                                        onChange={(event) =>
                                          handleFormChange(event, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : addMore[index].type &&
                                addMore[index].type === "textArea" ? (
                                <div className="form__Grid--Rows-none">
                                  <div className="form__Cols--Span-6">
                                    <label
                                      htmlFor="title"
                                      className="form__Label-Heading"
                                    >
                                      Question Title
                                    </label>
                                    <input
                                      type="text"
                                      name="question_title"
                                      id="question_title"
                                      value={form.question_title}
                                      autoComplete="given-name"
                                      className="form__Input"
                                      onChange={(event) =>
                                        handleFormChange(event, index)
                                      }
                                    />
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </form>
                            {index != 0 && (
                              <button onClick={() => removeFields(index)}>
                                Remove fields
                              </button>
                            )}
                          </>
                        ))}
                      </div>
                      <div className="form__Btn-Bg">
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox>{error}</MessageBox>}
                        <button
                          onClick={nextStep}
                          type="submit"
                          className="form__Btn-Submit"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    {/* </form> */}

                    <button
                      onClick={addMoreFields}
                      type="submit"
                      className="form__Btn-Green"
                    >
                      Add More Questions
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateForm;
