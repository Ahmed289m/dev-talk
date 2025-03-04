"use client";
import { register } from "@/redux/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function SignupForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { firstName, lastName, userName, email, password } = values;

        dispatch(register({ firstName, lastName, userName, email, password }))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Your account has been created successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Registration Failed",
              text: error || "Something went wrong. Please try again.",
              icon: "error",
              confirmButtonText: "Try with another Email",
            });
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="mb-4">
            <div className="flex gap-2.5 mb-4">
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="FirstName"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="LastName"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <label htmlFor="userName" className="block mb-2">
              Username
            </label>
            <Field
              type="text"
              name="userName"
              placeholder="Pick a username"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <Field
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <Field
              type="password"
              name="password"
              placeholder="••••••••••••••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="••••••••••••••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-200 hover:bg-green-300 text-green-800 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
