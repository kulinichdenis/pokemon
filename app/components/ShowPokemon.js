import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { HIDE_POKEMON } from '../constants/constants'

class ShowPokemon extends Component {
  close = () => this.props.dispatch({ type: HIDE_POKEMON })
  render() {
    const { pokemon } = this.props
    return (
      <div>
        { pokemon ?
          <Modal show={true} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Description:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ 'textAlign': 'center' }}>
                <p>Name: { pokemon.name }</p>
                <p><img src={pokemon.avatar} /></p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
          </Modal> : null }
      </div>
    );
  }
}

export default connect(
  state => ({ pokemon: state.pokemons.show})
)(ShowPokemon)
