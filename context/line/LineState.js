import React, { useReducer } from "react";
import { Asset } from 'expo-asset';
import LineContext from "./lineContext";
import lineReducer from "./lineReducer";

import net from '../../lib/net';
import storage from '../../lib/storage/storage';
import { initState, line_t } from './init.js';


const LineState = (props) =>
{
    const [state, dispatch] = useReducer(lineReducer, initState);

    
    async function sendLine(line)
    {
      try {
        const path = await net.post('speech/text', { line });
        return path;
      } catch(e) {
        console.error(e);
        return null;
      }
    }

    function saveLine(text, uri)
    {
      try {
        const line = {};
        line[text] = uri;
        const lines = Object.assign(line, state.lines);

        dispatch({ type: line_t.LINE_SUCCESS, payload: { lines } });
        return true;
      } catch(e) {
        console.error(e);
        return false;
      }
    }


    function isLocal(text)
    {
      try {
        const uri = state.lines[text];
        if(!uri) return false;
        return uri;
      } catch(e) {
        console.error(e);
        return false;
      }
    }

    return (
      <LineContext.Provider
        value={{
          sendLine,
          saveLine,
          isLocal,
        }}
      >
        {props.children}
      </LineContext.Provider>
    );
};

export default LineState;
/*
    async function saveLine(text, audio)
    {
      try {
        const lines = Object.assign({}, state.lines);
        lines[text] = audio;
        await storage.saveData(text, audio);

        const payload = { text, lines}
        dispatch({ type: line_t.LINE_SUCCESS, payload });
        return true;
      } catch(err) {
        console.error(err);
        return null;
      }
    }
 

    async function isLocal(text)
    {
      try {
        const line = state.lines[text];
        const audio = await storage.getData(text); 

        if(line) {
          if(!audio) {
            console.log('line saving to storage');
            await storage.saveData(text, line);
          }
          console.log('returning line from state');
          return line;
        }

        if(audio) {
          console.log('isLocal audio true');
          const lines = Object.assign({}, state.lines);
          lines[text] = audio;
          dispatch({ type: line_t.LINE_SUCCESS, payload: { lines } });
          return audio
        }

        console.log('isLocal network');
        const saved = await net.post('speech/text', { line: text })
        if(!saved) {
          return false;
        }

        return null;
      } catch(err) {
        console.error(err);
        return false;
      }
    }
*/
