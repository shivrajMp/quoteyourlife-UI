import { Form, Field } from "react-final-form";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/context";
import { useDispatch, useSelector } from "react-redux";
import {
  apiError,
  apiSuccess,
  resetData,
  startLoading,
  stopLoading,
} from "../../statemange/loginslice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../services/authService";
function Login() {
  const loginUser = (useInfo) => {
    dispatch(resetData());
    dispatch(startLoading());
    fetch("https://quote-your-life.onrender.com/quoteyourlife/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...useInfo,
      },
    })
      .then((response) => {
        if (!response?.ok) {
          let message = "Server Error";
          if (response.status === 400) {
            message = "Invalid credentials.";
          }
          if (response.status === 402) {
            message = "Invalid User.";
          }
          dispatch(apiError(message));
        }
        return response.json();
      })
      .then((data) => {
        if (data?.token_type) {
          authService.setToken(data?.access_token);
          authService.setUser(data?.user);
          dispatch(apiSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(apiError(error?.message || ""));
      })
      .finally(() => {
        dispatch(stopLoading()); // Set formSubmitting back to false after completing form submission
      });
  };

  const { updateValue } = useContext(MyContext);
  const dispatch = useDispatch();
  const { loginloading, logindata, loginerror } = useSelector(
    (state) => state.login
  );
  const createAccountClick = () => {
    updateValue("register");
  };
  const onSubmit = (values) => {
    loginUser(values);
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
   
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-4 adata"  >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"  style={{width:'100%'}}>
          {/* Your logo and title */}
          <img
            className="mx-auto h-8 w-auto"
            src={`${process.env.PUBLIC_URL}/logo_.png`}
            alt="Your Company"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
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
                    disabled={loginloading}
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <div className="relative">
                    <Field
                      name="password"
                      component="input"
                      type={showPassword ? "text" : "password"}
                      autoComplete="password"
                      required
                      disabled={loginloading}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
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
                  <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus:outline-none ${
                      loginloading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-500"
                    }`}
                    disabled={loginloading}
                  >
                    {loginloading ? (
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
                        <span>Login In...</span>
                      </div>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          />
          <p className="mt-5 text-start text-sm text-gray-500">
            {/* Not a member?{" "} */}
            Don't have an account? &nbsp;
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={createAccountClick}
            >
              Register
            </a>
          </p>
        </div>
      </div>
  
  );
}

export default Login;
