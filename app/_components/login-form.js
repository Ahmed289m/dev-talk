"use client";
import { login } from "@/redux/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { useToken } from "../_contexts/useToken";

function LoginForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const { setToken } = useToken();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(login(values))
          .unwrap()
          .then((data) => {
            Swal.fire({
              title: "Success!",
              text: "You have logged in successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
            setToken(true);
            router.push("/posts");
          })
          .catch((error) => {
            Swal.fire({
              title: "Login Failed",
              text: error || "Invalid email or password.",
              icon: "error",
              confirmButtonText: "Try Again",
            });
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Field
                type="checkbox"
                name="remember"
                className="h-4 w-4 text-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-gray-700">
                Remember me
              </label>
            </div>
            <div className="ml-auto">
              <Link
                href="/forgetpass"
                className="text-gray-600 hover:text-gray-900"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full bg-green-200 hover:bg-green-300 text-green-800 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {loading || isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
