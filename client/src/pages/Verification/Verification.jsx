import React, { useEffect, useState } from "react";
import Owlcarsoulcomp from "../../components/Owlcarsoulcomp/Owlcarsoulcomp";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import verifyCSS from "./verification.module.css";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
export default function Verification() {
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();
  let userVerify = {
    num1: "",
    num2: "",
    num3: "",
    num4: "",
    num5: "",
    num6: "",
  };
  const formikObj = useFormik({
    initialValues: userVerify,
    onSubmit: (values) => {
      let arrValues = Object.values(values).join("");
      signUpCallApi(arrValues, email);
    },
    validate: (values) => {
      setSuccess(null);
      setFail(null);
    },
  });
  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    window.addEventListener("load", () => inputs[0].focus());
    inputs.forEach((input, idx) => {
      input.addEventListener("input", () => {
        const currInput = input;
        const nextInput = input.nextElementSibling;
        if (currInput.value.length > 1) {
          currInput.value = currInput.value.slice(1);
        }
        if (
          nextInput !== null &&
          nextInput.hasAttribute("disabled") &&
          currInput !== ""
        ) {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }
      });
    });

    return () => {
      window.removeEventListener("load", () => inputs[0].focus());
      inputs.forEach((input, idx) => {
        input.removeEventListener("input", () => {
          const currInput = input;
          const nextInput = input.nextElementSibling;
          if (currInput.value.length > 1) {
            currInput.value = currInput.value.slice(1);
          }
          if (
            nextInput !== null &&
            nextInput.hasAttribute("disabled") &&
            currInput !== ""
          ) {
            nextInput.removeAttribute("disabled");
            nextInput.focus();
          }
        });
      });
    };
  }, []);

  async function signUpCallApi(values, emailfunc) {
    const callObj = {
      verificationCode: values,
      email: emailfunc,
    };
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/verify",
        callObj
      );
      setSuccess(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setFail(error.response.data.error);
      setTimeout(() => {
        navigate("/signup");
      }, 5000);
    }
    setLoading(false);
  }
  return (
    <>
      <div className={verifyCSS.signupcon}>
        <Owlcarsoulcomp />
        <div className={`userform ${verifyCSS.verifyform}`}>
          <div className={`userform__title ${verifyCSS.verifyform__title}`}>
            <h4 className="w-100 text-center">get started now</h4>
            <p className="w-100 text-center">verify your account here</p>
          </div>
          <div>
            <div className={verifyCSS.wrapper}>
              <div className={verifyCSS.icon}>
                <i className="fas fa-shield"></i>
              </div>
              <form onSubmit={formikObj.handleSubmit} method="post">
                <div className={verifyCSS.group}>
                  <input
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.num1}
                    id="num1"
                    name="num1"
                    type="number"
                  />
                  <input
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.num2}
                    id="num2"
                    name="num2"
                    type="number"
                    disabled
                  />
                  <input
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.num3}
                    id="num3"
                    name="num3"
                    type="number"
                    disabled
                  />
                  <input
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.num4}
                    id="num4"
                    name="num4"
                    type="number"
                    disabled
                  />
                  <input
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.num5}
                    id="num5"
                    name="num5"
                    type="number"
                    disabled
                  />
                  <input
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.num6}
                    id="num6"
                    name="num6"
                    type="number"
                    disabled
                  />
                </div>
                {fail ? (
                  <div className="alert alert-danger flex  w-100 justify-between items-start p-2">
                    <div>
                      <i className="fas fa-exclamation-circle mr-3"></i> {fail}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {success ? (
                  <div className="alert alert-success w-100 flex justify-between items-start p-2">
                    <div>
                      <i className="fas fa-checkb mr-3"></i> {success}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <button
                  className={`cta__btn w-100 ${verifyCSS.btnsubmit}`}
                  type="submit"
                >
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
                  )}{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
