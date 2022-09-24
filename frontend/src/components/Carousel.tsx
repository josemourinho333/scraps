import React from 'react';

type Props = {
  images: any[];
}

const Carousel = ({images}: Props) => {

  const imgs = images.map((img, index) => {
    const current = index + 1;
    return (
      <div key={current} id={`slide${current}`} className="carousel-item relative w-full justify-center">
        <img src={img} alt="carousel" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a 
            href={`#slide${current-1 === 0 ? images.length : current-1}`} 
            className="btn btn-circle">❮</a> 
          <a 
            href={`#slide${current+1 > images.length ? 1 : current+1}`} 
            className="btn btn-circle">❯</a>
        </div>
      </div> 
    )
  })


  return (
    <div className="carousel w-full">
      {imgs}
    </div>
  )
}

export default Carousel;