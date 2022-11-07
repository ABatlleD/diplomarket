import React, { useState, useEffect } from 'react'
import MainLayout from '../../layouts/MainLayout'
import FilterLayout from '../../layouts/FilterLayout'
import resources from '../../restapi/resources'
import PropTypes from 'prop-types'
import ListProducts from '../../components/products/ListProducts'
import { Pagination } from '@mui/material'

function AllProducts({ products, productsError }) {
  const [list, setList] = useState(products)
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)

  const handleChange = async (event, value) => {
    setLoading(true)
    setPage(value)
    try {
      await setList(await (await resources.products.all((value - 1) * 15, 15, 1)).data)
    } catch (error) {
      productsError = error.message
    }
    setLoading(false)
  }

  useEffect(() => {
    if (list) {
      if (list.total % 15 !== 0) {
        setPages(Math.floor(list.total / 15) + 1)
      } else {
        setPages(list.total / 15)
      }
    }
  }, [products])

  return (
    <div className='flex flex-col items-center w-full'>
      <ListProducts products={list} loading={loading} />
      <div className='mt-4'>
        <Pagination
          count={pages}
          showFirstButton
          size='large'
          showLastButton
          page={page}
          onChange={handleChange}
        />
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
