import React from 'react'
import PropTypes from 'prop-types'
import FavItem from './FavItem'

function FavList({ products, loading }) {
  console.log('🚀 ~ file: ListProducts.jsx ~ line 7 ~ ListProducts ~ products', products)

  return (
    <div className='flex flex-wrap w-[96%]'>
      {products?.map((item) => (
        <div className='md:w-1/3 xl:w-[24%] mx-1 mb-4' key={item?.id}>
          <FavItem id={item?.id} />
        </div>
      ))}
    </div>
  )
}

FavList.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool
}

export default FavList
