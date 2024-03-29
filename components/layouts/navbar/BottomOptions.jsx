import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import WhatsAppBusinessIcon from '../../icons/whats-app-business-icon'
import DensityMediumIcon from '../../icons/density-medium-icon'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import LockIcon from '@mui/icons-material/Lock'
import { Divider } from '@mui/material'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import resources from '../../../restapi/resources'
import parsePhoneNumber from 'libphonenumber-js'
import dynamic from 'next/dynamic'

const SearchBar = dynamic(() => import('../../SearchBar'))
const AppButton = dynamic(() => import('../../AppButton'))
const LangSelector = dynamic(() => import('./LangSelector'))

function BottomOptions({
  categoriesSideBar,
  setCategoriesSideBar,
  mainSideBar,
  setMainSideBar,
  openSelectPlace,
  setOpenSelectPlace,
}) {
  const [t] = useTranslation()
  const NEXT_DISTRICT = getCookie('NEXT_DISTRICT')
  const [district, setDistrict] = useState('')
  const [whatsapps, setWhatsapps] = useState([])

  useEffect(() => {
    const answer = []
    resources.contacts.get().then((response) => {
      response.data.results.map((item) =>
        item.tipo === 'whatsapp' ? answer.push(item) : true
      )
      setWhatsapps(answer)
    })
  }, [])

  useEffect(() => {
    setDistrict(NEXT_DISTRICT)
  }, [NEXT_DISTRICT])

  const resizeTitle = (string, maxLength) => {
    return string && string.length > maxLength
      ? `${string.slice(0, maxLength)}...`
      : string
  }

  return (
    <>
      <div className="dark:bg-background-100 md:bg-background-300 dark:md:bg-background-300 xl:bg-dm-blue flex flex-col md:flex-row md:justify-between py-2 md:p-3">
        <div className="flex flex-grow xl:hidden items-center rounded-md shadow-sm mx-2">
          <SearchBar {...{ setOpenSelectPlace }} />
        </div>
        <div className="hidden md:hidden flex-row justify-between mt-1">
          <AppButton
            sx={{
              fontSize: 10,
            }}
            className="bg-button"
            onClick={() => setOpenSelectPlace(true)}
          >
            <span className="mt-[-3px]">
              <AddLocationAltOutlinedIcon sx={{ fontSize: 10 }} />
            </span>{' '}
            {resizeTitle(district, 10)}{' '}
            <span className="mt-[-1px]">
              <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 10 }} />
            </span>
          </AppButton>
          <div className="flex flex-row">
            <div className="mt-2 mr-[-7px]">
              <LangSelector />
            </div>
            <Divider orientation="vertical" flexItem />
            <div
              className="flex flex-row mt-3 ml-1 text-text-100"
              onClick={() => {}}
            >
              USD{' '}
              <span className="mt-[-3px]">
                <LockIcon fontSize="small" />
              </span>
            </div>
          </div>
        </div>
        <div className="hidden xl:flex font-semibold justify-between items-center text-gray-50 hover:text-gray-200 w-full">
          <div className="text-lg leading-4">
            <ul className="flex gap-4 items-center">
              <li>
                <button 
                  type="button" 
                  className="flex gap-1 items-center hover:underline"
                  onClick={() => setMainSideBar((mainSideBar) => !mainSideBar)}
                >
                  <DensityMediumIcon />
                  {t('layout.navbar.all')}
                </button>
              </li>
              <li className="hover:underline">
                <Link href="/about">
                  {t('layout.navbar.about')}
                </Link>
              </li>
              <li className="hover:underline">
                <Link href="/sell-with-us">
                  {t('layout.navbar.sell-with-us')}
                </Link>
              </li>
              <li className="hover:underline">
                <Link href="/contact">
                  {t('layout.navbar.contact')}
                </Link>
              </li>
              {/* <li className="hover:underline">
                <Link href="/providers">
                  {t('layout.navbar.providers')}
                </Link>
              </li>
              <li className="hover:underline">
                <Link href="/empleos">
                  {t('layout.navbar.jobs')}
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="text-xl leading-4">
            <ul className="flex gap-4 items-center">
              {whatsapps.map((item) => (
                <li
                  key={item.id}
                >
                  <a className="flex gap-x-1 items-center hover:underline" href={`https://api.whatsapp.com/send?phone=${item.contenido}&text=Hola,%20Diplomarket%E2%84%A2`}>
                    <WhatsAppBusinessIcon />
                    {parsePhoneNumber(
                      `+${item.contenido}`
                    )?.formatInternational()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomOptions
