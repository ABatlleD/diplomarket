import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout.jsx'
import ProductsCarousel from '../components/products/ProductsSwiper.jsx'
import CategoriesCarousel from '../components/categories/CategoriesSwiper.jsx'
import resources from '../restapi/resources.js'
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
  categories,
  categoriesError,
  todayRecomendations,
  todayRecomendationsError,
  carousel,
  carouselError
}) {
  const { t } = useTranslation()
  const [category, setCategory] = useState(Object.keys(featuredProducts)[0])
  const [categoriesFilter] = useState(Object.keys(featuredProducts))
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
        <div className='mb-1 md:mb-0'>
          <MainCarousel carousel={carousel} />
        </div>
        <div className='FeaturedProducts mx-1 md:mx-4 mt-4 mb-4 md:mb-10 flex flex-col'>
          <div className='flex mb-0 flex-col items-center'>
            <div className='flex flex-row mt-1'>
              {categoriesFilter.map((item, _idx) => (
                item !== 'Todos' &&
                <div
                  key={_idx}
                  onClick={() => handleChangeCategory(item)}
                  className={
                    `md:pt-1 px-1 md:px-2 md:ml-4 md:h-8 mr-1 font-semibold text-xs md:text-base hover:cursor-pointer ${
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
          <div className='mt-4 md:mb-12 xl:mx-32'>
            <ProductsCarousel products={featureds} />
          </div>
        </div>
        <div className='RecentlySoldProducts mx-2 md:mb-10 flex flex-col'>
          {categoriesError &&
            <h2>{categoriesError}</h2>
          }
          <div className='xl:mx-20'>
            <CategoriesCarousel categories={categories} />
          </div>
        </div>
        <div className='TodayRecomendationProducts mx-2 md:mx-4 flex flex-col'>
          <div className='flex mb-2 flex-row justify-center'>
          </div>
          {todayRecomendationsError &&
            <h2>{todayRecomendationsError}</h2>
          }
          <div className='my-4 xl:mx-32'>
            <ProductsCarousel products={todayRecomendations} />
          </div>
        </div>
        <div className='flex flex-col items-center md:flex-row md:justify-around my-2 md:my-16'>
          <div className='flex flex-col items-center text-center mb-2 md:mb-0 md:mt-8'>
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

export async function getServerSideProps(context) {
  const { featuredProducts, featuredProductsError } = await fetchFeaturedProducts()
  const { categories, categoriesError } = await fetchCategories()
  const { todayRecomendations, todayRecomendationsError } = await fetchTodayRecomendations()
  const { carousel, carouselError } = await fetchCarousel()

  return {
    props: {
      featuredProducts,
      featuredProductsError,
      categories,
      categoriesError,
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

async function fetchCategories() {
  let categoriesError = ''
  let categories = []
  try {
    categories = await (await resources.categories.all(1)).data
  } catch (error) {
    categoriesError = error.message
  }
  return { categories, categoriesError }
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
  } catch (error) {
    carouselError = error.message
  }
  return { carousel, carouselError }
}

Home.propTypes = {
  featuredProducts: PropTypes.array,
  featuredProductsError: PropTypes.string,
  categories: PropTypes.array,
  categoriesError: PropTypes.string,
  todayRecomendations: PropTypes.array,
  todayRecomendationsError: PropTypes.string,
  carousel: PropTypes.array,
  carouselError: PropTypes.string
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      {page}
    </MainLayout>
  )
}

export default Home
