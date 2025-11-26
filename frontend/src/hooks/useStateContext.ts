import { useContext } from "react";
import { StateContext } from "../contexts/StateContext";

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("useStateContext must be used within ContextProvider");
  }
  // console.log("StateContext:", context);
  return context;
};
