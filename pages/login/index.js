import { Field, Form, Formik } from "formik";

export default function LoginPage() {
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
            onSubmit={(val) => console.log(val)}
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
                      required
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
                      required
                      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md w-full text-sm font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
