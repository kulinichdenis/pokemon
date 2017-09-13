import axios from 'axios'
import { takeEvery, call, put, all, select } from 'redux-saga/effects'
import { LOADING_POKEMONS, SET_ALL_POKEMONS, START_LOAD_POKEMONS,
  SET_ALL_TYPES, SET_PROGRESS_BAR, UPDATE_POKEMONS, ADD_POKEMONS 
} from '../Constants/constants'
import { setProgressBar } from '../reducer/prograss_bar'
import { getPokemon, getAbilities, getTypeName, getTypeForPokemon, getAvatar } from '../helpers'

/* endpoint */
const getAllPokemons = () => axios('http://pokeapi.co/api/v2/pokemon/')
const getAllTypes = () => axios('http://pokeapi.co/api/v2/type/')


function* convenePokemons(pokemonss) {
  const newPokemons = []
  let percent = 1
  for (let i = 0; i < pokemonss.length; i++) {
    const { data } = yield call(getPokemon, pokemonss[i].url)
    const { id, name, sprites, types, weight, height, abilities } = data

    yield put(setProgressBar(Math.round(percent * 100 / 20)))
    
    percent = percent + 1
    newPokemons.push({
      id,
      name,
      avatar: getAvatar(sprites),
      types: getTypeForPokemon(types),
      weight,
      height,
      abilities: getAbilities(abilities)
    })
  }
  return newPokemons
}

/* saga */
export function* take_start_data() {
  const [ pokemons, types ] = yield all([call(getAllPokemons), call(getAllTypes)]) 
  yield put({ type: SET_ALL_TYPES, payload: getTypeName(types.data.results) })
  const completedPokemons = yield * convenePokemons(pokemons.data.results)
  yield put(setProgressBar(0))
  yield put({ type: SET_ALL_POKEMONS, payload: { value: completedPokemons, count: pokemons.data.count, next: pokemons.data.next }})
}

export function* update_pokemons() {
  const state = yield select()
  const { pokemons } = state
  const { data } = yield call(getPokemon, pokemons.next)
  const completedPokemons = yield * convenePokemons(data.results)
  yield put(setProgressBar(0))
  yield put({ type: ADD_POKEMONS, payload: { results: completedPokemons, next: data.next } })
} 

/* waucher */
export function* watchAsync() {
  yield takeEvery(START_LOAD_POKEMONS, take_start_data)
  yield takeEvery(UPDATE_POKEMONS, update_pokemons)
}