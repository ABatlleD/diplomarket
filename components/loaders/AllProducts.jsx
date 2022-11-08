import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from '@mui/material'

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

function AllProductsLoader() {
  return (
    <div className='flex flex-wrap justify-between w-full'>
      {items.map((item) => (
        <div key={item}>
          <Skeleton variant="rectangular" width={10} height={100} />
          <Skeleton variant="rectangular" width={10} height={20} />
          <Skeleton variant="rectangular" width={10} height={20} />
          <Skeleton variant="rounded" width={10} height={20} />
        </div>
      ))}
    </div>
  )
}

AllProductsLoader.propTypes = {
  products: PropTypes.object
}

export default AllProductsLoader
