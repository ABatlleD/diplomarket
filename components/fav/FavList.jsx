import React from 'react'
import FavItem from './FavItem'

function FavList({ products, loading }) {
  return (
    <div className='flex flex-wrap justify-center w-[96%] 2xl:w-[90%] xl:w-[90%]'>
      {products?.map((item) => (
        <div className='md:w-1/3 xl:w-[14%] mx-2 mb-4' key={item?.id}>
          <FavItem id={item?.id} />
        </div>
      ))}
    </div>
  )
}

export default FavList
