import React, { useState } from "react";
import Owlcarsoulcomp from "../../components/Owlcarsoulcomp/Owlcarsoulcomp";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import signupCSS from "./signup.module.css";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import googleLogo from "../../images/iconsgoogle.svg";
import faceLogo from "../../images/logosfacebook.svg";
import linkedLogo from "../../images/logolinked.svg";
export default function Signup() {
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let userSign = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  };
  const formikObj = useFormik({
    initialValues: userSign,
    onSubmit: (values) => {
      signUpCallApi(values);
    },
    validate: (values) => {
      setSuccess(null);
      setFail(null);
      let errors = {};
      const nameRegex = /^[a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/;
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const phoneNumberRegex = /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{11,14})$/;
      if (!values.firstName || nameRegex.test(values.firstName) === false) {
        errors.firstName = "This is not a valid name, check the name again";
      }
      if (!values.lastName || nameRegex.test(values.lastName) === false) {
        errors.lastName = "This is not a valid name, check the name again";
      }
      if (!values.email || emailRegex.test(values.email) === false) {
        errors.email =
          "This is not a valid email address, check the email again";
      }
      if (
        !values.phone ||
        phoneNumberRegex.test(values.phone) === false ||
        values.phone < 11
      ) {
        errors.phone =
          "This is not a valid phone number, check the number again";
      }
      if (!values.password || passwordRegex.test(values.password) === false) {
        errors.password =
          "This is not a valid password, ensure that your password is between 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers";
      }
      if (
        !values.passwordConfirm ||
        values.passwordConfirm !== values.password
      ) {
        errors.passwordConfirm = "Confirm password does not match";
      }
      return errors;
    },
  });
  async function signUpCallApi(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        values
      );
      setSuccess(data.message);
      setTimeout(() => {
        navigate(`/verification/${values.email}`);
      }, 3000);
    } catch (error) {
      setFail(error.response.data.msg);
      setTimeout(() => {
        navigate(`/login`);
      }, 3000);
    }
    setLoading(false);
  }
  return (
    <>
      <div className={signupCSS.signupcon}>
        <Owlcarsoulcomp />
        <div className={`userform ${signupCSS.signform}`}>
          <div className="userform__title">
            <h4>get started now</h4>
            <p>create your account here</p>
          </div>
          <form onSubmit={formikObj.handleSubmit}>
            <div className="inputscon">
              <div className="row">
                <div className="form-floating col-md-6 col-12 mb-5 position-relative">
                  <input
                    onChange={formikObj.handleChange}
                    value={formikObj.values.firstName}
                    onBlur={formikObj.handleBlur}
                    type="text"
                    className={`form-control 
                    ${
                      !formikObj.touched.firstName
                        ? ""
                        : formikObj.errors.firstName &&
                          formikObj.touched.firstName
                        ? "errorinput"
                        : "validinput"
                    }
                    `}
                    id="Fname"
                    name="firstName"
                    placeholder="First Name"
                  />
                  {formikObj.errors.firstName && formikObj.touched.firstName ? (
                    <div className="errormsg text-red-500 relative text-sm">
                      <i className="fas fa-exclamation-triangle me-1"></i>{" "}
                      {formikObj.errors.firstName}
                    </div>
                  ) : (
                    ""
                  )}
                  {!formikObj.touched.firstName ? (
                    ""
                  ) : formikObj.errors.firstName &&
                    formikObj.touched.firstName ? (
                    <i className="failicon position-absolute fa-solid fa-circle-xmark"></i>
                  ) : (
                    <i className="validicon position-absolute fa-solid fa-circle-check"></i>
                  )}

                  <label htmlFor="Fname">First Name</label>
                </div>
                <div className="form-floating col-md-6 col-12 mb-5">
                  <input
                    onBlur={formikObj.handleBlur}
                    onChange={formikObj.handleChange}
                    value={formikObj.values.lastName}
                    type="text"
                    className={`form-control ${
                      !formikObj.touched.lastName
                        ? ""
                        : formikObj.errors.lastName &&
                          formikObj.touched.lastName
                        ? "errorinput"
                        : "validinput"
                    }`}
                    id="Lname"
                    name="lastName"
                    placeholder="Last Name"
                  />{" "}
                  {formikObj.errors.lastName && formikObj.touched.lastName ? (
                    <div className="errormsg text-red-500 relative text-sm">
                      <i className="fas fa-exclamation-triangle me-1"></i>{" "}
                      {formikObj.errors.lastName}
                    </div>
                  ) : (
                    ""
                  )}
                  {!formikObj.touched.lastName ? (
                    ""
                  ) : formikObj.errors.lastName &&
                    formikObj.touched.lastName ? (
                    <i className="failicon position-absolute fa-solid fa-circle-xmark"></i>
                  ) : (
                    <i className="validicon position-absolute fa-solid fa-circle-check"></i>
                  )}
                  <label htmlFor="Lname">Last Name</label>
                </div>
              </div>
              <div className="form-floating  col-12 mb-5">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.email}
                  type="email"
                  className={`form-control ${
                    !formikObj.touched.email
                      ? ""
                      : formikObj.errors.email && formikObj.touched.email
                      ? "errorinput"
                      : "validinput"
                  }`}
                  id="email"
                  name="email"
                  placeholder="Email"
                />{" "}
                {formikObj.errors.email && formikObj.touched.email ? (
                  <div className="errormsg text-red-500 relative text-sm">
                    <i className="fas fa-exclamation-triangle me-1"></i>{" "}
                    {formikObj.errors.email}
                  </div>
                ) : (
                  ""
                )}
                {!formikObj.touched.email ? (
                  ""
                ) : formikObj.errors.email && formikObj.touched.email ? (
                  <i className="failicon position-absolute fa-solid fa-circle-xmark"></i>
                ) : (
                  <i className="validicon position-absolute fa-solid fa-circle-check"></i>
                )}
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating  col-12 mb-5">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.phone}
                  type="phone"
                  className={`form-control ${
                    !formikObj.touched.phone
                      ? ""
                      : formikObj.errors.phone && formikObj.touched.phone
                      ? "errorinput"
                      : "validinput"
                  }`}
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                />{" "}
                {formikObj.errors.phone && formikObj.touched.phone ? (
                  <div className="errormsg text-red-500 relative text-sm">
                    <i className="fas fa-exclamation-triangle me-1"></i>{" "}
                    {formikObj.errors.phone}
                  </div>
                ) : (
                  ""
                )}
                {!formikObj.touched.phone ? (
                  ""
                ) : formikObj.errors.phone && formikObj.touched.phone ? (
                  <i className="failicon position-absolute fa-solid fa-circle-xmark"></i>
                ) : (
                  <i className="validicon position-absolute fa-solid fa-circle-check"></i>
                )}
                <label htmlFor="phone">Phone</label>
              </div>
              <div className="form-floating  col-12 mb-5">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.password}
                  type="password"
                  className={`form-control ${
                    !formikObj.touched.password
                      ? ""
                      : formikObj.errors.password && formikObj.touched.password
                      ? "errorinput"
                      : "validinput"
                  }`}
                  id="password"
                  name="password"
                  placeholder="Password"
                />{" "}
                {formikObj.errors.password && formikObj.touched.password ? (
                  <div className="errormsg text-red-500 relative text-sm">
                    <i className="fas fa-exclamation-triangle me-1"></i>{" "}
                    {formikObj.errors.password}
                  </div>
                ) : (
                  ""
                )}
                {!formikObj.touched.password ? (
                  ""
                ) : formikObj.errors.password && formikObj.touched.password ? (
                  <i className="failicon position-absolute fa-solid fa-circle-xmark"></i>
                ) : (
                  <i className="validicon position-absolute fa-solid fa-circle-check"></i>
                )}
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating  col-12 mb-4">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.passwordConfirm}
                  type="password"
                  className={`form-control ${
                    !formikObj.touched.passwordConfirm
                      ? ""
                      : formikObj.errors.passwordConfirm &&
                        formikObj.touched.passwordConfirm
                      ? "errorinput"
                      : "validinput"
                  }`}
                  id="passwordconfirm"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                />{" "}
                {formikObj.errors.passwordConfirm &&
                formikObj.touched.passwordConfirm ? (
                  <div className="errormsg text-red-500 relative text-sm">
                    <i className="fas fa-exclamation-triangle me-1"></i>{" "}
                    {formikObj.errors.passwordConfirm}
                  </div>
                ) : (
                  ""
                )}
                {!formikObj.touched.passwordConfirm ? (
                  ""
                ) : formikObj.errors.passwordConfirm &&
                  formikObj.touched.passwordConfirm ? (
                  <i className="failicon position-absolute fa-solid fa-circle-xmark"></i>
                ) : (
                  <i className="validicon position-absolute fa-solid fa-circle-check"></i>
                )}
                <label htmlFor="passwordconfirm">Confirm Password</label>
              </div>
            </div>
            {fail ? (
              <div className="alert alert-danger flex justify-between items-start p-2">
                <div>
                  <i className="fas fa-exclamation-circle mr-4  "></i> {fail}
                </div>
              </div>
            ) : (
              ""
            )}
            {success ? (
              <div className="alert alert-success flex justify-between items-start p-2">
                <div>
                  <i className="fas fa-check-circle mr-3"></i> {success}
                </div>
              </div>
            ) : (
              ""
            )}
            <button className={`cta__btn ${signupCSS.btnsubmit}`} type="submit">
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassNamclassName=""
                />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="signwith">
            <button className="flex justify-center items-center hover:bg-bc hover:text-wc transition-all duration-300	">
              <img className="block mr-2" src={googleLogo} alt="" />
              <span className="block">google</span>
            </button>
            <button className="flex justify-center items-center hover:bg-bc hover:text-wc transition-all duration-300	">
              <img className="block mr-2" src={faceLogo} alt="" />
              <span className="block">facebook</span>
            </button>
            <button className="flex justify-center items-center hover:bg-bc hover:text-wc transition-all duration-300	">
              <img className="block mr-2" src={linkedLogo} alt="" />
              <span className="block">linked in</span>
            </button>
          </div>

          <div className="alreadycreate">
            <p>
              <span>already have an account?</span>{" "}
              <Link to="/login">log in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
