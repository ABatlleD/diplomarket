import React from 'react'
import SearchBar from '../../SearchBar'
import AppButton from '../../AppButton'
import { useTranslation } from 'react-i18next'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import LockIcon from '@mui/icons-material/Lock'
import { Divider } from '@mui/material'
import LangSelector from './LangSelector'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import Link from 'next/link'
import PropTypes from 'prop-types'

function BottomOptions({
  categoriesSideBar,
  setCategoriesSideBar,
  mainSideBar,
  setMainSideBar,
  openSelectPlace,
  setOpenSelectPlace
}) {
  const [t] = useTranslation()

  return (
    <>
      <div className='bg-background-300 flex flex-col md:flex-row md:justify-between p-2 md:p-4'>
        <div className='hidden md:flex xl:hidden'>
          <AppButton
            sx={{
              fontSize: {
                xs: 10,
                sm: 10,
                md: 15
              },
              paddingY: 1,
              paddingX: 1
            }}
            className='bg-button'
            onClick={() => setCategoriesSideBar((categoriesSideBar) => !categoriesSideBar)}
          >
            {t('layout.navbar.categories')} <span className='mt-[-1px]'><ArrowForwardIosIcon fontSize='small' /></span>
          </AppButton>
        </div>
        <div className='md:w-[86%] xl:hidden'>
          <SearchBar {...{ openSelectPlace, setOpenSelectPlace }} />
        </div>
        <div className='flex md:hidden flex-row justify-around mt-4'>
          <AppButton
            sx={{
              fontSize: 10,
              paddingY: 1,
              paddingX: 1
            }}
            className='bg-button'
            onClick={() => setCategoriesSideBar((categoriesSideBar) => !categoriesSideBar)}
          >
            {t('layout.navbar.categories')} <span className='mt-[-1px]'><ArrowForwardIosIcon fontSize='small' /></span>
          </AppButton>
          <AppButton
            sx={{
              fontSize: 10
            }}
            className='bg-button'
          >
            <span className='mt-[-1px] mr-1'><AddLocationAltOutlinedIcon fontSize='small' /></span> Miami <span className='mt-[-1px]'><KeyboardArrowDownOutlinedIcon fontSize='small' /></span>
          </AppButton>
          <div className='mt-1 mr-[-7px]'>
            <LangSelector />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className='flex flex-row mt-3 ml-1 text-text-100' onClick={() => {}}>
            USD <span className='mt-[-3px]'><LockIcon fontSize='small' /></span>
          </div>
        </div>
        <div className='hidden xl:flex flex-row justify-between w-full mx-4'>
          <div className='flex flex-row w-2/3'>
            <div
              className='hover:cursor-pointer'
              onClick={() => setMainSideBar((mainSideBar) => !mainSideBar)}
            >
              <DensityMediumIcon
                fontSize='small'
              />
            </div>
            <div className='mx-4'>
              <Link href='/products/all'>
                {t('layout.navbar.allProducts')}
              </Link>
            </div>
            <div className='mr-4'>
              <Link href='/about'>
                {t('layout.navbar.about')}
              </Link>
            </div>
            <div>
              <Link href='/contact'>
                {t('layout.navbar.contact')}
              </Link>
            </div>
          </div>
          <div className='flex flex-row'>
            <WhatsAppIcon
              sx={{
                color: '#49c95a',
                fontSize: 25
              }}
            />
            <a href='https://api.whatsapp.com/send?phone=+13053377539&text=Hola,%20Diplomarket%E2%84%A2' className='ml-1'>+1 305 337 7539</a>
          </div>
        </div>
      </div>
    </>
  )
}

BottomOptions.propTypes = {
  categoriesSideBar: PropTypes.bool,
  setCategoriesSideBar: PropTypes.func,
  mainSideBar: PropTypes.bool,
  setMainSideBar: PropTypes.func,
  openSelectPlace: PropTypes.bool,
  setOpenSelectPlace: PropTypes.func
}

export default BottomOptions
