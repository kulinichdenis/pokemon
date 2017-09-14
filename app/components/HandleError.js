import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { HIDE_ERROR } from '../constants/constants'

class HandleError extends Component {
  close = () => this.props.dispatch({ type: HIDE_ERROR })
  render() {
    const { error } = this.props
    return (
      <div>
        { error ?
          <Modal show={true} onHide={this.close}>
            <Modal.Body>
              <p>Something wrong, please, repeat again</p>
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
  state => ({ error: state.pokemons.error})
)(HandleError)
