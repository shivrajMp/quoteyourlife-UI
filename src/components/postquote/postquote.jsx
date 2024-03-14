import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MyContext } from "../../context/context";
import authService from "./../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  apiError,
  apiSuccess,
  resetData,
  startLoading,
  stopLoading,
} from "../../statemange/postquote";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { QUOTE_TYPE } from "../../constants/contants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function PostQuote() {
  const { postquoteloading,} = useSelector(
    (state) => state.postquote
  );
  const [quote, setQuote] = useState("");
  const { currentdialog, updateValue, currentNotification, openNotification } =
    useContext(MyContext);
  useEffect(() => {}, [currentdialog]);
  const closeDialog = () => {
    updateValue("");
  };

  const styles = {
    container: {
      "&:focus-visible": {
        // Apply styles for :focus-visible
        outline: "none !important",
      },
    },
  };

  const quoteTypes = useMemo(() => {
    return Object.entries(QUOTE_TYPE).map(([key, value]) => {
      console.log(key, value);
      return { id: key, value };
    });
  }, [QUOTE_TYPE]);

  const [selected, setSelected] = useState(quoteTypes[0]);

  const dispatch = useDispatch();
  const postQuote = () => {
    dispatch(resetData());
    dispatch(startLoading());

    const userInfo = authService.getUser();
    const token = authService.getToken();
    fetch("https://quote-your-life.onrender.com/quotes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
        userId: userInfo?.id,
      },
      body: JSON.stringify({
        quote: quote,
        quote_category: selected?.id,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          openNotification({
            type: "success",
            message: "Quote posted successfully.",
          });
        }
        if (!response?.ok) {
          let message = "Server Error.";
          if (response.status === 401) {
            authService.logout();
            message = "Token has expired.";
          }
          openNotification({
            type: "error",
            message: message,
          });
          dispatch(apiError(message));
        }
        return response.json();
      })
      .then((json) => {
        dispatch(apiSuccess(json));
        updateValue("");
      })
      .catch((error) => {
        dispatch(apiError(error));
      })
      .finally(() => {
        dispatch(stopLoading()); // Set formSubmitting back to false after completing form submission
      });
  };
  // const cancelButtonRef = useRef(null);
  const setValue = (event) => {
    // const quote = (event?.target?.value|| '').split(' ')
    setQuote(event?.target?.value || "");
  };
  return (
    <Dialog
      open={currentdialog === "post"}
      onClose={closeDialog}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <Dialog.Overlay
        className="fixed inset-0 bg-black opacity-50"
        style={{ backgroundColor: "rgb(107 114 128 / var(--tw-bg-opacity))" }}
        disabled={postquoteloading}
      />

      <div className="flex items-center justify-center mt-10" >
        <div
          className="bg-white p-5 max-w-screen-lg w-full h-full overflow-y-auto"
          style={{
            zIndex: "10000",
            minHeight: "60vh",
            minWidth: "90%",
            margin: "10px",
            borderRadius: "8px",
            // boxShadow: "1px 2px 18px aliceblue",
          }}
        >
          <Listbox value={selected} onChange={setSelected} disabled={postquoteloading}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                  Quote Type
                </Listbox.Label>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center h-6">
                      {/* <img
                          src={selected.avatar}
                          alt=""
                          className="h-5 w-5 flex-shrink-0 rounded-full"
                        /> */}
                      <span className="ml-3 block truncate">
                        {selected.value}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {quoteTypes.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                {/* <img
                                    src={person.avatar}
                                    alt=""
                                    className="h-5 w-5 flex-shrink-0 rounded-full"
                                  /> */}
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {person.value}
                                </span>
                              </div>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
          <div className="flex flex-col items-start mt-5">
            {/* Textarea */}
            <div className="w-full" style={styles.container}>
              <textarea
                style={styles.container}
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md resize-none"
                rows="4"
                onChange={(event) => setValue(event)}
                disabled={postquoteloading}
              ></textarea>
            </div>

            {/* Post Button */}
            <div className="flex w-full items-end justify-end">
              <div className="flex items-center gap-2 ">
                <button
                disabled={postquoteloading}
                  onClick={closeDialog}
                  // inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto
                  class={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  mt-2 ${
                     postquoteloading
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-500"
                  }`}
                >
                  Close
                </button>
                <button
                  onClick={postQuote}
                  type="submit"
                  disabled={!quote || quote?.trim().split(" ").length < 2 || postquoteloading}
                  class={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm mt-2 disabled:opacity-50 ${
                    !quote || quote?.trim().split(" ").length < 2 || postquoteloading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  }`} 
                >
                  Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default PostQuote;
