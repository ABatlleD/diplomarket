import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import resources from '../restapi/resources'
import PropTypes from 'prop-types'
import ListProducts from '../components/products/ListProducts'
import CategoriesAccordion from '../components/categories/CategoriesAccordion'
import { FormControlLabel, Pagination, RadioGroup, Radio, TextField, Autocomplete } from '@mui/material'
import FilterBar from '../components/layouts/sidebar/FilterBar'
import TuneIcon from '@mui/icons-material/Tune'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/layouts/AppHeader'
import { getCookie } from 'cookies-next'
import MainCarousel from '../components/home/MainCarousel'
import useWindowSize from '../hooks/WindowSize'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductItem from '../components/products/ProductItem'

function Home({
  products,
  productsError,
  carousel,
  carouselError
}) {
  const size = useWindowSize()
  const { t, i18n } = useTranslation()
  const [list, setList] = useState(products)
  const [mobileList, setMobileList] = useState(products.results)
  const [loading, setLoading] = useState(false)
  const [filterBar, setFilterBar] = useState(false)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState()
  const [brands, setBrands] = useState([])
  const municipality = getCookie('NEXT_MUNICIPALITY')
  const [featureds, setFeatureds] = useState(false)
  const [promotions, setPromotions] = useState(false)
  const [recomendations, setRecomendations] = useState(false)

  const [category, setCategory] = useState(undefined)
  const [selectedCategory, setSelectedCategory] = useState(undefined)
  const [offset, setOffset] = useState(0)
  const [subcategory, setSubcategory] = useState(undefined)
  const [brand, setBrand] = useState()
  const [provider, setProvider] = useState(0)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1000)

  const getMorePost = async () => {
    setOffset(offset + 15)
  }

  useEffect(() => {
    resources.brands.all()
      .then(response => {
        const answer = []
        response.data.results.map((item) => {
          const el = {
            label: item.nombre,
            id: item.id
          }
          return answer.push(el)
        })
        return setBrands(answer)
      })
    resources.suppliers.all()
      .then(response => setSuppliers(response.data))
    resources.categories.all()
      .then(response => setCategories(response.data.results))
  }, [])

  const handlePriceFilter = (prices) => {
    setMin(prices[0])
    setMax(prices[1])
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
        .then(response => setMobileList(response.data.results))
    } catch (error) {
      productsError = error.message
    }
    setLoading(false)
  }

  useEffect(() => {
    if (size.width > 768) {
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
    }
  }, [offset, products, category, subcategory, brand, provider, min, max])

  useEffect(() => {
    if (size.width <= 768) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      setLoading(true)
      const filter = {
        offset: 0,
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
          .then(response => setMobileList(response.data.results))
      } catch (error) {
        productsError = error.message
      }
      setLoading(false)
    }
  }, [products, category, subcategory, brand, provider, min, max])

  useEffect(() => {
    if (size.width <= 768) {
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
          .then(response => setMobileList((mobileList) => [...mobileList, ...response.data.results]))
      } catch (error) {
        productsError = error.message
      }
      setLoading(false)
    }
  }, [offset])

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

  const handleChangeType = (type) => {
    setFeatureds(false)
    setPromotions(false)
    setRecomendations(false)
    switch (type) {
      case 'featureds':
        setFeatureds(true)
        break
      case 'promotions':
        setPromotions(true)
        break
      case 'recommendations':
        setRecomendations(true)
        break
    }
  }

  return (
    <>
      <AppHeader title={t('pages.products')} />
      <div className='flex flex-col dark:bg-background-100'>
        <div className='mb-3 md:mb-0'>
          <MainCarousel carousel={carousel} />
        </div>
        <div className='dark:text-[black] flex md:flex-row flex-col w-full md:w-[95%] md:mx-auto mb-3 md:my-5'>
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
          <div className='md:flex hidden mr-1 flex-col w-1/6'>
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
            <div className='flex flex-col my-4'>
              <FormControlLabel value={featureds} onChange={() => handleChangeType('featureds')} control={<Radio />} label={t('filter.featureds')} />
              <FormControlLabel value={promotions} onChange={() => handleChangeType('featureds')} control={<Radio />} label={t('filter.promotions')} />
              <FormControlLabel value={recomendations} onChange={() => handleChangeType('featureds')} control={<Radio />} label={t('filter.recomendations')} />
            </div>
            <div className='flex flex-col mt-2 mb-4'>
              <p className='font-bold mb-2'>{t('filter.price')}</p>
              <div className='w-[92%]'>
                <div className='mb-1 hover:cursor-pointer' onClick={() => handlePriceFilter([0, 25])}>US$0 {t('filter.to')} US$25</div>
                <div className='mb-1 hover:cursor-pointer' onClick={() => handlePriceFilter([25, 50])}>US$25 {t('filter.to')} US$50</div>
                <div className='mb-1 hover:cursor-pointer' onClick={() => handlePriceFilter([50, 100])}>US$50 {t('filter.to')} US$100</div>
                <div className='mb-1 hover:cursor-pointer' onClick={() => handlePriceFilter([100, 200])}>US$100 {t('filter.to')} US$200</div>
                <div className='mb-1 hover:cursor-pointer' onClick={() => handlePriceFilter([200, 1000])}>{t('filter.more')} US$200</div>
              </div>
            </div>
            <div className='flex flex-col mb-4 w-[95%]'>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={brand}
                options={brands}
                onChange={(event, newValue) => setBrand(newValue.id)}
                renderInput={(params) => <TextField {...params} label={t('filter.brand')} />}
              />
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
          <div className='flex flex-row w-full md:w-5/6'>
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
              {size.width <= 768 && (
                <InfiniteScroll
                  dataLength={mobileList.length}
                  next={getMorePost}
                  hasMore={true}
                  loader={<div className='flex flex-row w-full justify-center my-6 text-text-blue'> Loading...</div>}
                  endMessage={<h4>Nothing more to show</h4>}
                >
                  <div className='flex flex-wrap justify-evenly w-full'>
                    {mobileList.map((data) => (
                      <div className='w-[30%] md:w-1/4 xl:w-[19%] mb-4' key={data.id}>
                        <ProductItem product={data} />
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              )}
              {size.width > 768 && (
                <ListProducts products={list} loading={loading} />
              )}
              {size.width > 768 && (
                <div className='mt-2'>
                  <Pagination
                    count={pages}
                    showFirstButton
                    size='medium'
                    showLastButton
                    page={page}
                    onChange={handlePaginationChange}
                  />
                </div>
              )}
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
