import React, { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import resources from '../../../restapi/resources'
import CategoriesAccordion from '../../categories/CategoriesAccordion'
import { Autocomplete, TextField, FormControlLabel, Checkbox } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Josefin_Sans } from '@next/font/google'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import Link from 'next/link'

const js = Josefin_Sans({
  weight: '400',
  subsets: ['latin']
})

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
  const [banners, setBanners] = useState([])
  const [brands, setBrands] = useState([])
  const [prices, setPrices] = useState([0, 1000])
  const [brand, setBrand] = useState()
  const [provider, setProvider] = useState()
  const { t } = useTranslation()
  const [promotions, setPromotions] = useState(false)
  const [recommendations, setRecommendations] = useState(false)
  const [exist, setExist] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [extra, setExtra] = useState(undefined)

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
    resources.banner.all()
      .then(response => setBanners(response.data))
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
      max: prices[1],
      extra
    }
    handleMobileFilter(filter)
    setFilterBar((filterBar) => !filterBar)
  }

  const handleAllClick = () => {
    setCategory(undefined)
    setSubcategory(undefined)
    setSelectedCategory(undefined)
    setProvider(undefined)
    setBrand(undefined)
    setPrices([0, 1000])
    setSelectedPrice(0)
  }

  const handleChangeType = (type) => {
    setPromotions(false)
    setRecommendations(false)
    setExist(false)
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
      case 'exist':
        setExist(true)
        setExtra('existencias')
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
      <main className={js.className}>
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
            <FormControlLabel value={promotions} onChange={() => handleChangeType('promotions')} control={<Checkbox size='small' checked={promotions} />} label={t('filter.promotions')} />
            <FormControlLabel value={recommendations} onChange={() => handleChangeType('recommendations')} control={<Checkbox size='small' checked={recommendations} />} label={t('filter.recommendations')} />
            <FormControlLabel value={exist} onChange={() => handleChangeType('exist')} control={<Checkbox size='small' checked={exist} />} label={t('filter.exist')} />
          </div>
          <div className='flex flex-col mt-2 mb-4'>
            <p className='font-bold mb-2'>{t('filter.price')}</p>
            <div className='w-[92%]'>
              <div className={`mb-1 hover:cursor-pointer ${selectedPrice === 1 ? 'text-button font-semibold' : ''} text-footer-background-300 hover:underline hover:text-button`} onClick={() => handlePriceFilter([0, 25])}>US$0 {t('filter.to')} US$25</div>
              <div className={`mb-1 hover:cursor-pointer ${selectedPrice === 2 ? 'text-button font-semibold' : ''}`} onClick={() => handlePriceFilter([25, 50])}>US$25 {t('filter.to')} US$50</div>
              <div className={`mb-1 hover:cursor-pointer ${selectedPrice === 3 ? 'text-button font-semibold' : ''}`} onClick={() => handlePriceFilter([50, 100])}>US$50 {t('filter.to')} US$100</div>
              <div className={`mb-1 hover:cursor-pointer ${selectedPrice === 4 ? 'text-button font-semibold' : ''}`} onClick={() => handlePriceFilter([100, 200])}>US$100 {t('filter.to')} US$200</div>
              <div className={`mb-1 hover:cursor-pointer ${selectedPrice === 5 ? 'text-button font-semibold' : ''}`} onClick={() => handlePriceFilter([200, 1000])}>{t('filter.more')} US$200</div>
            </div>
          </div>
          <div className='flex flex-col mt-2 mb-4 mr-4'>
            <CarouselProvider
              naturalSlideWidth={50}
              naturalSlideHeight={50}
              totalSlides={banners.count}
              isPlaying={true}
              interval={6000}
              infinite={true}
            >
              <Slider>
                {banners?.results?.map((result) => {
                  return (
                    <Slide key={result.imagen} index={result.imagen}>
                      <Link href={result.enlace}>
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND}${result.imagen}`
                          }
                          className="w-full hover:cursor-pointer h-full" alt="..."
                        />
                      </Link>
                    </Slide>
                  )
                })}
              </Slider>
            </CarouselProvider>
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
          <div className='flex flex-col mb-4 w-[95%]'>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={provider}
              options={suppliers}
              onChange={(event, newValue) => setProvider(newValue)}
              renderInput={(params) => <TextField {...params} label={t('filter.provider')} />}
              size='small'
            />
          </div>
          {/* <div className='flex flex-col w-[95%]'>
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
          </div> */}
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
    </main>
      </Drawer>
    </React.Fragment>
  )
}

export default FilterBar
