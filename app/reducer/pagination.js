import R from 'ramda'
import createReducer from 'create-reducer-map'
import { SET_PAGE, SET_PAGE_SIZE } from '../constants/constants'

// actions
export const setPageSize = (pageSize) => ({ type: SET_PAGE_SIZE, payload: pageSize }) 
export const setPage = (page) => ({ type: SET_PAGE, payload: page }) 

// reducer
export default createReducer({ page_size: 20 }, {
  [SET_PAGE_SIZE]: (state, payload) => {
    return {...state, page_size: payload }
  }
})
