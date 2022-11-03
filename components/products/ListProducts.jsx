import React from 'react'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem'

function ListProducts({ products }) {
  return (
    <div className='flex flex-wrap justify-between'>
      {products?.results?.map((item) => (
        <div className='md:w-1/3 xl:w-[24%] mx-1 mb-4' key={item.id}>
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  )
}

ListProducts.propTypes = {
  products: PropTypes.object
}

export default ListProducts
