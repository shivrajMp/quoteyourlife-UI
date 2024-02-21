import { Form, Field } from "react-final-form";
import { useContext, useEffect } from "react";
import { MyContext } from "../../context/context";
import { useDispatch, useSelector } from "react-redux";
import {
  apiError,
  apiSuccess,
  resetData,
  startLoading,
  stopLoading,
} from "../../statemange/registerslice";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const { updateValue } = useContext(MyContext);
  const dispatch = useDispatch();
  const { registerloading, registerdata, registererror } = useSelector((state) => state.register);
  

  const registerUser = (useInfo) => {
    dispatch(startLoading());
    fetch("https://quote-your-life.onrender.com/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(useInfo),
    })
      .then((response) => {
        console.log(response, "response");
        if (!response.ok) {
          let message = "Server Error";
          if (response.status === 409) {
            message = "User already exist.";
          }

          dispatch(apiError(message));
          throw new Error("Server Error");
        }
        return response.json();
      })
      .then((json) => {
        console.log(json, "json");
        dispatch(apiSuccess(json));
      })
      .catch((error) => {
        console.log(error, "errors");
        dispatch(apiError(error));
      })
      .finally(() => {
        dispatch(stopLoading()); // Set formSubmitting back to false after completing form submission
      });
  };

  const onSubmit = (values) => {
    // Handle form submission, e.g., send data to server
    console.log("Form values:", values);
    registerUser(values);
  };

  const loginAccountClick = () => {
    updateValue("login");
  };
  const handlePasswordChange = (value) => {
    if (!value) {
      return "Password is required";
    } else if (value.length < 8) {
      return "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])/.test(value)) {
      return "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(value)) {
      return "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(value)) {
      return "Password must contain at least one digit";
    } else if (!/(?=.*[^\da-zA-Z])/.test(value)) {
      return "Password must contain at least one special character";
    }
    return undefined; // Return undefined if validation passes
  };

  const validateConfirmPassword = (value, allValues) => {
    if (!value) {
      return "Confirm Password is required";
    } else if (value !== allValues.password) {
      return "Passwords do not match";
    }
    return undefined; // Return undefined if validation passes
  };
  return (
    <>
      {" "}
   
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Your logo and title */}
          <img
            className="mx-auto h-8 w-auto"
            src={`${process.env.PUBLIC_URL}/logo_.png`}
            alt="Your Company"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>
        <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username">User Name</label>
                  <Field
                    name="username"
                    component="input"
                    type="text"
                    autoComplete="username"
                    required
                    disabled={registerloading}
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="w-full flex justify-start gap-6">
                  <div>
                    <label htmlFor="first_name">First Name</label>
                    <Field
                      name="first_name"
                      component="input"
                      type="text"
                      autoComplete="first_name"
                      required
                      disabled={registerloading}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name">Last Name</label>
                    <Field
                      name="last_name"
                      component="input"
                      type="text"
                      autoComplete="last_name"
                      required
                      disabled={registerloading}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={registerloading}
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    component="input"
                    type="password"
                    autoComplete="password"
                    required
                    disabled={registerloading}
                    validate={(value) => handlePasswordChange(value)}
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <Field
                    name="password"
                    subscription={{ error: true, touched: true }}
                  >
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span className="text-red-500">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>{" "}
                  {/* Display password error if exists */}
                </div>
                <div>
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <Field
                    name="confirm-password"
                    component="input"
                    type="password"
                    autoComplete="confirm-password"
                    required
                    disabled={registerloading}
                    validate={(value, allValues) =>
                      validateConfirmPassword(value, allValues)
                    }
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <Field
                    name="confirm-password"
                    subscription={{ error: true, touched: true }}
                  >
                    {({ input, meta }) => (
                      <div>
                        {meta.error && meta.touched && (
                          <span className="text-red-500">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus:outline-none ${
                      registerloading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-500"
                    }`}
                    disabled={registerloading}
                  >
                    {registerloading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.291 0-4.414-.784-6.122-2.209l1.51-1.51c1.197 1.16 2.754 1.719 4.379 1.719 3.309 0 6-2.691 6-6s-2.691-6-6-6c-2.021 0-3.822.998-4.938 2.533l-1.502-1.502A7.96 7.96 0 0112 4v4c4.418 0 8-3.582 8-8h-4a3.967 3.967 0 00-3.013 1.367l1.51 1.51A5.958 5.958 0 0118 8c3.309 0 6 2.691 6 6s-2.691 6-6 6a5.944 5.944 0 01-3.717-1.311l-1.511 1.511A7.963 7.963 0 0112 20h4c0-4.418-3.582-8-8-8z"
                          ></path>
                        </svg>
                        <span>Signing up...</span>
                      </div>
                    ) : (
                      <span>Register</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          />
          <p className="mt-5 text-start text-sm text-gray-500">
            Already user?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={loginAccountClick}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
