import R from 'ramda'
import createReducer from 'create-reducer-map'
import { LOADING_POKEMONS, START_LOAD_POKEMONS, SET_ALL_POKEMONS, SHOW_POKEMON, HIDE_POKEMON, ADD_POKEMONS } from '../Constants/constants'

/*
  Actions
*/
export const loadPokemons = () => ({ type: LOADING_POKEMONS })
export const startLoadPokemons = () => ({ type: START_LOAD_POKEMONS })
export const showPokemon = (id) => ({ type: SHOW_POKEMON, payload: id })

/*
  Reducer
*/
/* init */
const defaultState = () => (
  { value: [], loading: false, show: null, next: undefined, count: 0, current_count: 0 } 
)


export default createReducer(defaultState(), {
  [LOADING_POKEMONS]: (state) => {
    return R.assoc('loading', true, state)
  },
  [SET_ALL_POKEMONS]: (state, { value, count, next }) => {
    const pokemons = new Array(count)
    pokemons.fill({ name: '', types: [], abilities: [] })
    for (var i = 0; i < value.length; i++) {
      pokemons[i] = value[i]
    }
    return { ...state, value: pokemons, count, next, loading: false, current_count: value.length }
  },
  [ADD_POKEMONS]: (state, payload) => {
    const { value, current_count } = state
    const { results, next } = payload
    const pokemons = [].concat(value)
    
    for (let i = 0, current = current_count; i < results.length; i++, current++) {
      pokemons[current] = results[i]
    }
    return { ...state, value: pokemons, next, current_count: current_count + results.length, loading: false }
  },
  [SHOW_POKEMON]: (state, payload) => {
    const pokemon = R.pipe(R.prop('value'), R.find(R.propEq('id', payload)))(state)
    return {...state, show: pokemon }
  },
  [HIDE_POKEMON]: (state) => ({ ...state, show: null })
})
