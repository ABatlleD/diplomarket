import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout.jsx'
import ProductsCarousel from '../components/products/ProductsSwiper.jsx'
import resources from '../config/restapi/resources.js'
import PropTypes from 'prop-types'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import PaymentIcon from '@mui/icons-material/Payment'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/layouts/AppHeader.jsx'
import MainCarousel from '../components/home/MainCarousel.jsx'

function Home({
  featuredProducts,
  featuredProductsError,
  recentlySolds,
  recentlySoldsError,
  todayRecomendations,
  todayRecomendationsError,
  carousel,
  carouselError
}) {
  const { t } = useTranslation()
  const [category, setCategory] = useState(Object.keys(featuredProducts)[0])
  const [categories] = useState(Object.keys(featuredProducts))
  const [featureds, setFeatureds] = useState([])

  useEffect(() => {
    setFeatureds(featuredProducts[category])
  }, [featureds])

  const handleChangeCategory = (category) => {
    setCategory(category)
    setFeatureds(featuredProducts[category])
  }

  return (
    <>
      <AppHeader title={t('pages.home')} />
      <div className='flex flex-col'>
        <div className=''>
          <MainCarousel carousel={carousel} />
        </div>
        <div className='FeaturedProducts mx-2 md:mx-4 mt-20 flex flex-col'>
          <div className='flex mb-1 flex-col md:flex-row md:justify-between'>
            <div className='font-bold mb-4 md:mb-0 text-4xl'>{t('home.featuredProducts')}</div>
            <div className='flex flex-row mt-2'>
              {categories.map((item, _idx) => (
                <div
                  key={_idx}
                  onClick={() => handleChangeCategory(item)}
                  className={
                    `md:pt-1 px-2 md:ml-4 h-8 mr-1 font-semibold hover:cursor-pointer ${
                      item === category
                      ? 'text-background-100 bg-button rounded-lg'
                      : 'text-button'
                    }`
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          {featuredProductsError &&
            <h2>{featuredProductsError}</h2>
          }
          <div>
            <ProductsCarousel products={featureds} />
          </div>
        </div>
        <div className='RecentlySoldProducts mx-4 mb-20 flex flex-col'>
          <div className='flex mb-8 flex-row justify-between'>
            <div className='font-bold text-4xl'>{t('home.recentlySold')}</div>
          </div>
          {recentlySoldsError &&
            <h2>{recentlySoldsError}</h2>
          }
          <div>
            <ProductsCarousel products={recentlySolds} />
          </div>
        </div>
        <div className='TodayRecomendationProducts mx-4 flex flex-col'>
          <div className='flex mb-8 flex-row justify-between'>
            <div className='font-bold text-4xl'>{t('home.todayRecomendation')}</div>
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
  const { carousel, carouselError } = await fetchCarousel()

  return {
    props: {
      featuredProducts,
      featuredProductsError,
      recentlySolds,
      recentlySoldsError,
      todayRecomendations,
      todayRecomendationsError,
      carousel,
      carouselError
    }
  }
}

async function fetchFeaturedProducts() {
  let featuredProductsError = ''
  let featuredProducts = []
  try {
    featuredProducts = await (await resources.featured_products.all(1)).data
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

async function fetchCarousel() {
  let carouselError = ''
  let carousel = []
  try {
    carousel = await (await resources.carousel.all()).data
    console.log(carousel)
  } catch (error) {
    carouselError = error.message
  }
  return { carousel, carouselError }
}

Home.propTypes = {
  featuredProducts: PropTypes.array,
  featuredProductsError: PropTypes.string,
  recentlySolds: PropTypes.array,
  recentlySoldsError: PropTypes.string,
  todayRecomendations: PropTypes.array,
  todayRecomendationsError: PropTypes.string,
  carousel: PropTypes.array,
  carouselError: PropTypes.string
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Home
