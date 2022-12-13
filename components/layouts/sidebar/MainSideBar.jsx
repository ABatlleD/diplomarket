import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import LangSelector from '../navbar/LangSelector'
import LockIcon from '@mui/icons-material/Lock'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AppButton from '../../AppButton'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import { useTranslation } from 'react-i18next'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import WhatsAppBusinessIcon from '../../icons/whats-app-business-icon'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import resources from '../../../restapi/resources'
import parsePhoneNumber from 'libphonenumber-js'

function MainSideBar ({ mainSideBar = false, setMainSideBar = () => {}, openSelectPlace, setOpenSelectPlace }) {
  const { t } = useTranslation()
  const [contacts, setContacts] = useState([])
  const NEXT_DISTRICT = getCookie('NEXT_DISTRICT')
  const [district, setDistrict] = useState('')

  useEffect(() => {
    const answer = []
    resources.contacts.get()
      .then(response => {
        response.data.results.map(item => (item.tipo === 'email' || item.tipo === 'whatsapp') && item.sidebar ? answer.push(item) : true)
        setContacts(answer)
      })
  }, [])

  useEffect(() => {
    setDistrict(NEXT_DISTRICT)
  }, [NEXT_DISTRICT])

  return (
    <React.Fragment>
      <Drawer
        anchor={'left'}
        open={mainSideBar}
        onClose={() => setMainSideBar(false)}
      >
        <div className='flex flex-row justify-between mx-4 mt-4'>
          <div className='flex mt-3 mr-[-7px]'>
            <LangSelector />
          </div>
          <div
            className='flex flex-row mt-4 md:mt-6 ml-1 md:ml-[-10px] text-text-100 xl:text-sm'
            onClick={() => {}}
          >
            USD <span className='mt-[-3px]'><LockIcon fontSize={'small'} /></span>
          </div>
            <button
              onClick={() => setMainSideBar((mainSideBar) => !mainSideBar)}
              className="bg-white text-black h-4 w-4 pt-[1.3rem] mr-2 block rounded-full"
            >
              <HighlightOffIcon />
            </button>
        </div>
        <div className='mt-6 mx-4'>
          <AppButton
            sx={{
              fontSize: 15,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              width: '100%'
            }}
            className='bg-button rounded-full'
            onClick={() => {
              setMainSideBar((mainSideBar) => !mainSideBar)
              setOpenSelectPlace(true)
            }}
          >
            <span className='mt-[-3px] mr-1'><AddLocationAltOutlinedIcon fontSize='small' /></span> {district} <span className='mt-[-1px]'></span>
          </AppButton>
        </div>
          <div className='flex flex-col mx-4'>
          <div
            onClick={() => setMainSideBar((mainSideBar) => false)}
            className='mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg'
          >
            <Link href='/about'>
              <p className='hover:cursor-pointer hover:underline'>{t('layout.navbar.about')} <span><KeyboardArrowRightIcon sx={{ marginTop: '-1px' }} /></span></p>
            </Link>
          </div>
          <div
            onClick={() => setMainSideBar((mainSideBar) => false)}
            className='mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg'
          >
            <Link href='/sell-with-us'>
              <p className='hover:cursor-pointer hover:underline'>{t('layout.navbar.sell-with-us')} <span><KeyboardArrowRightIcon sx={{ marginTop: '-1px' }} /></span></p>
            </Link>
          </div>
          <div
            onClick={() => setMainSideBar((mainSideBar) => false)}
            className='mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg'
          >
            <Link href='/contact'>
              <p className='hover:cursor-pointer hover:underline'>{t('layout.navbar.contact')} <span><KeyboardArrowRightIcon sx={{ marginTop: '-1px' }} /></span></p>
            </Link>
          </div>
          {contacts.map(item => (
            <div
              key={item.id}
              className='mt-4 text-footer-background-200 hover:text-footer-background-100 text-lg'
            >
              {item.tipo === 'email' && (
                <p><span><EmailOutlinedIcon sx={{ marginTop: '-3px' }} /></span> {item.contenido}</p>
              )}
              {item.tipo === 'whatsapp' && (
                <p className='flex flex-row'><span><WhatsAppBusinessIcon /></span> <span className='ml-1 mt-[-0.2rem]'> {parsePhoneNumber(`+${item.contenido}`)?.formatInternational()}</span></p>
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </React.Fragment>
  )
}

export default MainSideBar
