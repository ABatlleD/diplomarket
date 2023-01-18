import React from 'react'
import dynamic from 'next/dynamic'

const ProductItem = dynamic(() => import('./ProductItem'))

function ListProducts({ products, loading }) {
  return (
    <div className="flex flex-wrap justify-evenly w-full">
      {products?.map((item) => (
        <div className="w-[30%] md:w-1/4 xl:w-[19%] mb-4" key={item.id}>
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  )
}

export default ListProducts
