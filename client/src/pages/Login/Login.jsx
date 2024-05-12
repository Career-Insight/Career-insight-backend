import React, { useContext, useState } from "react";
import loginCSS from "./login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Owlcarsoulcomp from "../../components/Owlcarsoulcomp/Owlcarsoulcomp";
import { ThreeDots } from "react-loader-spinner";
import googleLogo from "../../images/iconsgoogle.svg";
import faceLogo from "../../images/logosfacebook.svg";
import linkedLogo from "../../images/logolinked.svg";
import { authContext } from "../../context/authentication";
import Cookies from 'js-cookie';

export default function Login() {
  const { setToken } = useContext(authContext);
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let userLog = {
    email: "",
    password: "",
  };
  let formikObj = useFormik({
    initialValues: userLog,
    onSubmit: (values) => {
      userLogIn(values);
    },
    validate: () => {
      setFail(null);
      setSuccess(null);
    },
  });

  async function userLogIn(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        values
      );
      setSuccess(data.message);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      setToken(data.access_token);
      Cookies.set("token", data.access_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    } catch (error) {
      setFail(error.response.data.msg);
    }
    setLoading(false);
  }
  return (
    <>
      <div className={loginCSS.signupcon}>
        <Owlcarsoulcomp />
        <div className={`userform ${loginCSS.signform}`}>
          <div className="userform__title">
            <h4>get started now</h4>
            <p>easy log in, easy navigate</p>
          </div>
          <form onSubmit={formikObj.handleSubmit}>
            <div className="inputscon">
              <div className="form-floating  col-12 mb-5">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.email}
                  type="email"
                  className={`form-control ${
                    !formikObj.touched.email
                      ? ""
                      : formikObj.touched.email
                      ? "validinput"
                      : ""
                  }`}
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating  col-12 mb-3">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.password}
                  type="password"
                  className={`form-control ${
                    !formikObj.touched.password
                      ? ""
                      : formikObj.touched.password
                      ? "validinput"
                      : ""
                  }`}
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="mb-3 text-lg  font-medium">
                forget{" "}
                <a href="" className="text-pc">
                  password
                </a>{" "}
                ?
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
            <button className={`cta__btn ${loginCSS.btnsubmit}`} type="submit">
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
                "Log In"
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
              <span>create an account?</span> <Link to="/signup">sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
