import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "../../context/context";
import { resetData } from "../../statemange/registerslice";

function MessageNotification() {
  const dispatch = useDispatch();
  const { registerloading, registerdata, registererror } = useSelector(
    (state) => state.register
  );

  const { currentdialog, updateValue, currentNotification, openNotification } =
    useContext(MyContext);

    useEffect(() => {
      if(currentNotification.type === 'success'){
        toast.success(currentNotification.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if(currentNotification.type === 'error'){
        toast.error(currentNotification.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }, [currentNotification])
    
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

  const { postquoteloading, postquotedata, postquoteerror } = useSelector(
    (state) => state.postquote
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
  return (
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
  );
}

export default MessageNotification;
