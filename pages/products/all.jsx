import React, { useState, useEffect } from 'react'
import MainLayout from '../../layouts/MainLayout'
import resources from '../../restapi/resources'
import PropTypes from 'prop-types'
import ListProducts from '../../components/products/ListProducts'
import CategoriesAccordion from '../../components/categories/CategoriesAccordion'
import { Slider, FormControlLabel, Pagination, RadioGroup, Radio } from '@mui/material'
import FilterBar from '../../components/layouts/sidebar/FilterBar'
import TuneIcon from '@mui/icons-material/Tune'

// TODO: fix scroll to top on pagination change

function AllProducts({ products, productsError }) {
  const [list, setList] = useState(products)
  const [loading, setLoading] = useState(false)
  const [filterBar, setFilterBar] = useState(false)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState()
  const [brands, setBrands] = useState()
  const [prices, setPrices] = useState([0, 1000])

  const [category, setCategory] = useState(undefined)
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
    setCategory(undefined)
    setSubcategory(subcategory)
  }

  const handleCategoryFilter = (category) => {
    setSubcategory(undefined)
    setCategory(category)
  }

  const handleProviderFilter = (event) => {
    setProvider(event.target.value)
  }

  const handleAllClick = () => {
    setProvider(0)
    setBrand(0)
    setCategory(undefined)
    setSubcategory(undefined)
    setMin(0)
    setMax(1000)
    setPrices([0, 1000])
  }

  const handleMobileFilter = (mobileFilter) => {
    console.log('🚀 ~ file: all.jsx ~ line 79 ~ handleMobileFilter ~ mobileFilter', mobileFilter)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setLoading(true)
    const filter = {
      offset,
      municipality_id: 1,
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
      municipality_id: 1,
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
    <div className='flex md:flex-row flex-col w-full md:w-[95%] md:mx-auto my-3 md:my-10'>
      <div className='mx-3 flex md:hidden text-sm flex-row justify-between mb-3'>
        <div className='font-bold'>
          Todas las categoías
        </div>
        <div
          onClick={() => setFilterBar(true)}
        >
          <TuneIcon />
        </div>
      </div>
      <div className='md:flex hidden mr-1 flex-col w-3/12'>
        <div className='flex flex-col'>
          <p className='font-bold mb-2'>Categories</p>
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
          <p className='font-bold mb-2'>Price</p>
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
              Filter
            </div>
          </div>
        </div>
        <div className='flex flex-col w-[95%]'>
          <p className='font-bold my-2'>Brands</p>
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
          <p className='font-bold my-2'>Providers</p>
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
        <div className='my-2 underline hover:cursor-pointer' onClick={handleAllClick}>View All</div>
      </div>
      <div className='flex flex-row w-full md:w-9/12'>
        <div className='flex flex-col items-center w-full'>
          <div className='font-bold w-full ml-4 mb-2 text-xl hidden md:flex'>Todas las categorías</div>
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
      <FilterBar {...{ filterBar, setFilterBar, handleMobileFilter }} />
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
  const filter = {
    offset: 0,
    limit: 15,
    municipality_id: 1
  }
  try {
    products = await (await resources.products.all(filter)).data
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
      {page}
    </MainLayout>
  )
}

export default AllProducts
