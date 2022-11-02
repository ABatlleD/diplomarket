import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import FilterLayout from '../../layouts/FilterLayout'

function AllProducts() {
  return (
    <div className='flex flex-row border h-44 justify-center w-100'>

    </div>
  )
}

AllProducts.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      <FilterLayout options={''}>
        {page}
      </FilterLayout>
    </MainLayout>
  )
}

export default AllProducts
