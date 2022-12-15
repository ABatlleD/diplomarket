import React, { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import resources from '../../../restapi/resources'
import CategoriesAccordion from '../../categories/CategoriesAccordion'
import { Autocomplete, TextField, FormControlLabel, RadioGroup, Radio } from '@mui/material'
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
  const [brand, setBrand] = useState()
  const [provider, setProvider] = useState(0)
  const { t } = useTranslation()
  const [featureds, setFeatureds] = useState(false)
  const [promotions, setPromotions] = useState(false)
  const [recomendations, setRecomendations] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState(0)

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
    switch (prices[0]) {
      case 0:
        setSelectedPrice(1)
        break
      case 25:
        setSelectedPrice(2)
        break
      case 50:
        setSelectedPrice(3)
        break
      case 100:
        setSelectedPrice(4)
        break
      case 200:
        setSelectedPrice(5)
        break

      default:
        setSelectedPrice(0)
        break
    }
    setPrices(prices)
  }

  const handleFilter = () => {
    const filter = {
      brand: brand ? brand.id : undefined,
      provider,
      min: prices[0],
      max: prices[1]
    }
    handleMobileFilter(filter)
    setFilterBar((filterBar) => !filterBar)
  }

  const handleProviderFilter = (event) => {
    setProvider(event.target.value)
  }

  const handleAllClick = () => {
    setCategory(undefined)
    setSubcategory(undefined)
    setSelectedCategory(undefined)
    setProvider(0)
    setBrand()
    setPrices([0, 1000])
    setSelectedPrice(0)
  }

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
          <div className='flex flex-col my-4'>
            <FormControlLabel value={featureds} onChange={() => handleChangeType('featureds')} control={<Radio />} label={t('filter.featureds')} />
            <FormControlLabel value={promotions} onChange={() => handleChangeType('featureds')} control={<Radio />} label={t('filter.promotions')} />
            <FormControlLabel value={recomendations} onChange={() => handleChangeType('featureds')} control={<Radio />} label={t('filter.recomendations')} />
          </div>
          <div className='flex flex-col mt-2 mb-4'>
            <p className='font-bold mb-2'>{t('filter.price')}</p>
            <div className='w-[92%]'>
              <div className={`mb-1 hover:cursor-pointer ${selectedPrice === 1 ? 'text-button font-semibold' : ''}`} onClick={() => handlePriceFilter([0, 25])}>US$0 {t('filter.to')} US$25</div>
              <div className={`mb-1 hover:cursor-pointer ${selectedPrice === 2 ? 'text-button font-semibold' : ''}`} onClick={() => handlePriceFilter([25, 50])}>US$25 {t('filter.to')} US$50</div>
              <div className={`mb-1 hover:cursor-pointer ${selectedPrice === 3 ? 'text-button font-semibold' : ''}`} onClick={() => handlePriceFilter([50, 100])}>US$50 {t('filter.to')} US$100</div>
              <div className={`mb-1 hover:cursor-pointer ${selectedPrice === 4 ? 'text-button font-semibold' : ''}`} onClick={() => handlePriceFilter([100, 200])}>US$100 {t('filter.to')} US$200</div>
              <div className={`mb-1 hover:cursor-pointer ${selectedPrice === 5 ? 'text-button font-semibold' : ''}`} onClick={() => handlePriceFilter([200, 1000])}>{t('filter.more')} US$200</div>
            </div>
          </div>
          <div className='flex flex-col mb-4 w-[95%]'>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={brand}
              options={brands}
              onChange={(event, newValue) => setBrand(newValue)}
              renderInput={(params) => <TextField {...params} label={t('filter.brand')} />}
              size='small'
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

export default FilterBar
