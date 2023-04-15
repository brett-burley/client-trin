import { library_t } from './init';

export default (state, action) => {
  const { type, payload } = action

  switch (type) {
    case library_t.LIBRARY_SUCCESS:
    case library_t.SAVE_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case library_t.LIBRARY_ERROR:
    case library_t.SAVE_ERROR:
    default:
      return state
  }
}
