import React, { useReducer } from "react";
import ErrorContext from "./errorContext";
import errorReducer from "./errorReducer";
import { initState, error_t } from './init.js';

const ErrorState = (props) =>
{
  const [state, dispatch] = useReducer(errorReducer, initState);

  function showError(msg)
  {
    dispatch({ type: error_t.ERROR_SUCCESS, payload: { msg } });
    //setTimeout(() => {
      //dispatch({ type: error_t.ERROR_SUCCESS, payload: { msg: initState.msg } })
    //}, 3000);
  }

  return (
    <ErrorContext.Provider
      value={{
        msg: state.msg,
        showError,
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
};


export default ErrorState;
