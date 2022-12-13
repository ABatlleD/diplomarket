import React, { useState, useEffect } from 'react'
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
        <div className='w-[30%] md:w-1/4 xl:w-[19%] mb-4' key={item.id}>
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  )
}

export default ListProducts
