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
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { useForm, useController, Controller } from "react-hook-form";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Signup() {
  const [showExistModal, setShowExistModal] = useState(false);
  const {
    register,
    formState: { errors: errors1 },
    control,
    reset,
    setValue,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const signup_submit = async (data) => {
    // //console.log(data);
    await axios
      .post("https://eplaza-backend.onrender.com/api/signup", data)
      .then((res) => {
        if (res.status == 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.status == 413) {
          setShowExistModal(true);
        }
      });
  };

  const [agreed, setAgreed] = useState(false);

  const TryAgain = () => {
    setShowExistModal(false);
  };

  return (
    <div className="isolate bg-indigo-950 px-6 py-24 sm:py-32 lg:px-8">
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
                  User Already Exists!
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
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Sign Up
        </h2>
        <p className="mt-2 text-lg leading-8 text-slate-300">Almost there!</p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-10"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Username
            </label>
            <div className="mt-2.5">
              <input
                {...register("username", {
                  required: true,
                  pattern: /^[a-zA-Z0-9.,\s]+$/i,
                })}
                style={{ border: errors1.username && " solid 2px red" }}
                type="text"
                name="username"
                id="username"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Password
            </label>
            <div className="mt-2.5">
              <input
                {...register("password", {
                  required: true,
                  pattern: /^[a-zA-Z0-9.,\s]+$/i,
                })}
                style={{ border: errors1.password && " solid 2px red" }}
                type="password"
                name="password"
                id="password"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Confirm Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                {...register("confirmpassword", {
                  required: true,
                  pattern: /^[a-zA-Z0-9.,\s]+$/i,
                })}
                style={{ border: errors1.confirmpassword && " solid 2px red" }}
                name="confirmpassword"
                id="confirmpassword"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[0-9a-z.]+@gmail.com$/i,
                })}
                style={{ border: errors1.email && " solid 2px red" }}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              {/* <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                  <option>IN</option>
                </select>
                <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div> */}
              <input
                type="text"
                {...register("phone", {
                  required: true,
                  pattern: /^[0-9]+$/i,
                })}
                style={{ border: errors1.phone && " solid 2px red" }}
                name="phone"
                id="phone"
                // autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div> */}
        </div>
        <div className="mt-10">
          <button
            type="submit"
            onClick={handleSubmit(signup_submit)}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
