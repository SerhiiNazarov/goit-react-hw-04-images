import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalGallery } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    largeImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    tag: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, tag, onClose } = this.props;
    return createPortal(
      <Overlay onClick={onClose}>
        <ModalGallery>
          <img src={largeImage} alt={tag} loading="lazy" />
        </ModalGallery>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
