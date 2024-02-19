import React, { createContext, useEffect, useState } from "react";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [currentdialog, setcurrentDialog] = useState('');
  useEffect(() => {
    console.log(currentdialog)
   }, [currentdialog])
   
  const updateValue = (newValue) => {
    console.log(newValue)
    setcurrentDialog(newValue);
  };

  


  return (
    <MyContext.Provider
      value={{ currentdialog, updateValue  }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
