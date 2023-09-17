import React, { useState } from 'react';
import './imageGallery.css'; // Create a CSS file for your styles
import { Image } from 'cloudinary-react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Carousel from 'react-bootstrap/Carousel'; // Import the Carousel component


export default function ImageGallery({ images, setSelectedImage, setShowModal }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
      prevIcon={<IoIosArrowBack />}
      nextIcon={<IoIosArrowForward />}
    >
      {images?.map((image, index) => (
        <Carousel.Item key={index}>
          <Image
            cloudName="dnq3ef4tj"
            publicId={image.publicId}
            alt={`Image ${index + 1}`}
            className="gallery-image" // You may need to adjust the class depending on your styles
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
