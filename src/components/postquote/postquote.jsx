import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../context/context";
import authService from './../../services/authService';
function PostQuote() {
  const [quote, setQuote] = useState('');
  const { currentdialog, updateValue } = useContext(MyContext);
  useEffect(() => {
  }, [currentdialog]);
  const closeDialog = () => {
    updateValue("");
  };
  const styles = {
    container: {
 
      '&:focus-visible': { // Apply styles for :focus-visible
        outline: 'none !important' ,
      },
    }
  };
  const postQuote = () => {
    // dispatch(resetData());
    // dispatch(startLoading());
    const useInfo  = authService.getUser()
    const token  = authService.getToken()
    fetch("https://quote-your-life.onrender.com/quotes/create", {
    
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "userId": useInfo?.id,
        "authorization": 'Bearer'+token
      },
      body:{
        "quote": quote,
        "quote_category": "MOTIVATIONAL"
      }
      
    })
      .then((response) => {
        if (!response?.ok) {
          let message = "Server Error";
          if (response.status === 402) {
            message = "Invalid User.";
          }
          // dispatch(apiError(message));
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        // dispatch(apiError(error?.message || ""));
      })
      .finally(() => {
        // dispatch(stopLoading()); // Set formSubmitting back to false after completing form submission
      });
  };
  // const cancelButtonRef = useRef(null);
  const setValue = (event)=>{
    setQuote(event?.target?.value || '')
  }
  return (
    <Dialog
      open={currentdialog == "post"}
      onClose={closeDialog}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" style={{backgroundColor:'rgb(107 114 128 / var(--tw-bg-opacity))'}} />

      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-white p-8 max-w-screen-lg w-full h-full overflow-y-auto"
          style={{
            zIndex: "10000",
            minHeight: "20vh",
            minWidth: "90%",
            margin: "10px",
            borderRadius: "8px",
            // boxShadow: "1px 2px 18px aliceblue",
          }}
        >
          <div className="flex flex-col items-end">
            {/* Textarea */}
            <div className="w-full" style={styles.container}>
              <textarea
              style={styles.container}
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md resize-none"
                rows="4"
                onChange={(event)=>setValue(event)}
              ></textarea>
            </div>

            {/* Post Button */}
            <div className="flex items-center gap-2">
            <button
              onClick={closeDialog}
              // inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto
              class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  mt-2"
            >
              Close
            </button>
            <button
              onClick={postQuote}
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  mt-2"
            >
              Quote
            </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default PostQuote;
