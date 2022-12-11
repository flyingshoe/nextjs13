import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRef } from "react";
import sha256 from "sha256";
import MyModal from "../../components/modal";

export default function LoginPage() {
  const modalRef = useRef(null);

  const submit = async ({ username, password }) => {
    const res = await axios.post("/api/auth/checkUser", {
      data: {
        username,
        password: sha256(password),
      },
    });

    console.log(res.data);
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back!
            </h2>
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={submit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div className="flex flex-col gap-y-4">
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Username
                    </label>
                    <Field
                      id="username"
                      name="username"
                      autoComplete="username"
                      // required
                      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none sm:text-sm"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      // required
                      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex gap-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md w-full text-sm font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>
                  <div
                    onClick={() => {
                      modalRef.current.openModal();
                    }}
                    disabled={isSubmitting}
                    className="cursor-pointer text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md w-full text-sm font-medium disabled:opacity-50"
                  >
                    Create Account
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <MyModal ref={modalRef} title="Create New Account" />
        </div>
      </div>
    </>
  );
}
