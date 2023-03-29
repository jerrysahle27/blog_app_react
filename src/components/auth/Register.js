import React from "react";

import { useState, useEffect } from "react";
export default function Register() {
  console.log("I am right here");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // const [loginUser, { isSuccess, isError }] = useLoginUserMutation();
  const handleSubmit = async (event) => {
    //   try {
    //     event.preventDefault();
    //     await loginUser({ email, password }).unwrap();
    //     setEmail("");
    //     setPassword("");
    //   } catch (err) {
    //     console.error("Invalid username or password");
    //   }
  };
  const onNameChange = (e) => setName(e.target.value);
  const onConfirmPasswordCahnge = (e) => setPassword2(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <form action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-6 sm:col-span-4">
            <label
              htmlFor="email-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <input
              type="text"
              name="email-address"
              id="email-address"
              autoComplete="email"
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="password"
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              autoComplete="confirm_password"
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="group relative flex w-full mt-8 justify-center rounded-md bg-gray-800 py-2 px-3 text-sm font-semibold text-white hover:bg-dark-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
