import { alert_t } from './init.js';

export default (state, action) => {
  const { type, payload } = action

  switch (type) {
    case alert_t.ALERT_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case alert_t.ALERT_ERROR:
    default:
      return state
  }
}
