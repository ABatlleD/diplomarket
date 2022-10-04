import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem'

const test = [
  {
    id: 1,
    title: 'Test title',
    image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png',
    category: 'Test Category',
    description: 'Lorem Ipsum',
    price: 100
  },
  {
    id: 2,
    title: 'Test title',
    image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png',
    category: 'Test Category',
    description: 'Lorem Ipsum',
    price: 100
  },
  {
    id: 3,
    title: 'Test title',
    image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png',
    category: 'Test Category',
    description: 'Lorem Ipsum',
    price: 100
  },
  {
    id: 4,
    title: 'Test title',
    image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png',
    category: 'Test Category',
    description: 'Lorem Ipsum',
    price: 100
  },
  {
    id: 5,
    title: 'Test title',
    image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png',
    category: 'Test Category',
    description: 'Lorem Ipsum',
    price: 100
  },
  {
    id: 6,
    title: 'Test title',
    image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png',
    category: 'Test Category',
    description: 'Lorem Ipsum',
    price: 100
  },
  {
    id: 7,
    title: 'Test title',
    image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png',
    category: 'Test Category',
    description: 'Lorem Ipsum',
    price: 100
  },
  {
    id: 8,
    title: 'Test title',
    image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png',
    category: 'Test Category',
    description: 'Lorem Ipsum',
    price: 100
  },
  {
    id: 9,
    title: 'Test title',
    image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png',
    category: 'Test Category',
    description: 'Lorem Ipsum',
    price: 100
  }
]

function ProductsSwiper({ products }) {
  return (
    <Swiper
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
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
    >
      {test.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductItem
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
