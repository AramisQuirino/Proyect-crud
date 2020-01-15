import { fromJS } from 'immutable'
import { userConstants } from '../constants/user.constants';

const initialState = fromJS({
  registering :false
})
 
export function registration(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST: 
      return state.set('registering', true)
    case userConstants.REGISTER_SUCCESS:
      return state.set('registering', false)
    case userConstants.REGISTER_FAILURE:
      return state.set('registering', false)
    default:
      return state
  }
}