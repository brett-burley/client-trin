import { chars_t } from './init';

export default (state, action) => {
  const { type, payload } = action

  switch (type) {
    case chars_t.CHARACTERS_LOAD:
    case chars_t.CHARACTERS_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case chars_t.CHARACTERS_ERROR:
    default:
      return state
  }
}
