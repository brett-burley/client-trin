import React, { useState, useEffect, useReducer } from "react";
import CharactersContext from "./charactersContext";
import charactersReducer from "./charactersReducer";

import { chars_t, initState } from './init.js';
import net from '../../lib/net/'


const CharactersState = (props) =>
{
  const [state, dispatch] = useReducer(charactersReducer, initState);

  function isCommon(mandarin)
  {
    const character = state.common[mandarin];
    if(character) return character;
    return false;
  }

  async function sendChar(character)
  {
    try {
      const saved = await net.post('speech/char', { character });
      if(!saved) throw new Error(`${character} not saved`);
      return true;
    } catch(err) {
      return false;
    } 
  }


  function saveChar(character, uri)
  {
    try {
      const entry = {};
      entry[character] = uri;
      const other = Object.assign(entry, state.other);

      dispatch({ type: chars_t.CHARACTERS_SUCCESS, payload: { other } });
    } catch(e) {
      console.error(e);
      return false;
    }
  }

  return (
    <CharactersContext.Provider
      value={{
        common: state.common,          
        isCommon,
        sendChar,
        saveChar,
      }}
    >
      {props.children}
    </CharactersContext.Provider>
  );
};

export default CharactersState;
