import React from 'react'
import MainLayout from '../layouts/MainLayout.jsx'
import ProductsCarousel from '../components/products/ProductsSwiper.jsx'
import resources from '../config/restapi/resources.js'
import PropTypes from 'prop-types'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import PaymentIcon from '@mui/icons-material/Payment'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/layouts/AppHeader.jsx'
function Home({
  featuredProducts,
  featuredProductsError,
  recentlySolds,
  recentlySoldsError,
  todayRecomendations,
  todayRecomendationsError
}) {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.home')} />
      <div className='flex flex-col'>
        <div className='FeaturedProducts mx-4 flex flex-col'>
          <div className='flex mt-4 flex-row justify-between'>
            <div className='font-bold text-xl'>{t('home.featuredProducts')}</div>
          </div>
          {featuredProductsError &&
            <h2>{featuredProductsError}</h2>
          }
          <div>
            <ProductsCarousel products={featuredProducts} />
          </div>
        </div>
        <div className='RecentlySoldProducts mx-4 flex flex-col'>
          <div className='flex mt-4 flex-row justify-between'>
            <div className='font-bold text-xl'>{t('home.recentlySold')}</div>
          </div>
          {recentlySoldsError &&
            <h2>{recentlySoldsError}</h2>
          }
          <div>
            <ProductsCarousel products={recentlySolds} />
          </div>
        </div>
        <div className='TodayRecomendationProducts mx-4 flex flex-col'>
          <div className='flex mt-4 flex-row justify-between'>
            <div className='font-bold text-xl'>{t('home.todayRecomendation')}</div>
          </div>
          {todayRecomendationsError &&
            <h2>{todayRecomendationsError}</h2>
          }
          <div>
            <ProductsCarousel products={todayRecomendations} />
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
  const { featuredProducts, featuredProductsError } = await fetchFeaturedProducts()
  const { recentlySolds, recentlySoldsError } = await fetchRecentlySolds()
  const { todayRecomendations, todayRecomendationsError } = await fetchTodayRecomendations()

  return {
    props: {
      featuredProducts,
      featuredProductsError,
      recentlySolds,
      recentlySoldsError,
      todayRecomendations,
      todayRecomendationsError
    }
  }
}

async function fetchFeaturedProducts() {
  let featuredProductsError = ''
  let featuredProducts = []
  try {
    featuredProducts = await (await resources.featured_products.all(1)).data.Todos
  } catch (error) {
    featuredProductsError = error.message
  }
  return { featuredProducts, featuredProductsError }
}

async function fetchRecentlySolds() {
  let recentlySoldsError = ''
  let recentlySolds = []
  try {
    recentlySolds = await (await resources.recently_solds.all(1)).data
  } catch (error) {
    recentlySoldsError = error.message
  }
  return { recentlySolds, recentlySoldsError }
}

async function fetchTodayRecomendations() {
  let todayRecomendationsError = ''
  let todayRecomendations = []
  try {
    todayRecomendations = await (await resources.today_recomendations.all(1)).data
  } catch (error) {
    todayRecomendationsError = error.message
  }
  return { todayRecomendations, todayRecomendationsError }
}

Home.propTypes = {
  featuredProducts: PropTypes.array,
  featuredProductsError: PropTypes.string,
  recentlySolds: PropTypes.array,
  recentlySoldsError: PropTypes.string,
  todayRecomendations: PropTypes.array,
  todayRecomendationsError: PropTypes.string
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Home
