import createReducer from 'create-reducer-map'
import { SET_ALL_TYPES } from '../constants/constants'

export default createReducer([], {
  [SET_ALL_TYPES]: (state, payload) => {
    return [...state, ...payload]
  } 
})
