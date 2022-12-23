import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import resources from '../restapi/resources'
import ListProducts from '../components/products/ListProducts'
import CategoriesAccordion from '../components/categories/CategoriesAccordion'
import { FormControlLabel, Pagination, TextField, Autocomplete, Checkbox, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import FilterBar from '../components/layouts/sidebar/FilterBar'
import TableRowsIcon from '@mui/icons-material/TableRows'
import WindowIcon from '@mui/icons-material/Window'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/layouts/AppHeader'
import { getCookie } from 'cookies-next'
import MainCarousel from '../components/home/MainCarousel'
import useWindowSize from '../hooks/WindowSize'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductItem from '../components/products/ProductItem'
import AllProductsLoader from '../components/loaders/AllProducts'
import HorizontalProductItem from '../components/products/HorizontalProductItem'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

const NotificationsTip = dynamic(() => import('../components/modals/NotificationsTip'), {
  loading: () => 'Loading...'
})

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
  const [listView, setListView] = useState(true)
  const [loading, setLoading] = useState()
  const [filterBar, setFilterBar] = useState(false)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [brands, setBrands] = useState([])
  const municipality = getCookie('NEXT_MUNICIPALITY')
  const [promotions, setPromotions] = useState(false)
  const [recommendations, setRecommendations] = useState(false)

  const [category, setCategory] = useState(undefined)
  const [selectedCategory, setSelectedCategory] = useState(undefined)
  const [offset, setOffset] = useState(0)
  const [subcategory, setSubcategory] = useState(undefined)
  const [brand, setBrand] = useState()
  const [provider, setProvider] = useState()
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1000)
  const [extra, setExtra] = useState(undefined)
  const [order, setOrder] = React.useState('recent')
  const { status, data } = useSession()
  const [openNotificationsTip, setOpenNotificationsTip] = useState(false)

  const handleChange = (event) => {
    setOrder(event.target.value)
  }

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
      .then(response => {
        const answer = []
        response.data.results.map((item) => {
          const el = {
            label: item.nombre,
            id: item.id
          }
          return answer.push(el)
        })
        return setSuppliers(answer)
      })
    resources.categories.all()
      .then(response => setCategories(response.data.results))
  }, [])

  useEffect(() => {
    if (status !== 'unauthenticated' && data && !data.rss) {
      console.log('🚀 ~ file: index.jsx:105 ~ useEffect ~ data', data)
      setOpenNotificationsTip(true)
    }
  }, [status])

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
      const element = document.getElementById('title')
      element.scrollIntoView()
      const filter = {
        offset,
        municipality_id: municipality,
        limit: 15,
        category,
        subcategory,
        brand,
        provider,
        min,
        max,
        extra
      }
      try {
        setLoading(true)
        resources.products.all(filter)
          .then(response => {
            setList(response.data)
            setLoading(false)
          })
      } catch (error) {
        productsError = error.message
      }
    }
  }, [offset, products, category, subcategory, brand, provider, min, max, extra])

  useEffect(() => {
    if (size.width <= 768) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
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
        setLoading(true)
        resources.products.all(filter)
          .then(response => {
            setMobileList(response.data.results)
            setLoading(false)
          })
      } catch (error) {
        productsError = error.message
      }
    }
  }, [products, category, subcategory, brand, provider, min, max])

  useEffect(() => {
    if (size.width <= 768) {
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
    setPromotions(false)
    setRecommendations(false)
    setExtra(undefined)
    switch (type) {
      case 'promotions':
        setPromotions(true)
        setExtra('rebajados')
        break
      case 'recommendations':
        setRecommendations(true)
        setExtra('recomendados')
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
              <div className='font-bold mt-2'>
                {i18n.language === 'es' ? selectedCategory.nombre : selectedCategory.nombre_ingles}
              </div>
            )}
            {!selectedCategory && (
              <div className='font-bold mt-2'>
                {t('filter.categories')}
              </div>
            )}
            <div className='flex flex-row'>
              <div className='mr-3 mt-2' onClick={() => setListView(!listView)}>
                {listView && (
                  <WindowIcon />
                )}
                {!listView && (
                  <TableRowsIcon />
                )}
              </div>
              <div
                className='mr-2 mt-2'
                onClick={() => setFilterBar(true)}
              >
                <FilterAltOutlinedIcon />
              </div>
              <div className='flex w-28'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t('filter.order.title')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={order}
                    label="Order"
                    size='small'
                    onChange={handleChange}
                  >
                    <MenuItem value={'recent'}>{t('filter.order.recent')}</MenuItem>
                    <MenuItem value={'highest_price'}>{t('filter.order.asc_price')}</MenuItem>
                    <MenuItem value={'lowest_price'}>{t('filter.order.desc_price')}</MenuItem>
                    <MenuItem value={'highest_discount'}>{t('filter.order.asc_discount')}</MenuItem>
                    <MenuItem value={'lowest_discount'}>{t('filter.order.desc_discount')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className='md:flex hidden mr-1 flex-col w-1/6'>
            <div className='flex flex-col'>
              <div className='flex flex-row mb-2 justify-between'>
                <p className='font-bold'>{t('filter.category')}</p>
                <div className='bg-footer-background-300 text-background-300 px-2 rounded-full hover:cursor-pointer mr-6' onClick={handleAllClick}>{t('filter.all')}</div>
              </div>
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
              <FormControlLabel value={promotions} onChange={() => handleChangeType('promotions')} control={<Checkbox size='small' />} label={t('filter.promotions')} />
              <FormControlLabel value={recommendations} onChange={() => handleChangeType('recommendations')} control={<Checkbox size='small' />} label={t('filter.recommendations')} />
            </div>
            <div className='flex flex-col mt-2 mb-4'>
              <p className='font-bold mb-2'>{t('filter.price')}</p>
              <div className='w-[92%]'>
                <div className='hover:cursor-pointer text-footer-background-300 hover:underline hover:text-button' onClick={() => handlePriceFilter([0, 25])}>US$0 {t('filter.to')} US$25</div>
                <div className='hover:cursor-pointer text-footer-background-300 hover:underline hover:text-button' onClick={() => handlePriceFilter([25, 50])}>US$25 {t('filter.to')} US$50</div>
                <div className='hover:cursor-pointer text-footer-background-300 hover:underline hover:text-button' onClick={() => handlePriceFilter([50, 100])}>US$50 {t('filter.to')} US$100</div>
                <div className='hover:cursor-pointer text-footer-background-300 hover:underline hover:text-button' onClick={() => handlePriceFilter([100, 200])}>US$100 {t('filter.to')} US$200</div>
                <div className='hover:cursor-pointer text-footer-background-300 hover:underline hover:text-button' onClick={() => handlePriceFilter([200, 1000])}>{t('filter.more')} US$200</div>
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
                size='small'
              />
            </div>
            <div className='flex flex-col mb-4 w-[95%]'>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={provider}
                options={suppliers}
                onChange={(event, newValue) => setProvider(newValue.id)}
                renderInput={(params) => <TextField {...params} label={t('filter.provider')} />}
                size='small'
              />
            </div>
          </div>
          <div className='flex flex-row w-full md:w-5/6'>
            <div className='flex flex-col items-center w-full'>
              <div className='flex flex-row justify-between w-full md:w-[98%] mb-4'>
                {selectedCategory && (
                  <div id='title' className='font-bold w-1/2 ml-4 mb-2 text-xl hidden md:flex'>
                    {i18n.language === 'es' ? selectedCategory.nombre : selectedCategory.nombre_ingles}
                  </div>
                )}
                {!selectedCategory && (
                  <div id='title' className='font-bold w-1/2 mb-2 text-xl hidden md:flex'>
                    {t('filter.categories')}
                  </div>
                )}
                <div className='hidden md:flex w-[25%]'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t('filter.order.title')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={order}
                    label="Order"
                    size='small'
                    onChange={handleChange}
                  >
                    <MenuItem value={'recent'}>{t('filter.order.recent')}</MenuItem>
                    <MenuItem value={'highest_price'}>{t('filter.order.asc_price')}</MenuItem>
                    <MenuItem value={'lowest_price'}>{t('filter.order.desc_price')}</MenuItem>
                    <MenuItem value={'highest_discount'}>{t('filter.order.asc_discount')}</MenuItem>
                    <MenuItem value={'lowest_discount'}>{t('filter.order.desc_discount')}</MenuItem>
                  </Select>
                </FormControl>
                </div>
              </div>
              {size.width <= 768 && loading && (
                <AllProductsLoader />
              )}
              {size.width <= 768 && municipality && !loading && (
                <InfiniteScroll
                  dataLength={mobileList.length}
                  next={getMorePost}
                  hasMore={true}
                  loader={<div className='flex flex-row w-full justify-center my-6 text-text-blue'> Loading...</div>}
                  endMessage={<h4>Nothing more to show</h4>}
                >
                  <div className='flex flex-wrap justify-evenly w-full'>
                    {mobileList.map((data) => (
                      <div className={listView ? 'w-full mx-2 my-2' : 'w-[30%] md:w-1/4 xl:w-[19%] mb-4'} key={data.id}>
                        {!listView && (
                          <ProductItem product={data} />
                        )}
                        {listView && (
                          <HorizontalProductItem product={data} />
                        )}
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              )}
              {size.width > 768 && loading && (
                <div className='ml-4'>
                  <AllProductsLoader />
                </div>
              )}
              {size.width > 768 && !loading && (
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
        <div className='flex md:flex-row flex-wrap justify-around text-footer-background-300 md:w-[95%] md:mx-auto md:my-28'>
          <div className='flex flex-col items-center'>
            <LocalShippingOutlinedIcon sx={{ fontSize: '3rem' }} />
            <p className='text-footer-background-300 md:text-xl text-base'>{t('home.delivery.title')}</p>
            <p className='text-text-100 md:text-lg text-xs'>{t('home.delivery.description')}</p>
          </div>
          <div className='flex flex-col  items-center'>
            <PriceCheckIcon sx={{ fontSize: '3rem' }} />
            <p className='text-footer-background-300 md:text-xl text-base'>{t('home.prices.title')}</p>
            <p className='text-text-100 md:text-lg text-xs'>{t('home.prices.description')}</p>
          </div>
          <div className='flex flex-col items-center my-12 md:my-0'>
            <SentimentSatisfiedOutlinedIcon sx={{ fontSize: '3rem' }} />
            <p className='text-footer-background-300 md:text-xl text-base'>{t('home.customer.title')}</p>
            <p className='text-text-100 md:text-lg text-xs'>{t('home.customer.description')}</p>
          </div>
          <div className='flex flex-col items-center my-12 md:my-0'>
            <CreditCardOutlinedIcon sx={{ fontSize: '3rem' }} />
            <p className='text-footer-background-300 md:text-xl text-base'>{t('home.payments.title')}</p>
            <p className='text-text-100 md:text-lg text-xs'>{t('home.payments.description')}</p>
          </div>
        </div>
        <NotificationsTip {...{ openNotificationsTip, setOpenNotificationsTip }}/>
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

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      {page}
    </MainLayout>
  )
}

export default Home
