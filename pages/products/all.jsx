import React from 'react'
import MainLayout from '../../layouts/MainLayout'

function AllProducts() {
  return (
    <div className='flex flex-col items-center mt-44 mb-44'>
      <p className='font-bold text-footer-background-200 text-4xl'>ALL PRODUCTS VIEW</p>
    </div>
  )
}

AllProducts.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      {page}
    </MainLayout>
  )
}

export default AllProducts
