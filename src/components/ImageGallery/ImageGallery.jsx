import { GalleryWrap } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ gallery, openModal, modalUrl }) => {
  return (
    <GalleryWrap>
      {gallery.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          openModal={openModal}
          getModalUrl={modalUrl}
        />
      ))}
    </GalleryWrap>
  );
};
