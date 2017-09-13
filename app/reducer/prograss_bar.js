import R from 'ramda'
import createReducer from 'create-reducer-map'
import { SET_PROGRESS_BAR } from '../Constants/constants'

// action
export const setProgressBar = (amount) => ({ type: SET_PROGRESS_BAR, payload: amount })

// reducer
export default createReducer(0, {
  [SET_PROGRESS_BAR]: (state, payload) => payload
})
