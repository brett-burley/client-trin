import { book_t } from './init';

export default (state, action) => {
  const { type, payload } = action

  switch (type) {
    case book_t.BOOK_SUCCESS:
    case book_t.BOOK_LOADED:
    case book_t.BOOK_LINE:
      return {
        ...state,
        ...payload
      }
    case book_t.BOOK_ERROR:
      console.error(payload);
      return state
    default:
      return state
  }
}
