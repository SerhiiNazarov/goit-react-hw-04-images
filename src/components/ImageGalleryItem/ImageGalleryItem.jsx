import { useState, memo } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

function ImageGalleryItem({ image: { webformatURL, tags, largeImageURL } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Item onClick={openModal}>
        <Image src={webformatURL} alt={tags} />
      </Item>
      {isModalOpen && (
        <Modal largeImage={largeImageURL} tag={tags} onClose={closeModal} />
      )}
    </>
  );
}

ImageGalleryItem.prototype = {
  image: PropTypes.object.isRequired,
};

export default memo(ImageGalleryItem);
