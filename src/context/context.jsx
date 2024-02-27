import React, { createContext, useEffect, useState } from "react";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [currentdialog, setcurrentDialog] = useState("");
  const [currentNotification, setNotification] = useState({});

  const updateValue = (newValue) => {
    setcurrentDialog(newValue);
  };

  const openNotification = (newValue) => {
    setNotification(newValue);
  };

  return (
    <MyContext.Provider
      value={{
        currentdialog,
        updateValue,
        currentNotification,
        openNotification,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider, };
