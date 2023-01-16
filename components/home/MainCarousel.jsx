import React, { useEffect, useState } from 'react'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import Link from 'next/link'
import useWindowSize from '../../hooks/WindowSize'

function MainCarousel({ carousel, count }) {
  const size = useWindowSize()
  const [slideHeight, setSlideHeight] = useState(0)
  let slide = 0

  useEffect(() => {
    switch (true) {
      case size.width < 768:
        setSlideHeight(50)
        break
      case size.width > 768 && size.width < 1200:
        setSlideHeight(25)
        break
      case size.width >= 1200:
        setSlideHeight(25)
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
        totalSlides={count}
        isPlaying={true}
        interval={6000}
        infinite={true}
      >
        <Slider>
          {carousel?.map((result) => {
            const pivot = slide
            slide++
            return (
              <Slide key={pivot} index={pivot}>
                <Link href={result?.enlace}>
                  <img
                    src={
                      size.width >= 768
                        ? `${process.env.NEXT_PUBLIC_BACKEND}${result?.imagen}`
                        : `${process.env.NEXT_PUBLIC_BACKEND}${result?.img_movil}`
                    }
                    className="w-full hover:cursor-pointer h-full"
                    alt="..."
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

export default MainCarousel
