import { fromJS } from 'immutable'
import { userConstants } from '../constants/user.constants';

const initialState = fromJS({
  loggedIn: false,
  user: null
});
 
export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return state.set('user', action.user);
    case userConstants.LOGIN_SUCCESS: {
      const newState = state.set('loggedIn', true);
      return newState.set('user', action.user);
    }
    case userConstants.LOGIN_FAILURE:
      return state.set('loggedIn', false);
    case userConstants.LOGOUT: {
      const newState = state.set('loggedIn', false);
      return newState.set('user', null);
    }
    default:
      return state
  }
}