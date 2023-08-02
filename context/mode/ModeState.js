import { useEffect, useReducer } from "react";
import ModeContext from "./modeContext";
import modeReducer from "./modeReducer";
import { initState, mode_t } from './init.js';
import storage from '../../lib/storage/storage';


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
    try {
      let mode = await storage.getData('mode');
      let themeMode = await storage.getData('themeMode');
      if(!mode) {
        mode = state.mode;
        storage.setData('mode', mode);
      }

      if(!themeMode) {
        themeMode = state.themeMode;
        storage.setData('themeMode', themeMode);
      }
        
      dispatch({ type: mode_t.MODE_SUCCESS, payload: { mode, themeMode } });
    } catch(e) {
      console.error('loadMode() failed');
      dispatch({ type: mode_t.MODE_ERROR });
    }
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

  function setThemeMode(themeMode)
  {
    if(themeMode !== state.themeMode) {
      storage.setDataAsync('themeMode', themeMode);
      dispatch({ type: mode_t.MODE_SUCCESS, payload: { themeMode } });
    }
  }

  return (
    <ModeContext.Provider
      value={{
        mode: state.mode,
        screen: state.screen,
        themeMode: state.themeMode,
        setMode,
        setScreen,
        setThemeMode,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};


export default ModeState;
