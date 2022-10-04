import React from 'react'
import MainLayout from '../layouts/MainLayout.jsx'
import { getRequest } from '../config/restapi'
import ProductsCarousel from '../components/products/ProductsSwiper.jsx'
import PropTypes from 'prop-types'
function Home({ products, apiError }) {
  // const [allProducts] = useState({})
  // const [loading] = useState(false)

  // async function fetchProducts() {
  //   try {
  //     setLoading(true)
  //     setProducts(products.data)
  //     setLoading(false)
  //   } catch (error) {
  //     setApiError(error.message)
  //   }
  // }

  // useEffect(() => {
  //   fetchProducts()
  // }, [setProducts])

  return (
    <>
      {/* {apiError &&
        <h2>{apiError}</h2>
      } */}
      <div className='flex flex-col'>
        <div className='AllProducts mx-4 flex flex-col'>
          <div className='flex mt-4 flex-row justify-between'>
            <div className='font-bold text-xl'>All Products</div>
          </div>
          <div>
            <ProductsCarousel products={products} />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { products, apiError } = await fetchAllUsers()

  return {
    props: {
      products,
      apiError
    }
  }
}

async function fetchAllUsers() {
  let apiError = ''
  let products = []
  try {
    products = await (await getRequest('products')).data
  } catch (error) {
    apiError = error.message
  }
  return { products, apiError }
}

Home.propTypes = {
  products: PropTypes.array,
  apiError: PropTypes.string
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Home
