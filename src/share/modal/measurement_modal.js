import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
}
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('root')

export default class MeasurementModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  renderMeasurement = () => {
    return(
      <div className="card medium">
        <img width='700' src={'https://cdn.shopify.com/s/files/1/0205/9166/files/LACEMARRY_STANDARD_SIZE_CHART.jpg?17404937771104784784'} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <a className='measurement-link' onClick={this.openModal}>check size</a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {this.renderMeasurement()}
        </Modal>
      </div>
    );
  }
}
