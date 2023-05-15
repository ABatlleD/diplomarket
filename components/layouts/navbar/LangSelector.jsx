import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { US, ES } from 'country-flag-icons/react/1x1'
import { useTranslation } from 'react-i18next'

const languages = ['es', 'en']
const currency = ['usd', 'euro']

function LangSelector () {
  const [t, i18n] = useTranslation()
  const [language, setLanguage] = useState(i18n.language)
  const [anchorElLanguage, setAnchorElLanguage] = useState(null)

  const handleOpenLanguageMenu = (event) => {
    setAnchorElLanguage(event.currentTarget)
  }

  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null)
  }

  const handleSelectLanguage = (e, lang) => {
    if (lang === 'es' && language === 'en') {
      i18n.changeLanguage('es')
      setLanguage(lang)
    }
    if (lang === 'en' && language === 'es') {
      i18n.changeLanguage('en')
      setLanguage(lang)
    }
    setAnchorElLanguage(null)
  }

  return (
    <div className='LangSelector'>
      <Tooltip title='Select Language'>
        <div 
          className="flex flex-row hover:text-gray-700 text-gray-600 font-semibold items-center cursor-pointer" 
          onClick={handleOpenLanguageMenu}
        >
          { 
            language === 'es'
              ? <span className="flex mr-1"><ES title="Español" className="w-7 h-5 mr-1 shadow-brown shadow-lg"/> ES</span>
              : <span className="flex mr-1"><US title="English" className="w-7 h-5 mr-1 shadow-brown shadow-lg"/> EN</span>
          }
          <span>
            | ($) USD
          </span>
          <ArrowDropDownIcon />
        </div>
      </Tooltip>
      <Menu
        sx={{ mt: '30px' }}
        id='language-menu'
        anchorEl={anchorElLanguage}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={Boolean(anchorElLanguage)}
        onClose={handleCloseLanguageMenu}
      >
        <div className="px-4 py-2 font-medium">
          <span className="text-base font-semibold uppercase text-gray-600">{t('layout.navbar.change_language')}</span>
        </div>
        {languages.map((lang) => (
          <MenuItem
            key={lang}
            onClick={(event) => handleSelectLanguage(event, lang)}
          >
            { lang === 'en'
              ? <div className="flex items-center">
                  <input type="radio" name="hs-lang" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 cursor-pointer" id="hs-lang-en-1" checked={lang === language} />
                  <label htmlFor="hs-lang-en-1" className="flex items-center text-base text-gray-600 font-semibold pl-2 cursor-pointer">
                    <US title="English" className="w-7 h-5 mr-1 shadow-brown shadow-lg"/>
                    {t('layout.navbar.lang.en')} - EN
                  </label>
                </div>
              : <div className="flex items-center">
                  <input type="radio" name="hs-lang" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 cursor-pointer" id="hs-lang-es-1" checked={lang === language} />
                  <label htmlFor="hs-lang-es-1" className="flex items-center text-base text-gray-600 font-semibold pl-2 cursor-pointer">
                    <ES title="Español" className="w-7 h-5 mr-1 shadow-brown shadow-lg"/>
                    {t('layout.navbar.lang.es')} - ES
                  </label>
                </div>
            }
          </MenuItem>
        ))}
        <div className="my-2 border-t border-gray-100"></div>
        <div className="px-4 py-2 font-medium">
          <span className="text-base font-semibold uppercase text-gray-600">{t('layout.navbar.change_currency')}</span>
        </div>
        {currency.map((coin) => (
          <MenuItem
            key={coin}
          >
            { coin === 'usd'
              ? <div className="flex items-center opacity-40">
                  <input type="radio" name="hs-coin" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 cursor-pointer" id="hs-coin-usd-1" checked disabled />
                  <label htmlFor="hs-coin-usd-1" className="flex items-center text-base text-gray-600 font-semibold pl-2 cursor-pointer">
                    {t('layout.navbar.coin.usd')}
                  </label>
                </div>
              : <div className="flex items-center opacity-40">
                  <input type="radio" name="hs-coin" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 cursor-pointer" id="hs-coin-euro-1" disabled />
                  <label htmlFor="hs-coin-euro-1" className="flex items-center text-base text-gray-600 font-semibold pl-2 cursor-pointer">
                    {t('layout.navbar.coin.euro')}
                  </label>
                </div>
            }
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default LangSelector
