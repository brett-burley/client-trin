import { line_t } from './init';
import _ from 'lodash';

export default (state, action) => {
  const { type, payload } = action

  switch (type) {
    case line_t.LINE_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case line_t.LINE_ERROR:
    default:
      return state
  }
}
