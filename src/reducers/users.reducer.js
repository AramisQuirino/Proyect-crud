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
    case userConstants.ADD_RECIBO:
      console.log('add_reducer')
      return state.set('recibo', fromJS(action.Recibo))
    case userConstants.UPDATE_RECIBO:
      console.log('update_reducer')
      return state.set('recibo', fromJS(action.Recibo))
    case userConstants.DELETE_RECIBO:
      console.log('delete_reducer')
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
    case userConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }
 
          return user;
        })
      };
    default:
      return state
  }
}