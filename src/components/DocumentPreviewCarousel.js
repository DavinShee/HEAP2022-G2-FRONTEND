import { Carousel } from 'react-bootstrap';

const DocumentPreviewCarousel = ({ imageURLArray }) => {
  return (
    <Carousel>
      {imageURLArray.map((url, index) => (
        <Carousel.Item>
          <img className="d-block w-100" src={url} alt={`${index}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default DocumentPreviewCarousel;
