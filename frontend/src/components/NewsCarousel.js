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
      className="carousel slide"
      data-ride="carousel"
    >
      <button className="carousel-control-prev-icon btn btn-outline" onClick={handlePrev(carouselIndex)}></button>
      <div className="carousel-inner">
        {news.map((item, index) => (
          <div key={`news-carousel-${index}`} className={`carousel-item ${index === carouselIndex && 'active'}`}>
            <News news={item} />
          </div>
        ))}
      </div>
      <button className="carousel-control-next-icon btn btn-outline" onClick={handleNext(carouselIndex)}></button>
    </div>
  );
}
