import React, { useRef, createRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import axios from "axios";
// import OtpCell from "./otpcell";

const Otp = () => {
  const dummy = [1, 1, 1, 1, 1, 1];
  const [otpinvalid, showOtpInvalid] = useState(false);
  const refs = useRef([]);
  // const [resend, setResend] = useState(true);
  //const refs = useRef(dummy.map(() => React.createRef()));
  const token = JSON.parse(localStorage.getItem("accesstoken"));
  const headers = { Authorization: `Bearer ${token}` };
  let params = { id: JSON.parse(localStorage.getItem("player_id")) };

  const navigate = useNavigate();

  const {
    register,
    formState: { errors: errors1 },
    control,
    reset,
    setValue,
    handleSubmit,
  } = useForm();

  // useEffect(() => {

  // }, []);

  const changefocus = (e) => {
    let k = parseInt(e.currentTarget.getAttribute("cell"));
    if (k != dummy.length - 1 && refs.current[k].value.length > 0)
      refs.current[k + 1].focus();
    else if (
      k != 0 &&
      refs.current[k].value.length == 0 &&
      refs.current[k - 1].value.length > 0
    ) {
      refs.current[k - 1].focus();
    }
  };

  const verify = async (data) => {
    console.log(params);
    console.log("tokenn : ", token);
    if (
      localStorage.getItem("page") != null &&
      localStorage.getItem("page") == 0
    ) {
      //login otp
      await axios
        .post("https://eplaza-backend.onrender.com/verifyotp", data, {
          params,
          headers,
        })
        .then((res) => {
          if (res.status == 200) {
            // navigate("/");
            if (res.data.admin) navigate("/adminHome");
            else navigate("/shopping");
          }
        })
        .catch((err) => showOtpInvalid(true));
    } else {
      //signup otp
      await axios
        .post("https://eplaza-backend.onrender.com/verifysignupotp", data, {
          params,
        })
        .then((res) => {
          if (res.status == 200) {
            localStorage.clear();
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          showOtpInvalid(true);
        });
    }
  };

  const resend = () => {
    let data = {};
    setValue("otp", "");
    axios
      .post("https://eplaza-backend.onrender.com/signup-otp", data, {
        params,
        headers,
      })
      .then((res) => {
        console.log("mail sent!");
      })
      .catch((err) => console.log(err));
  };

  const TryAgain = () => {
    showOtpInvalid(false);
  };

  return (
    <div>
      {otpinvalid ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-8/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl justify-center align-center font-semibold">
                    Uh Oh!
                  </h3>
                </div>
                {/*body*/}
                <div className="text-3xl leading-none font-semibold">
                  {" "}
                  OTP Invalid!
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={TryAgain}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div class="flex flex-col items-center justify-center text-center space-y-2">
              <div class="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>
                  We have sent a code to your email
                  {` ${JSON.parse(localStorage.getItem("email"))}`}
                </p>
              </div>
            </div>

            <div>
              <form action="" method="post">
                <div class="flex flex-col space-y-16">
                  {/* <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {dummy.map((ref, k) => {
                      return (
                        <div cell={k} class="w-16 h-16 mx-1">
                          <input
                            ref={(el) => (refs.current[k] = el)}
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            cell={k}
                            onChange={changefocus}
                            type="text"
                            name=""
                            id=""
                          ></input>
                        </div>
                      );
                    })}
                  </div> */}
                  <div>
                    <Controller
                      control={control}
                      name="otp"
                      rules={{
                        required: true,
                        pattern: /^[0-9]*$/,
                        minLength: 6,
                      }}
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <OtpInput
                          value={value}
                          onChange={onChange}
                          numInputs={6}
                          renderSeparator={
                            <span style={{ width: "20px" }}>-</span>
                          }
                          renderInput={(props) => <input {...props} />}
                          isInputNum={true}
                          shouldAutoFocus={true}
                          inputStyle={{
                            border: error
                              ? " solid 2px red"
                              : "1px solid transparent",
                            backgroundColor: "rgba(0,0,0, 0.1)",
                            borderRadius: "8px",
                            width: "54px",
                            height: "54px",
                            fontSize: "12px",
                            color: "black",
                            fontWeight: "400",
                            caretColor: "blue",
                          }}
                          focusStyle={{
                            border: "1px solid #CFD3DB",
                            outline: "none",
                          }}
                        />
                      )}
                    />
                  </div>
                  <div class="flex flex-col space-y-5">
                    <div>
                      <button
                        onClick={handleSubmit(verify)}
                        class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button>
                    </div>

                    <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        class="flex flex-row items-center text-blue-600"
                        onClick={resend}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
