import React from 'react'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import PropTypes from 'prop-types'
import Link from 'next/link'

function MainCarousel({ carousel }) {
  let slide = 0

  return (
    <>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={35}
        totalSlides={carousel.count}
        infinite={true}
      >
        <Slider>
          {carousel.results.map((result) => {
            const pivot = slide
            slide++
            return (
              <Slide key={pivot} index={pivot}>
                <Link href={result.enlace}>
                  <img src={`https://www.diplomarket.com${result.imagen}`} className="w-full hover:cursor-pointer h-full" alt="..." />
                </Link>
              </Slide>
            )
          })}
        </Slider>
      </CarouselProvider>
    </>
  )
}

MainCarousel.propTypes = {
  carousel: PropTypes.object
}

export default MainCarousel
