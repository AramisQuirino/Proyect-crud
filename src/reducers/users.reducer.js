import { fromJS } from 'immutable'
import { userConstants } from '../constants/user.constants';

const initialState = fromJS({
  loading:false,
  items: null,
  error: null,
  deleting: false,
  recibo: [],
})
 
export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.SET_RECIBO:
      return state.set('recibo', fromJS(action.Recibo))
    case userConstants.UPDATE_RECIBO:
      console.log('update_reducer')
      return state.set('recibo', fromJS(action.Recibo))
    case userConstants.DELETE_RECIBO:
      return state.set('recibo', fromJS(action.Recibo))
    case userConstants.GETALL_REQUEST:
      return state.set('loading', true)
    case userConstants.GETALL_SUCCESS: {
      const newState = state.set('loading', true)
      return newState.set('items', action.users)
    }
    case userConstants.GETALL_FAILURE: {
      const newState = state.set('loading', false)
      return newState.set('error', action.error)
    }
    default:
      return state
  }
}