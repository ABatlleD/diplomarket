import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
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
          slidesPerView: 3, spaceBetween: 0
        },
        320: {
          slidesPerView: 3, spaceBetween: 5
        },
        460: {
          slidesPerView: 3, spaceBetween: 5
        },
        580: {
          slidesPerView: 3, spaceBetween: 5
        },
        640: {
          slidesPerView: 4, spaceBetween: 5
        },
        780: {
          slidesPerView: 4, spaceBetween: 10
        },
        1200: {
          slidesPerView: 5, spaceBetween: 20
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
            product={product}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ProductsSwiper
