import React from 'react'
import MainLayout from '../../layouts/MainLayout'

function AllProducts() {
  return (
    <div className='flex flex-row justify-center mt-44 mb-44'>
      <div></div>
      <div></div>
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
