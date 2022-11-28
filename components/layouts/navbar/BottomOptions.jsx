import React, { useEffect, useState } from 'react'
import SearchBar from '../../SearchBar'
import AppButton from '../../AppButton'
import { useTranslation } from 'react-i18next'
import WhatsAppBusinessIcon from '../../icons/whats-app-business-icon'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import LockIcon from '@mui/icons-material/Lock'
import { Divider } from '@mui/material'
import LangSelector from './LangSelector'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { getCookie } from 'cookies-next'
import resources from '../../../restapi/resources'

function BottomOptions({
  categoriesSideBar,
  setCategoriesSideBar,
  mainSideBar,
  setMainSideBar,
  openSelectPlace,
  setOpenSelectPlace
}) {
  const [t] = useTranslation()
  const NEXT_DISTRICT = getCookie('NEXT_DISTRICT')
  const [district, setDistrict] = useState('')
  const [whatsapps, setWhatsapps] = useState([])

  useEffect(() => {
    const answer = []
    resources.contacts.get()
      .then(response => {
        response.data.results.map((item) => item.tipo === 'whatsapp' ? answer.push(item) : true)
        setWhatsapps(answer)
      })
  }, [])

  useEffect(() => {
    setDistrict(NEXT_DISTRICT)
  }, [NEXT_DISTRICT])

  const resizeTitle = (string, maxLength) => {
    return string && string.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  return (
    <>
      <div className='md:bg-background-300 flex flex-col md:flex-row md:justify-between p-2 md:p-4'>
        <div className='md:w-[98%] md:ml-4 xl:hidden'>
          <SearchBar {...{ openSelectPlace, setOpenSelectPlace }} />
        </div>
        <div className='hidden md:hidden flex-row justify-between mt-1'>
          <AppButton
            sx={{
              fontSize: 10
            }}
            className='bg-button'
            onClick={() => setOpenSelectPlace(true)}
          >
            <span className='mt-[-3px]'><AddLocationAltOutlinedIcon sx={{ fontSize: 10 }} /></span> {resizeTitle(district, 10)} <span className='mt-[-1px]'><KeyboardArrowDownOutlinedIcon sx={{ fontSize: 10 }} /></span>
          </AppButton>
          <div className='flex flex-row'>
            <div className='mt-2 mr-[-7px]'>
              <LangSelector />
            </div>
            <Divider orientation="vertical" flexItem />
            <div className='flex flex-row mt-3 ml-1 text-text-100' onClick={() => {}}>
              USD <span className='mt-[-3px]'><LockIcon fontSize='small' /></span>
            </div>
          </div>
        </div>
        <div className='hidden xl:flex flex-row justify-between w-full mx-4'>
          <div className='flex flex-row w-2/3 text-footer-background-200 font-bold'>
            <div
              className='hover:cursor-pointer'
              onClick={() => setMainSideBar((mainSideBar) => !mainSideBar)}
            >
              <DensityMediumIcon
                fontSize='small'
              />
            </div>
            <div className='mx-4 text-footer-background-200 font-medium hover:underline'>
              <Link href='/about'>
                {t('layout.navbar.about')}
              </Link>
            </div>
            <div className='mr-4 text-footer-background-200 font-medium hover:underline'>
              <Link href='/sell-with-us'>
                {t('layout.navbar.sell-with-us')}
              </Link>
            </div>
            <div className='text-footer-background-200 font-medium hover:underline'>
              <Link href='/contact'>
                {t('layout.navbar.contact')}
              </Link>
            </div>
          </div>
          <div className='flex flex-row'>
            {whatsapps.map(item => (
              <div key={item.id} className='ml-2 flex flex-row hover:text-footer-background-200 hover:underline'>
                <WhatsAppBusinessIcon />
                <a href={`https://api.whatsapp.com/send?phone=${item.contenido}&text=Hola,%20Diplomarket%E2%84%A2`} className='ml-1 font-bold'>{item.contenido}</a>
              </div>
            ))}
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
