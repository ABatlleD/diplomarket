import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem'

function ProductsSwiper({ products }) {
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
          slidesPerView: 2, spaceBetween: 5
        },
        460: {
          slidesPerView: 3, spaceBetween: 5
        },
        580: {
          slidesPerView: 3, spaceBetween: 5
        },
        640: {
          slidesPerView: 2, spaceBetween: 5
        },
        780: {
          slidesPerView: 4, spaceBetween: 10
        },
        1200: {
          slidesPerView: 4, spaceBetween: 20
        },
        1400: {
          slidesPerView: 5, spaceBetween: 20
        }
      }}
      loop={products.length > 3}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductItem
            id={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            image={product.image}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

ProductsSwiper.propTypes = {
  products: PropTypes.array.isRequired
}

export default ProductsSwiper