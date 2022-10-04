import React, from 'react'
import MainLayout from '../layouts/MainLayout.jsx'
import { getRequest } from '../config/restapi'
import ProductsCarousel from '../components/products/ProductsSwiper.jsx'
import PropTypes from 'prop-types'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import PaymentIcon from '@mui/icons-material/Payment'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/layouts/AppHeader.jsx'
function Home({ products, apiError }) {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.home')} />
      {apiError &&
        <h2>{apiError}</h2>
      }
      <div className='flex flex-col'>
        <div className='AllProducts mx-4 flex flex-col'>
          <div className='flex mt-4 flex-row justify-between'>
            <div className='font-bold text-xl'>{t('home.allProducts')}</div>
          </div>
          <div>
            <ProductsCarousel products={products} />
          </div>
        </div>
        <div className='flex flex-col items-center md:flex-row md:justify-around my-8 md:my-16'>
          <div className='flex flex-col items-center text-center mb-4 md:mb-0 md:mt-8'>
            <PriceCheckIcon fontSize='large' />
            <p className='font-semibold'>{t('home.prices.title')}</p>
            <p>{t('home.prices.description')}</p>
          </div>
          <div className='flex flex-col items-center text-center my-4 md:my-4'>
            <SentimentSatisfiedAltIcon fontSize='large' />
            <p className='font-semibold'>{t('home.customer.title')}</p>
            <p>{t('home.customer.description')}</p>
          </div>
          <div className='flex flex-col items-center text-center my-4 md:my-4'>
            <PaymentIcon fontSize='large' />
            <p className='font-semibold'>{t('home.payments.title')}</p>
            <p>{t('home.payments.description')}</p>
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
