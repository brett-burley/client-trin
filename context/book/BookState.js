import React, { useReducer } from "react";
import BookContext from "./bookContext";
import bookReducer from "./bookReducer";
import { initState, book_t} from './init.js';
import storage from '../../lib/storage/storage';
import { Asset } from 'expo-asset';
import { books } from '../../assets/books/books.js';
import net from '../../lib/net/net'
import translate from '../../lib/translate/translate';


const PAGE_LEN = 4;


const BookState = (props) =>
{
  const [state, dispatch] = useReducer(bookReducer, initState);

  async function loadBook(id)
  {
    try {
      let book = await storage.getData('book');
      if(!book) book = books[id];

      const section = await getSection(id);
      const screen = await getScreen();
      const current = book[section];
      const payload = { book, current, section, id, screen };

      dispatch({ type: book_t.BOOK_LOADED, payload });
      return true;
    } catch(err) {
      dispatch({ type: book_t.BOOK_ERROR, payload: err});
      return false;
    }
  }

  async function getScreen()
  {
    let screen;
    try {
      screen = await storage.getData('screen');
      if(!screen) return state.screen;
      return screen;
    } catch(e) {
      return state.screen;
    }
  }

  async function translateCurrent()
  {
    try {
      const payload = await translate.translateCurrent(state.current);
      if(!payload) return false;
      dispatch({ type: book_t.BOOK_SUCCESS, payload });
    } catch(e) {
      console.log(e);
      return false;
    }
  }

  async function setScreen(screen)
  {
    if(screen !== state.screen) {
      storage.setDataAsync('screen', screen);
      dispatch({ type: book_t.BOOK_SUCCESS, payload: { screen } }); 
    }
  }

  async function setSection(value)
  {
    const book = state.book;
    book[state.section] = state.current;

    const section = getSectionValue(value);
    const length = book.length;
    if(section === value, section < 0 || section > length) return;

    const current = state.book[section];
    const payload = { current, section };

    await setSectionLocal(state.id, section);

    dispatch({ type: book_t.BOOK_LINE, payload });
  }


  function getSectionValue(value)
  {
    const { screen, section } = state;
    if(screen === 'line')
      return section + value;
    else
      return section + (value * PAGE_LEN);
  }

 
  function getPage()
  {
    const book = state.book;
    const start = state.section;
    const end = start + PAGE_LEN;
    const page = book.slice(start, end);
    return page;
  }


  async function getSection(id)
  {
    const key = id.concat('-section');
    let section = await storage.getData(key);
    if(!section)
      section = state.section;

    return section;
  }


  async function setSectionLocal(id, section)
  {
    try {
      const key = id.concat('-section');
      storage.setDataAsync(key, section);
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }

  }

  return (
    <BookContext.Provider
      value={{
        current: state.current,
        line: state.current.line,
        characters: state.current.characters,
        bookLength: state.book.length,
        section: state.section,
        loadBook,
        setScreen,
        setSection,
        translateCurrent,
        getPage,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
