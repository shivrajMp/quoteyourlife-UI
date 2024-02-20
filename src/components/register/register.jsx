import { Form, Field } from "react-final-form";
import { useContext } from "react";
import { MyContext } from "../../context/context";

function Register() {
  const { updateValue } = useContext(MyContext);

  const onSubmit = (values) => {
    // Handle form submission, e.g., send data to server
    console.log("Form values:", values);
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Your logo and title */}
        <img
          className="mx-auto h-8 w-auto"
          src={`${process.env.PUBLIC_URL}/logo_.png`}
          alt="Your Company"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>
      <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="user-name">User Name</label>
                <Field
                  name="user-name"
                  component="input"
                  type="text"
                  autoComplete="user-name"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-full flex justify-start gap-6">
                <div>
                  <label htmlFor="first-name">First Name</label>
                  <Field
                    name="first-name"
                    component="input"
                    type="text"
                    autoComplete="first-name"
                    required
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label htmlFor="last-name">Last Name</label>
                  <Field
                    name="last-name"
                    component="input"
                    type="text"
                    autoComplete="last-name"
                    required
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
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
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
  );
}

export default Register;
