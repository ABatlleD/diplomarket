import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { US, ES } from 'country-flag-icons/react/1x1'
import { useTranslation } from 'react-i18next'

const languages = ['en', 'es']

function LangSelector () {
  const [language, setLanguage] = useState('en')

  const [t, i18n] = useTranslation()

  const [anchorElLanguage, setAnchorElLanguage] = useState(null)

  const handleOpenLanguageMenu = (event) => {
    setAnchorElLanguage(event.currentTarget)
  }

  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null)
  }

  const handleSelectLanguage = (e, lang) => {
    console.log(lang)
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
        <IconButton onClick={handleOpenLanguageMenu}>
        <div className='flex flex-row'>
          { language === 'es'
            ? <ES title="Español" className="w-7 h-5 shadow-brown shadow-lg"/>
            : <US title="English" className="w-7 h-5 shadow-brown shadow-lg"/>
          }
          <ArrowDropDownIcon />
        </div>
        </IconButton>
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
        {languages.map((lang) => (
          <MenuItem
            key={lang}
            onClick={(event) => handleSelectLanguage(event, lang)}
          >
            { lang === 'en'
              ? <div className='flex flex-row'>
                  <span className='pr-2'>
                    <US title="English" className="w-7 h-5 shadow-brown shadow-lg"/>
                  </span>
                  <span>{t('layout.navbar.lang.en')}</span>
                </div>
              : <div className='flex flex-row'>
                  <span className='pr-2'>
                    <ES title="English" className="w-7 h-5 mt-1 shadow-brown shadow-lg"/>
                  </span>
                  <span>{t('layout.navbar.lang.es')}</span>
                </div>
            }
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default LangSelector
