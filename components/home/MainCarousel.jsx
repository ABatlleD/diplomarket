import React, { useEffect, useState } from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import Link from 'next/link'
import useWindowSize from '../../hooks/WindowSize'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'

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
              <Link key={pivot} href={result?.enlace}>
                <Slide index={pivot}>
                  <img
                    src={
                      size.width >= 768
                        ? `${process.env.NEXT_PUBLIC_BACKEND}${result?.imagen}`
                        : `${process.env.NEXT_PUBLIC_BACKEND}${result?.img_movil}`
                    }
                    className="w-full hover:cursor-pointer h-full"
                    alt="..."
                  />
                </Slide>
              </Link>
            )
          })}
        </Slider>
        <ButtonBack className="absolute top-1/2 left-10">
          <div className="bg-footer-background-100 text-background-100 shadow-md rounded-full md:p-2">
            <ArrowLeftIcon />
          </div>
        </ButtonBack>
        <ButtonNext className="absolute top-1/2 right-10">
          <div className="bg-footer-background-100 text-background-100 shadow-md rounded-full md:p-2">
            <ArrowRightIcon />
          </div>
        </ButtonNext>
      </CarouselProvider>
    </>
  )
}

export default MainCarousel
