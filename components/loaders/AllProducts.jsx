import React from 'react'
import { Skeleton } from '@mui/material'
import useWindowSize from '../../hooks/WindowSize'

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

function AllProductsLoader() {
  const size = useWindowSize()

  return (
    <div className='flex flex-wrap justify-evenly w-full'>
      {items.map((item) => (
        <div key={item} className='w-[30%] md:w-1/4 xl:w-[19%] mb-4'>
          <Skeleton variant="rectangular" width={size.width < 768 ? 120 : 200} height={140} sx={{ marginBottom: 1 }} />
          <Skeleton variant="rectangular" width={size.width < 768 ? 120 : 200} height={25} sx={{ marginBottom: 1 }} />
          <Skeleton variant="rectangular" width={size.width < 768 ? 120 : 200} height={25} sx={{ marginBottom: 1 }} />
          <Skeleton variant="rounded" width={size.width < 768 ? 120 : 200} height={25} sx={{ marginBottom: 1 }} />
        </div>
      ))}
    </div>
  )
}

export default AllProductsLoader
