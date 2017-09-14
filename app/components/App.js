import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { Modal, ProgressBar } from 'react-bootstrap'
import R from 'ramda'
import { updatePokemons } from '../middleware/saga'
import { SHOW_POKEMON, UPDATE_POKEMONS } from '../constants/constants'
import { setPageSize } from '../reducer/pagination' 
import { loadPokemons, startLoadPokemons, showPokemon } from '../reducer/pokemons' 
import ShowPokemon from './ShowPokemon'
import HandleError from './HandleError'
import { capitalize } from '../helpers/helpers'
import 'react-table/react-table.css'
import '../style/style.scss'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startLoadPokemons())
    dispatch(loadPokemons())
  }
  render() {
    const { pokemons, types, loading, prograss_bar, count_pokemons, default_size, page_size } = this.props

    const columns = [{
      Header: 'Id',
      accessor: 'id',
      filterable: false
    }, {
      Header: 'Name',
      accessor: 'name',
      filterMethod: (filter, row) => row['name'].indexOf(filter.value) >= 0 ? true : false
    }, {
      Header: 'Avatar',
      accessor: 'avatar',
      filterable: false,
      Cell: props => <img src={props.value} />
    }, {
      Header: 'Types',
      accessor: 'types',
      Cell: props => (<ul>{props.value.map((type, index) => <li key={index.toString()}>{type}</li>)}</ul>),
      filterMethod: (filt, row) => {
        const { value } = filt
        if (value === 'all') return true
        if (row['types'].filter(type => type === value).length > 0) {
          return true
        } else {
          return false
        }   
      },
      Filter: ({ filter, onChange }) => 
        <select
          onChange={event => onChange(event.target.value)}
        >
          <option value="all">All</option>
          { types.map((type, index) => <option key={index.toString()} value={type}>{capitalize(type)}</option>) }
        </select>
    }, {
      Header: 'Abilities',
      accessor: 'abilities',
      filterable: false,
      Cell: props => (<ul>{props.value.map((name, index) => <li key={index.toString()}>{name}</li>)}</ul>)
    }, {
      Header: 'Height',
      accessor: 'height',
      filterable: false
    }, {
      Header: 'Weight',
      accessor: 'weight',
      filterable: false
    }]
    return (
      <div>
        <HandleError />
        <ShowPokemon />
        <Modal show={loading}>
          <ProgressBar style={{ margin: 0 }} now={prograss_bar} label={`Completed ${prograss_bar}%`} />
        </Modal>
        <ReactTable
          filterable
          loading={loading}
          defaultPageSize={page_size}
          pageSizeOptions={[20]}
          data={pokemons}
          columns={columns}
          onPageChange={(page) => {
            const needPokemons = R.inc(page) * page_size
            if(needPokemons > count_pokemons) {
              this.props.dispatch(loadPokemons())
              this.props.dispatch({ type: UPDATE_POKEMONS, payload: needPokemons })
            }
          }}
          getTdProps={(state, rowInfo) => ({ onClick: () => {
            this.props.dispatch(showPokemon(rowInfo.row.id))
          }})}
        />
      </div>
    )
  }
}

export default connect((state) =>({
  pokemons: state.pokemons.value,
  loading: state.pokemons.loading,
  count_pokemons: state.pokemons.current_count,
  page_size: state.pagination.page_size,
  prograss_bar: state.prograss_bar,
  types: state.types
}))(App)