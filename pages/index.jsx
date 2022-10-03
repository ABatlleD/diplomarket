import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout.jsx'
import { getRequest } from '../config/restapi'

function Home() {
  const [products, setProducts] = useState({
    data: []
  })
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchProducts() {
    try {
      setLoading(true)
      setProducts(await getRequest('products'))
      setLoading(false)
    } catch (error) {
      setApiError(error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [setProducts])

  return (
    <>
      {loading
        ? <>
            Loading...
          </>
        : <>
            {apiError &&
              <h2>{apiError}</h2>
            }
            {products && products.data.map((product) => (
              <h2 key={product.id}>{product.title}</h2>
            ))}
          </>
      }
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Home
