import { mode_t } from './init.js';

export default (state, action) => {
  const { type, payload } = action

  switch (type) {
    case mode_t.MODE_SUCCESS:
    case mode_t.MODE_LOADED:
      return {
        ...state,
        ...payload
      }
    case read_t.MODE_ERROR:
    default:
      return state
  }
}
