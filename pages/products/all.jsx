import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import FilterLayout from '../../layouts/FilterLayout'
import resources from '../../restapi/resources'
import PropTypes from 'prop-types'
import ListProducts from '../../components/products/ListProducts'
import { Pagination } from '@mui/material'

function AllProducts({ products, productsError }) {
  return (
    <div className='flex flex-col items-center w-full'>
      <ListProducts products={products} />
      <div className='mt-4'>
        <Pagination count={3} showFirstButton size='large' showLastButton />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { products, productsError } = await fetchProducts()

  return {
    props: {
      products,
      productsError
    }
  }
}

async function fetchProducts() {
  let productsError = ''
  let products = []
  try {
    products = await (await resources.products.all(0, 15, 1)).data
  } catch (error) {
    productsError = error.message
  }
  console.log('🚀 ~ file: all.jsx ~ line 36 ~ fetchProducts ~ products', products)
  return { products, productsError }
}

AllProducts.propTypes = {
  products: PropTypes.object,
  productsError: PropTypes.string
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
