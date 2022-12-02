import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from '@mui/material'

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

function AllProductsLoader() {
  return (
    <div className='flex flex-wrap justify-evenly w-full'>
      {items.map((item) => (
        <div key={item} className='w-[30%] md:w-1/4 xl:w-[19%] mb-4'>
          <Skeleton variant="rectangular" width={200} height={150} sx={{ marginBottom: 1 }} />
          <Skeleton variant="rectangular" width={200} height={30} sx={{ marginBottom: 1 }} />
          <Skeleton variant="rectangular" width={200} height={30} sx={{ marginBottom: 1 }} />
          <Skeleton variant="rounded" width={200} height={30} sx={{ marginBottom: 1 }} />
        </div>
      ))}
    </div>
  )
}

AllProductsLoader.propTypes = {
  products: PropTypes.object
}

export default AllProductsLoader
