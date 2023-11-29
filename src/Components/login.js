/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useForm, useController, Controller } from "react-hook-form";
import axios from "axios";
import { Switch } from "@headlessui/react";
import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [showExistModal, setShowExistModal] = useState(false);

  const {
    register,
    formState: { errors: errors1 },
    control,
    reset,
    setValue,
    handleSubmit,
  } = useForm();

  const [admin, setAdmin] = useState(false);
  const submitref = useRef(null);

  const navigate = useNavigate();

  const login_submit = async (data) => {
    localStorage.setItem("page", 0);
    submitref.current.disabled = true;
    // data["admin"] = admin;
    console.log(data);
    await axios
      .post("https://eplaza-backend.onrender.com/api/login", data)
      .then((res) => {
        // //console.log(res.data);
        localStorage.setItem(
          "accesstoken",
          JSON.stringify(res.data.accessToken)
        );
        localStorage.setItem("player_id", JSON.stringify(res.data.id));
        // const token = JSON.parse(localStorage.getItem("accesstoken"));
        const headers = { Authorization: `Bearer ${res.data.accessToken}` };
        let params = { id: res.data.id };
        if (res.status == 200) {
          localStorage.setItem("email", JSON.stringify(res.data.email));
          console.log(res.data);
          axios
            .post("https://eplaza-backend.onrender.com/send-otp", data, {
              params,
              headers,
            })
            .then((res) => {
              console.log("mail sent!");
            })
            .catch((err) => console.log(err));
          submitref.current.disabled = false;
          navigate("/otp");
          // if (res.data.admin) navigate("/adminHome");
          // else navigate("/shopping");
        }
      })
      .catch((err) => {
        submitref.current.disabled = false;
        console.log(err);
        setShowExistModal(true);
      });
  };

  const TryAgain = () => {
    setShowExistModal(false);
  };

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {showExistModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-8/12 my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl justify-center align-center font-semibold">
                      Oh No!
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="text-3xl leading-none font-semibold">
                    {" "}
                    Incorrect Username or Password!
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={TryAgain}
                    >
                      Okay
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-40 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-left text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  {...register("username", {
                    required: true,
                    pattern: /^[a-zA-Z0-9.,\s]+$/i,
                  })}
                  style={{ border: errors1.username && " solid 2px red" }}
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div>
              <label
                htmlFor="email"
                className="block text-left text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[0-9a-z]+@gmail.com$/i,
                  })}
                  style={{ border: errors1.email && " solid 2px red" }}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    required: true,
                    pattern: /^[a-zA-Z0-9.,\s]+$/i,
                  })}
                  style={{ border: errors1.password && " solid 2px red" }}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                ref={submitref}
                onClick={handleSubmit(login_submit)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send OTP
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a customer yet?{" "}
            <Link
              to="/signup"
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
