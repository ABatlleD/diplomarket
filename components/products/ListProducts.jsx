import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem'
import AllProductsLoader from '../loaders/AllProducts'

function ListProducts({ products, loading }) {
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  if (isLoading) {
    return (<AllProductsLoader />)
  }

  return (
    <div className='flex flex-wrap justify-evenly w-full'>
      {!isLoading && products?.results?.map((item) => (
        <div className='md:w-1/3 xl:w-[24%] mx-1 mb-4' key={item.id}>
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  )
}

ListProducts.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool
}

export default ListProducts
