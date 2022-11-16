import React, { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import PropTypes from 'prop-types'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import resources from '../../../restapi/resources'
import CategoriesAccordion from '../../categories/CategoriesAccordion'
import { Slider, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import { useTranslation } from 'react-i18next'

function FilterBar ({
  filterBar = false,
  setFilterBar = () => {},
  handleMobileFilter = () => {},
  handleSubcategoryFilter = () => false,
  handleCategoryFilter = () => false,
  setCategory = () => false,
  setSubcategory = () => false,
  setSelectedCategory = () => false
}) {
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [brands, setBrands] = useState([])
  const [prices, setPrices] = useState([0, 1000])
  const [brand, setBrand] = useState(0)
  const [provider, setProvider] = useState(0)
  const { t } = useTranslation()

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

  const handleFilter = () => {
    const filter = {
      brand,
      provider,
      min: prices[0],
      max: prices[1]
    }
    handleMobileFilter(filter)
    setFilterBar((filterBar) => !filterBar)
  }

  const handleBrandFilter = (event) => {
    setBrand(event.target.value)
  }

  const handleProviderFilter = (event) => {
    setProvider(event.target.value)
  }

  const handleAllClick = () => {
    setCategory(undefined)
    setSubcategory(undefined)
    setSelectedCategory(undefined)
    setProvider(0)
    setBrand(0)
    setPrices([0, 1000])
  }

  return (
    <React.Fragment>
      <Drawer
        anchor={'left'}
        open={filterBar}
        onClose={() => setFilterBar(false)}
      >
        <div className='flex flex-col mx-4'>
          <div className='flex flex-row justify-end mr-5'>
              <button
                onClick={() => setFilterBar((filterBar) => !filterBar)}
                className="bg-white text-black h-4 w-4 pt-[1.3rem] mr-2 block rounded-full"
              >
                <HighlightOffIcon />
              </button>
          </div>
          <div className='flex flex-col mt-10'>
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
          <div className='flex flex-row justify-between'>
            <div className='my-2 underline hover:cursor-pointer' onClick={handleAllClick}>{t('filter.clear')}</div>
            <div
              className='bg-footer-background-200 py-1 h-7 mt-1 text-background-100 text-sm px-2 font-bold shadow-sm rounded-sm hover:cursor-pointer hover:opacity-90'
              onClick={handleFilter}
            >
              {t('filter.filter')}
            </div>
          </div>
      </div>
      </Drawer>
    </React.Fragment>
  )
}

FilterBar.propTypes = {
  filterBar: PropTypes.bool,
  setFilterBar: PropTypes.func,
  handleMobileFilter: PropTypes.func,
  handleSubcategoryFilter: PropTypes.func,
  handleCategoryFilter: PropTypes.func,
  setCategory: PropTypes.func,
  setSubcategory: PropTypes.func,
  setSelectedCategory: PropTypes.func
}

export default FilterBar
