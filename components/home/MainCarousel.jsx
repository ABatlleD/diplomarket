import React, { useEffect, useState } from 'react'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import PropTypes from 'prop-types'
import Link from 'next/link'
import useWindowSize from '../../hooks/WindowSize'

function MainCarousel({ carousel }) {
  const size = useWindowSize()
  const [slideHeight, setSlideHeight] = useState(0)
  let slide = 0

  useEffect(() => {
    switch (true) {
      case size.width < 768:
        setSlideHeight(150)
        break
      case size.width > 768 && size.width < 1200:
        setSlideHeight(38)
        break
      case size.width >= 1200:
        setSlideHeight(38)
        break
      default:
        setSlideHeight(35)
    }
  }, [slideHeight])

  return (
    <>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={slideHeight}
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
                  <img
                    src={size.width >= 768
                      ? `http://localhost:8000${result.imagen}`
                      : `http://localhost:8000${result.img_movil}`
                    }
                    className="w-full hover:cursor-pointer h-full" alt="..."
                  />
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
