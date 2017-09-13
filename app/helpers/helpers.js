import axios from 'axios'
import { prop } from 'ramda'

export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)
 
export const getPokemon = (url) => axios(url) 
 
export const getAbilities = (abilities) => abilities.map(({ ability }) => ability.name)
 
export const getTypeName = (types) => types.map(({ name }) => name)
 
export const getTypeForPokemon = (types) => types.map(({ type }) => type.name)
 
export const getAvatar = (sprites) => prop('front_default', sprites)
