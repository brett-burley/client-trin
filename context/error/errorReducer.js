import { error_t } from './init.js';

export default (state, action) => {
  const { type, payload } = action

  switch (type) {
    case error_t.ERROR_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case error_t.ERROR_ERROR:
    default:
      return state
  }
}
