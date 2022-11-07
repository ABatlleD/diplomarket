import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import PropTypes from 'prop-types'
import CategoryItem from './CategoryItem'

function CategoriesSwiper({ categories }) {
  return (
    <Swiper
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      slidesPerView={'auto'}
      breakpoints={{
        200: {
          slidesPerView: 2, spaceBetween: 0
        },
        320: {
          slidesPerView: 2, spaceBetween: 0
        },
        460: {
          slidesPerView: 2, spaceBetween: 0
        },
        580: {
          slidesPerView: 2, spaceBetween: 0
        },
        640: {
          slidesPerView: 3, spaceBetween: 0
        },
        780: {
          slidesPerView: 3, spaceBetween: 0
        },
        1200: {
          slidesPerView: 4, spaceBetween: 10
        },
        1400: {
          slidesPerView: 4, spaceBetween: 10
        }
      }}
      loop={categories.results.length > 2}
    >
      {categories.results.map((category) => (
        <SwiperSlide key={category.id}>
          <CategoryItem
            category={category}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

CategoriesSwiper.propTypes = {
  categories: PropTypes.object.isRequired
}

export default CategoriesSwiper
