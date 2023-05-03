import { useEffect, useReducer } from "react";
import ModeContext from "./modeContext";
import modeReducer from "./modeReducer";
import { initState, mode_t } from './init.js';
import storage from '../../lib/storage/storage';
//import _ from 'lodash';


const ModeState = (props) =>
{
  const [state, dispatch] = useReducer(modeReducer, initState);
  useEffect(() => {
    const load = async () => {
      await loadMode();
    }
    load();
  },[]);


  async function loadMode()
  {
    const mode = await storage.getData('mode');
    if(mode && mode !== state.mode)
      dispatch({ type: mode_t.MODE_SUCCESS, payload: { mode } });
  }
 

  async function setMode(mode)
  {
    try { 
      const match = mode.search(/^(read|listen|learn)$/);
      if(match < 0 || mode === state.mode) return;

      storage.setData('mode', mode);
      
      dispatch({ type: mode_t.MODE_SUCCESS, payload: { mode } });
      return true;
    } catch(err) {
      console.error(err);
      return false;
    }
  }

  function setScreen(screen)
  {
    if(screen !== state.screen)
      dispatch({ type: mode_t.MODE_SUCCESS, payload: { screen } });
  }


  return (
    <ModeContext.Provider
      value={{
        mode: state.mode,
        setMode,
        setScreen,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};


export default ModeState;
