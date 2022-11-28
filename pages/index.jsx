import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import resources from '../restapi/resources'
import PropTypes from 'prop-types'
import ListProducts from '../components/products/ListProducts'
import CategoriesAccordion from '../components/categories/CategoriesAccordion'
import { Slider, FormControlLabel, Pagination, RadioGroup, Radio } from '@mui/material'
import FilterBar from '../components/layouts/sidebar/FilterBar'
import TuneIcon from '@mui/icons-material/Tune'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/layouts/AppHeader'
import { getCookie } from 'cookies-next'
import MainCarousel from '../components/home/MainCarousel'

function Home({
  products,
  productsError,
  carousel,
  carouselError
}) {
  const { t, i18n } = useTranslation()
  const [list, setList] = useState(products)
  const [loading, setLoading] = useState(false)
  const [filterBar, setFilterBar] = useState(false)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState()
  const [brands, setBrands] = useState()
  const [prices, setPrices] = useState([0, 1000])
  const municipality = getCookie('NEXT_MUNICIPALITY')

  const [category, setCategory] = useState(undefined)
  const [selectedCategory, setSelectedCategory] = useState(undefined)
  const [offset, setOffset] = useState(0)
  const [subcategory, setSubcategory] = useState(undefined)
  const [brand, setBrand] = useState(0)
  const [provider, setProvider] = useState(0)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1000)

  useEffect(() => {
    resources.brands.all()
      .then(response => setBrands(response.data))
    resources.suppliers.all()
      .then(response => setSuppliers(response.data))
    resources.categories.all()
      .then(response => setCategories(response.data.results))
  }, [])

  const handlePriceChange = (event, newPrices) => {
    setPrices(newPrices)
  }

  const handlePriceFilter = () => {
    setMin(prices[0])
    setMax(prices[1])
  }

  const handleBrandFilter = (event) => {
    setBrand(event.target.value)
  }

  const handleSubcategoryFilter = (subcategory) => {
    setFilterBar(false)
    setCategory(undefined)
    setSelectedCategory(subcategory)
    setSubcategory(subcategory.pk)
  }

  const handleCategoryFilter = (category) => {
    setFilterBar(false)
    setSubcategory(undefined)
    setSelectedCategory(category)
    console.log(selectedCategory)
    setCategory(category.id)
  }

  const handleProviderFilter = (event) => {
    setProvider(event.target.value)
  }

  const handleAllClick = () => {
    setProvider(0)
    setBrand(0)
    setCategory(undefined)
    setSubcategory(undefined)
    setSelectedCategory(undefined)
    setMin(0)
    setMax(1000)
    setPrices([0, 1000])
  }

  const handleMobileFilter = (mobileFilter) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setLoading(true)
    const filter = {
      offset,
      municipality_id: municipality,
      limit: 15,
      category,
      subcategory,
      brand: mobileFilter.brand,
      provider: mobileFilter.provider,
      min: mobileFilter.min,
      max: mobileFilter.max
    }
    try {
      resources.products.all(filter)
        .then(response => setList(response.data))
    } catch (error) {
      productsError = error.message
    }
    setLoading(false)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setLoading(true)
    const filter = {
      offset,
      municipality_id: municipality,
      limit: 15,
      category,
      subcategory,
      brand,
      provider,
      min,
      max
    }
    try {
      resources.products.all(filter)
        .then(response => setList(response.data))
    } catch (error) {
      productsError = error.message
    }
    setLoading(false)
  }, [offset, products, category, subcategory, brand, provider, min, max])

  useEffect(() => {
    setOffset(0)
    setPage(1)
  }, [category, subcategory, brand, provider, min, max])

  const handlePaginationChange = async (event, value) => {
    setOffset((value - 1) * 15)
    setPage(value)
  }

  useEffect(() => {
    if (list.total % 15 !== 0) {
      setPages(Math.floor(list.total / 15) + 1)
    } else {
      setPages(list.total / 15)
    }
  }, [list])

  return (
    <>
      <AppHeader title={t('pages.products')} />
      <div className='flex flex-col'>
        <div className='mb-3 md:mb-0'>
          <MainCarousel carousel={carousel} />
        </div>
        <div className='flex md:flex-row flex-col w-full md:w-[95%] md:mx-auto mb-3 md:my-5'>
          <div className='mx-3 flex md:hidden text-sm flex-row justify-between mb-3'>
            {selectedCategory && (
              <div className='font-bold'>
                {i18n.language === 'es' ? selectedCategory.nombre : selectedCategory.nombre_ingles}
              </div>
            )}
            {!selectedCategory && (
              <div className='font-bold'>
                {t('filter.categories')}
              </div>
            )}
            <div
              onClick={() => setFilterBar(true)}
            >
              <TuneIcon />
            </div>
          </div>
          <div className='md:flex hidden mr-1 flex-col w-3/12'>
            <div className='flex flex-col'>
              <p className='font-bold mb-2'>{t('filter.category')}</p>
              <div className=''>
                {categories.map((item) => (
                  <div key={item.id} className='border-2 border-background-100'>
                    <CategoriesAccordion
                      category={item}
                      items={item.subcategorias}
                      {...{
                        handleCategoryFilter,
                        handleSubcategoryFilter
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col my-2'>
              <p className='font-bold mb-2'>{t('filter.price')}</p>
              <div className='w-[92%]'>
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  size='small'
                  value={prices}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  color='secondary'
                  max={1000}
                />
              </div>
              <div className='flex flex-row justify-between w-[92%]'>
                <div className=''>
                  <p className='border rounded-sm text-sm px-4'>${prices[0]} - ${prices[1]}</p>
                </div>
                <div
                  className='bg-footer-background-200 text-background-100 text-sm px-2 font-bold shadow-sm rounded-sm hover:cursor-pointer hover:opacity-90'
                  onClick={handlePriceFilter}
                >
                  {t('filter.filter')}
                </div>
              </div>
            </div>
            <div className='flex flex-col w-[95%]'>
              <p className='font-bold my-2'>{t('filter.brand')}</p>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={brand}
                onChange={handleBrandFilter}
              >
                <div className='flex flex-wrap'>
                  {brands?.results?.map((item) => (
                    <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.nombre} />
                  ))}
                </div>
              </RadioGroup>
            </div>
            <div className='flex flex-col w-[95%]'>
              <p className='font-bold my-2'>{t('filter.provider')}</p>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={provider}
                onChange={handleProviderFilter}
              >
                <div className='flex flex-wrap'>
                  {suppliers?.results?.map((item) => (
                    <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.nombre} />
                  ))}
                </div>
              </RadioGroup>
            </div>
            <div className='my-2 underline hover:cursor-pointer' onClick={handleAllClick}>{t('filter.all')}</div>
          </div>
          <div className='flex flex-row w-full md:w-9/12'>
            <div className='flex flex-col items-center w-full'>
              {selectedCategory && (
                <div className='font-bold w-full ml-4 mb-2 text-xl hidden md:flex'>
                  {i18n.language === 'es' ? selectedCategory.nombre : selectedCategory.nombre_ingles}
                </div>
              )}
              {!selectedCategory && (
                <div className='font-bold w-full ml-4 mb-2 text-xl hidden md:flex'>
                  {t('filter.categories')}
                </div>
              )}
              <ListProducts products={list} loading={loading} />
              <div className='mt-2'>
                <Pagination
                  count={pages}
                  showFirstButton
                  size='large'
                  showLastButton
                  page={page}
                  onChange={handlePaginationChange}
                />
              </div>
            </div>
          </div>
          <FilterBar {...{
            filterBar,
            setFilterBar,
            handleMobileFilter,
            handleCategoryFilter,
            setCategory,
            setSubcategory,
            handleSubcategoryFilter,
            setSelectedCategory
          }} />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ req, res }, context) {
  const municipality = getCookie('NEXT_MUNICIPALITY', { req, res })
  const { products, productsError } = await fetchProducts(municipality)
  const { carousel, carouselError } = await fetchCarousel()

  return {
    props: {
      products,
      productsError,
      carousel,
      carouselError
    }
  }
}

async function fetchProducts(municipality) {
  let productsError = ''
  let products = []
  const filter = {
    offset: 0,
    limit: 15,
    municipality_id: municipality
  }
  try {
    products = await (await resources.products.all(filter)).data
  } catch (error) {
    productsError = error.message
  }
  return { products, productsError }
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
  products: PropTypes.object,
  productsError: PropTypes.string,
  carousel: PropTypes.object,
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
