import React from 'react'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem'
import AllProductsLoader from '../loaders/AllProducts'

function ListProducts({ products, loading }) {
  if (!loading) {
    return (<AllProductsLoader />)
  }

  return (
    <div className='flex flex-wrap justify-between'>
      {loading && products?.results?.map((item) => (
        <div className='md:w-1/3 xl:w-[24%] mx-1 mb-4' key={item.id}>
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  )
}

ListProducts.propTypes = {
  products: PropTypes.object,
  loading: PropTypes.bool
}

export default ListProducts
