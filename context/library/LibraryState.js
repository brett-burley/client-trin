import { useEffect, useReducer } from "react";
import { Platform } from "react-native";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import LibraryContext from "./libraryContext";
import libraryReducer from "./libraryReducer";

import { initState, library_t } from './init.js';
import storage from '../../lib/storage/storage';

//import { formatMandarin } from '../../lib/text/text';

const LibraryState = (props) =>
{
  const [state, dispatch] = useReducer(libraryReducer, initState);
  const web = Platform.OS === 'web';
  
  useEffect(() => {
    loadTitles();
  }, []);

  async function loadTitles()
  {
    try {
      const localTitle = await storage.getData('title');
      if(!localTitle) return;
      const titles = [...state.titles, localTitle];
      dispatch({ type: library_t.LIBRARY_SUCCESS, payload: { titles } });
      return true;
    } catch(e) {
      return false;
    }
  }


  async function saveTitle(newTitle)
  {
    try {
      await storage.setData('title', newTitle);

      const titles = [...state.titles, newTitle];
      console.log('titles', titles);
      dispatch({ type: library_t.SAVE_SUCCESS, payload: { titles } });
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
    
  }

  return (
    <LibraryContext.Provider
      value={{
        titles: state.titles,
        loadTitles,
        saveTitle,
      }}
    >
      {props.children}
    </LibraryContext.Provider>
  );
};

export default LibraryState;
