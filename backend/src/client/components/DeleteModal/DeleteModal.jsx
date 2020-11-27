import React from 'react';
import propTypes from 'prop-types';
import ReactModal from 'react-modal';

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.setState((state) => {
      state.isOpen = false;
      return state;
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      isOpen: newProps.isOpen,
    });
  }

  render() {
    return (
      <ReactModal
        isOpen={this.state.isOpen}
        onRequestClose={this.handleCloseModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h3>Haluatko varmasti poistaa kysymyksen?</h3>
        <hr />
        <p> Kysymys poistetaan eikä sen palauttaminen ole enään mahdollista.</p>
        <hr />
        <button onClick={this.handleCloseModal}>Peruuta</button>
        &nbsp;
        <button
          style={{ backgroundColor: '#FFD2D2' }}
          onClick={() =>
            this.props.delete(
              this.props.id,
              this.props.update,
              this.props.error
            )
          }
        >
          Poista
        </button>
      </ReactModal>
    );
  }
}

DeleteModal.propTypes = {
  isOpen: propTypes.bool,
  id: propTypes.number,
  delete: propTypes.func,
  update: propTypes.func,
  error: propTypes.func,
};

export default DeleteModal;
