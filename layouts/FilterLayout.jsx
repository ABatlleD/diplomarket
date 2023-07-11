import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTreeCategories } from '../restapi/hooks'
import { serialize } from '../libs/serialize'
import { Slider, FormControlLabel, Checkbox } from '@mui/material'
import resources from '../restapi/resources'
import dynamic from 'next/dynamic'

const CategoriesAccordion = dynamic(() => import('../components/categories/CategoriesAccordion'))

function FilterLayout({ children, props }) {
  const { categories } = useTreeCategories()
  /* const [suppliers, setSuppliers] = useState() */
  const [brands, setBrands] = useState()
  const [tags, setTags] = useState()
  const menuItems = serialize(categories?.data)
  const [prices, setPrices] = useState([20, 40])

  useEffect(() => {
    resources.brands.all()
      .then(response => setBrands(response.data))
    /* resources.suppliers.all()
      .then(response => setSuppliers(response.data)) */
    resources.tags.all()
      .then(response => setTags(response.data))
  }, [])

  const handleChange = (event, newPrices) => {
    setPrices(newPrices)
  }

  return (
    <div className='flex flex-row w-[95%] mx-auto my-10'>
      <div className='flex mr-1 flex-col w-3/12'>
        <div className='flex flex-col'>
          <p className='font-bold mb-2'>Categories</p>
          <div className=''>
            {menuItems.map((item) => (
              <div key={item.name} className='border-2 border-background-100'>
                <CategoriesAccordion title={item.label} items={item.items} />
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
              onChange={handleChange}
              valueLabelDisplay="auto"
              color='secondary'
              max={1000}
            />
          </div>
          <div className='flex flex-row justify-between w-[92%]'>
            <div className=''>
              <p className='border rounded-sm text-sm px-4'>${prices[0]} - ${prices[1]}</p>
            </div>
            <div className='bg-footer-background-200 text-background-100 text-sm px-2 font-bold shadow-sm rounded-sm'>Filter</div>
          </div>
        </div>
        <div className='flex flex-col w-[95%]'>
          <p className='font-bold my-2'>Brands</p>
          <div className='flex flex-wrap'>
            {brands?.results?.map((item) => (
              <FormControlLabel key={item.id} control={<Checkbox />} label={item.nombre} />
            ))}
          </div>
        </div>
        {/* <div className='flex flex-col w-[95%]'>
          <p className='font-bold my-2'>Providers</p>
          <div className='flex flex-wrap'>
            {suppliers?.results?.map((item) => (
              <FormControlLabel key={item.id} control={<Checkbox />} label={item.nombre} />
            ))}
          </div>
        </div> */}
        <div className='flex flex-col w-[95%]'>
          <p className='font-bold my-2'>Tags</p>
          <div className='flex flex-wrap w-full'>
            {tags?.results?.map((item) => (
              <FormControlLabel key={item.id} control={<Checkbox />} label={item.etiqueta} />
            ))}
          </div>
        </div>
        <div className='my-2 underline'>View All</div>
      </div>
      <div className='flex ml-1 flex-row w-9/12'>{children}</div>
    </div>
  )
}

FilterLayout.propTypes = {
  children: PropTypes.node,
  props: PropTypes.number
}

export default FilterLayout
