import React, { useState, useEffect } from 'react'
import MainLayout from '../../layouts/MainLayout'
import resources from '../../restapi/resources'
import PropTypes from 'prop-types'
import ListProducts from '../../components/products/ListProducts'
import { useTreeCategories } from '../../restapi/hooks'
import { serialize } from '../../libs/serialize'
import CategoriesAccordion from '../../components/categories/CategoriesAccordion'
import { Slider, FormControlLabel, Pagination, RadioGroup, Radio } from '@mui/material'

// TODO: fix scroll to top on pagination change

function AllProducts({ products, productsError }) {
  const [list, setList] = useState(products)
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const { categories } = useTreeCategories()
  const [suppliers, setSuppliers] = useState()
  const [brands, setBrands] = useState()
  const menuItems = serialize(categories?.data)
  const [prices, setPrices] = useState([0, 1000])

  const [category, setCategory] = useState(undefined)
  const [offset, setOffset] = useState(0)
  const [subcategory, setSubcategory] = useState(undefined)
  const [brand, setBrand] = useState(undefined)
  const [provider, setProvider] = useState(undefined)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1000)

  useEffect(() => {
    resources.brands.all()
      .then(response => setBrands(response.data))
    resources.suppliers.all()
      .then(response => setSuppliers(response.data))
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
    console.log('🚀 ~ file: all.jsx ~ line 56 ~ handleSubcategoryFilter ~ id', subcategory)
    setCategory(undefined)
    setSubcategory(subcategory)
  }

  const handleCategoryFilter = (category) => {
    console.log('🚀 ~ file: all.jsx ~ line 61 ~ handleCategoryFilter ~ id', category)
    setSubcategory(undefined)
    setCategory(category)
  }

  const handleProviderFilter = (event) => {
    setProvider(event.target.value)
  }

  const handleAllClick = () => {
    setProvider()
    setBrand()
    setCategory(undefined)
    setSubcategory(undefined)
    setMin(0)
    setMax(1000)
    setPrices([0, 1000])
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
    <div className='flex flex-row w-[95%] mx-auto my-10'>
      <div className='flex mr-1 flex-col w-3/12'>
        <div className='flex flex-col'>
          <p className='font-bold mb-2'>Categories</p>
          <div className=''>
            {menuItems.map((item) => (
              <div key={item.name} className='border-2 border-background-100'>
                <CategoriesAccordion
                  category={item}
                  items={item.items}
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
      <div className='flex ml-1 flex-row w-9/12'>
        <div className='flex flex-col items-center w-full'>
          <ListProducts products={list} loading={loading} />
          <div className='mt-4'>
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
