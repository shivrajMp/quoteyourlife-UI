import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/footer/footer";
import { useContext, useEffect, useRef, useState } from "react";
import Body from "./components/body/body";
import Header from "./components/header/header";
import Filter from "bad-words";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { apiError, apiSuccess, startLoading } from "./statemange/slice";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { MyContext } from "./context/context";
import PostQuote from "./components/postquote/postquote";
import authService from "./services/authService";
import Notification from "./components/notifications/notification";
import { ToastContainer, toast } from "react-toastify";
import { resetData } from "./statemange/registerslice";

const user = {
  name: "Raj Pattan",
  email: "rpattan@gmail.com",
};
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
  { name: "Login", id: "login", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.api);
  const { currentdialog, updateValue } = useContext(MyContext);

  const { registerloading, registerdata, registererror } = useSelector(
    (state) => state.register
  );

  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const { loginloading, logindata, loginerror } = useSelector(
    (state) => state.login
  );
  useEffect(() => {
    if (registerdata && registerdata?.id) {
      showSuccess("Congratulations! You have successfully registered.");
      updateValue("login");
      dispatch(resetData());
    } else {
      showError(registererror);
    }
  }, [dispatch, registerdata, registererror]);

  useEffect(() => {
    if (logindata && logindata?.token_type) {
      showSuccess("You have successfully logged in.");
      updateValue("");
    } else {
      showError(loginerror);
    }
  }, [logindata, loginerror]);

  useEffect(() => {
    dispatch(startLoading());
    fetch("https://quote-your-life.onrender.com/quotes/list")
      .then((response) => response.json())
      .then((json) => dispatch(apiSuccess(json)))
      .catch((error) => dispatch(apiError(error)));
  }, [dispatch]);
  const handleItemClick = (itemName) => {
    if (itemName === "login") {
      updateValue("login");
    }
    // Do something with the item's name
  };

  const postQuote = () => {
    const isAuthenticated = authService.isAuthenticated();
    console.log(isAuthenticated);
    updateValue(isAuthenticated ? "post" : "login");
  };
  useEffect(() => {
    console.log(currentdialog, "currentdialog");
  }, [currentdialog]);

  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const cancelButtonRef = useRef(null);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="min-h-full">
        <Disclosure
          as="nav"
          className="bg-gray-800 z-10"
          style={{ position: "sticky", top: "0" }}
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w- px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex gap-2 items-center">
                      <img
                        className="h-8 w-8"
                        src={`${process.env.PUBLIC_URL}/logo_.png`}
                        alt="Your Company"
                      />
                      <p class="italic  text-2xl text-white">Quote Your Life</p>
                    </div>
                    <div className="hidden md:block">
                      {/* <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div> */}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <span className="text-white">Username</span>
                      {/* <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <UserIcon className="h-6 w-6 white text-white " />{" "}
                            {/* Adjust the size as needed */}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <span
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer" // Add cursor-pointer class
                                    )}
                                    onClick={() => handleItemClick(item?.id)} // Call handleItemClick method with item's name
                                  >
                                    {item.name}
                                  </span>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {/* {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))} */}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        // src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={() => handleItemClick(item?.id)}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow z-10">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Post
            </h1> */}
            <button
              onClick={postQuote}
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  mt-2"
            >
              Quote
            </button>
          </div>
        </header>
        <main>
          {/* <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"> */}
          {/* {(data||[])?.map((info)=>{
              return <>d</>
            })} */}
          <div className="flex justify-center  min-h-screen">
            <div className="max-w-md border border-gray-200 rounded-lg p-4 space-y-4 w-full min-w-[50%]">
              {(data || []).map((quote) => (
                <div
                  className="bg-cover border border-gray-300 p-4 px-6 quote-container "
                  // style={{
                  //   backgroundImage: `${process.env.PUBLIC_URL}/logo512.png`,
                  //   height: "450px",
                  // }}
                  // className="quote-container "
                >
                  <p
                    style={{ color: "#464f5c" }}
                    className="rounded-l    whitespace-pre-wrap text-xl font-oswald text-primary-800  text-xl font-medium text-start leading-relaxed sm:text-3xl custom-gray font-black p-3"
                  >
                    " {atob(quote?.quote)} "
                  </p>
                  <p className="text-gray-500 mx-2">
                    -
                    {` ${
                      quote?.first_name?.charAt(0)?.toUpperCase() +
                      quote?.first_name?.slice(1)
                    } ${
                      quote?.last_name?.charAt(0).toUpperCase() +
                      quote?.last_name?.slice(1)
                    }`}
                  </p>
                  <div className="flex items-end space-x-2 h-16 justify-between">
                    <div>
                      <span>{quote?.quote_category}</span>
                    </div>
                    <span className="flex items-center gap-2">
                      <HeartIcon
                        className={`h-5 w-5 cursor-pointer transition-transform duration-300 transform ${
                          liked ? "scale-125 text-red-500" : ""
                        }`}
                        onClick={handleLikeClick}
                      />
                      <span>{quote?.likes}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Transition.Root show={!!currentdialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={updateValue}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <>
                    {currentdialog === "login" ? (
                      <Login />
                    ) : currentdialog === "register" ? (
                      <Register />
                    ) : null}
                  </>
                  {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <PostQuote />
    </>
  );
}

export default App;
