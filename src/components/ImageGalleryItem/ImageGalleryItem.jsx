import { Component } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;
    const { isModalOpen } = this.state;
    const modalOpen = this.openModal;
    const modalClose = this.closeModal;

    return (
      <>
        <Item onClick={modalOpen}>
          <Image src={webformatURL} alt={tags} />
        </Item>
        {isModalOpen && (
          <Modal largeImage={largeImageURL} tag={tags} onClose={modalClose} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
