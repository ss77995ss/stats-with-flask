import { useState } from 'react';
import News from './News';

export default function NewsCarousel({ news }) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handlePrev = (index) => () => {
    if (index !== 0) {
      setCarouselIndex(index - 1);
    }
  };

  const handleNext = (index) => () => {
    if (index !== news.length - 1) {
      setCarouselIndex(index + 1);
    }
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      class="carousel slide"
      data-ride="carousel"
    >
      <button class="carousel-control-prev-icon btn btn-outline" onClick={handlePrev(carouselIndex)}></button>
      <div class="carousel-inner">
        {news.map((item, index) => (
          <div class={`carousel-item ${index === carouselIndex && 'active'}`}>
            <News news={item} />
          </div>
        ))}
      </div>
      <button class="carousel-control-next-icon btn btn-outline" onClick={handleNext(carouselIndex)}></button>
    </div>
  );
}
