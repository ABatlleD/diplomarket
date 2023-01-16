import React from 'react'
import dynamic from 'next/dynamic'

const ProviderItem = dynamic(() => import('./ProviderItem'))

function ListProviders({ providers }) {
  return (
    <div className="flex flex-wrap justify-evenly w-full">
      {providers?.results?.map((item) => (
        <div className="w-[45%] md:w-1/4 xl:w-[19%] mb-4" key={item.id}>
          <ProviderItem provider={item} />
        </div>
      ))}
    </div>
  )
}

export default ListProviders
