import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/footer/footer";
import { useContext, useEffect, useRef, useState } from "react";
import Body from "./components/body/body";
// import Footer from "./components/footer/footer";
import Filter from "bad-words";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ContentLoader, { Instagram } from "react-content-loader";

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

import { Avatar } from "@mui/material";
import UserProfileIcon from "./components/extra/avatar";
import MessageNotification from "./components/notifications/notification";
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", id: "logout", href: "#" },
  // { name: "Login", id: "login", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const MyInstagramLoader = () => <Instagram />;
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.api);
  const { currentdialog, updateValue } = useContext(MyContext);
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
    if (itemName === "logout") {
      authService.logout();
    }
    // Do something with the item's name
  };
  const userinfo = authService.getUser();
  const postQuote = () => {
    const isAuthenticated = authService.isAuthenticated();
    updateValue(isAuthenticated ? "post" : "login");
  };
  useEffect(() => {
    console.log(currentdialog, "currentdialog");
    setIsOpen(false);
  }, [currentdialog]);

  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };
  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      localStorage.clear();
    }
  });

  useEffect(() => {
    if (!userinfo?.id && currentdialog === "") {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array to run effect only once after initial render

  const cancelButtonRef = useRef(null);
  return (
    <>
      <MessageNotification />

      <div className="min-h-full">
        <Disclosure
          as="nav"
          className="bg-gray-800 z-10"
          style={{ position: "sticky", top: "0", boxShadow: "0 2px 2px gray" }}
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w- px-4 sm:px-6 lg:px-8">
                <div className="flex h-12 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex gap-2 items-center">
                      <img
                        className="h-8 w-8"
                        src={`${process.env.PUBLIC_URL}/logo_.png`}
                        alt="Your Company"
                      />
                      <p class="italic  text-2xl text-white">Quote Your Life</p>
                    </div>
                    <div className="hidden md:block"></div>
                  </div>
                  {userinfo?.id && authService.isAuthenticated() ? (
                    <>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <span className="text-white">{`${
                            userinfo?.username || ""
                          }`}</span>

                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                {userinfo?.id ? (
                                  <div className="h-10 w-10 rounded-full bg-white">
                                    <UserProfileIcon size={40} />
                                  </div>
                                ) : (
                                  <UserIcon className="h-6 w-6 white text-white " />
                                )}
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
                                        onClick={() =>
                                          handleItemClick(item?.id)
                                        } // Call handleItemClick method with item's name
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
                      </div>{" "}
                    </>
                  ) : (
                    <button
                      onClick={() => handleItemClick("login")}
                      type="submit"
                      class="flex justify-center items-center m-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  mt-2"
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3"></div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {/* <img
                        className="h-10 w-10 rounded-full"
                        // src={user.imageUrl}
                        alt=""
                      /> */}
                      <div className="h-10 w-10 rounded-full bg-white">
                        <UserProfileIcon size={40} />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {userinfo?.firstname}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {userinfo?.email}
                      </div>
                    </div>
                    {/* <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
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
          <div className="flex justify-center  min-h-screen">
            <div className="max-w-md  p-4 space-y-4 w-full min-w-[50%]">
              {data && data.length ? (
                (data || []).map((quote) => (
                  <div className="bg-cover border border-gray-300 p-4 px-6 quote-container ">
                    <p
                      style={{ color: "#464f5c" }}
                      className="rounded-l    whitespace-pre-wrap text-xl font-oswald text-primary-800  text-xl font-medium text-start leading-relaxed sm:text-3xl custom-gray font-black p-3"
                    >
                      " {atob(quote?.quote)} "
                    </p>
                    <p className="text-gray-500 mx-2">
                      -
                      {/* {` ${
                        quote?.first_name?.charAt(0)?.toUpperCase() +
                        quote?.first_name?.slice(1)
                      } ${
                        quote?.last_name?.charAt(0).toUpperCase() +
                        quote?.last_name?.slice(1)
                      }`} */}
                      {` ${quote?.username}`}
                    </p>
                    <p className="text-gray-500 mx-2">
                      {`( ${
                        quote?.first_name?.charAt(0)?.toUpperCase() +
                        quote?.first_name?.slice(1)
                      } ${
                        quote?.last_name?.charAt(0).toUpperCase() +
                        quote?.last_name?.slice(1)
                      } )`}
                    </p>

                    <div className="flex items-end space-x-2 h-16 justify-between">
                      <div>
                        <span>{quote?.quote_category}</span>
                      </div>
                      <span className="flex items-center gap-2">
                        <HeartIcon
                          key={quote?.id}
                          className={`h-5 w-5 cursor-pointer transition-transform duration-300 transform ${
                            liked ? "scale-125 text-red-500" : ""
                          }`}
                          onClick={handleLikeClick}
                        />
                        <span>{quote?.likes}</span>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <ContentLoader
                  speed={2}
                  width={"100%"}
                  height={460}
                  viewBox="0 0 100% 460"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="5" rx="2" width="100%" height="460" />
                </ContentLoader>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <Transition.Root
        show={["login", "register"].includes(currentdialog)}
        as={Fragment}
      >
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <PostQuote />
      {isOpen && (
        <div className="relative">
          <div
            className={`fixed inset-x-0 bottom-0 bg-white z-50 p-4 transition-transform duration-500 transform ${
              isOpen ? "translate-y-0" : "translate-y-full"
            }`}
            style={{
              boxShadow: isOpen ? " -1px -2px 16px #8a8787d9" : "none",
              borderTopLeftRadius: "13px",
              borderTopRightRadius: "13px",
            }}
          >
            {isOpen && (
              <div className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-12">
                <div
                  className="w-16 h-16  border-4 border-white-500  rounded-full flex items-center justify-center"
                  style={{
                    background: "#1F2937",
                    boxShadow: "0px -4px 3px #8a8787d9",
                  }}
                >
                  <img
                    className="mx-auto h-8 w-auto"
                    src={`${process.env.PUBLIC_URL}/logo_.png`}
                    alt="Your Company"
                  />
                </div>
              </div>
            )}
            <div className="flex items-center justify-center mt-4">
              <div className="flex flex-col justify-center  w-full">
                <p className="text-lg font-medium flex items-center justify-center">
                  Login to post your own Quotes.
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleItemClick("login");
                  }}
                  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  mt-2"
                >
                  Login
                </button>

                <a
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 block flex items-center justify-center text-sm mt-3"
                  onClick={() => setIsOpen(false)}
                >
                  Not Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
