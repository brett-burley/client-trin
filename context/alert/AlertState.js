import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { initState, alert_t } from './init.js';


const AlertState = (props) =>
{
  const [state, dispatch] = useReducer(alertReducer, initState);

  function setAlert(msg)
  {
    dispatch({ type: alert_t.ALERT_SUCCESS, payload: { msg } });

    setTimeout(() => dispatch({ type: alert_t.ALERT_SUCCESS, payload: { msg: false } }), 3000);
  }

  return (
    <AlertContext.Provider
      value={{
        msg: state.msg,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};


export default AlertState;
