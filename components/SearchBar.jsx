import React, { useState, useEffect } from 'react'
import { OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppButton from './AppButton'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import useWindowSize from '../hooks/WindowSize'
import { useTranslation } from 'react-i18next'
import { PropTypes } from 'prop-types'
import { getCookie } from 'cookies-next'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function SearchBar({ openSelectPlace, setOpenSelectPlace }) {
  const size = useWindowSize()
  const { t } = useTranslation()
  const NEXT_DISTRICT = getCookie('NEXT_DISTRICT')
  const [district, setDistrict] = useState('')

  useEffect(() => {
    setDistrict(NEXT_DISTRICT)
  }, [NEXT_DISTRICT])

  const resizeTitle = (string, maxLength) => {
    return string && string.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='flex flex-row'>
          <div className='hidden md:flex'>
            <AppButton
                sx={{
                  fontSize: {
                    xs: 10,
                    sm: 10,
                    md: 15,
                    lg: 10
                  },
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}
                className='bg-button'
                onClick={() => setOpenSelectPlace(true)}
              >
                <span className='mt-[-1px] mr-1'><AddLocationAltOutlinedIcon fontSize='small' /></span> {resizeTitle(district, 8)} <span className='mt-[-1px]'><KeyboardArrowDownOutlinedIcon fontSize='small' /></span>
            </AppButton>
          </div>
          <OutlinedInput
            sx={{
              borderRadius: 0,
              backgroundColor: 'white',
              width: '85%'
            }}
            placeholder={t('layout.navbar.search')}
            color='error'
            size={size.width < 768 || size.width > 1024 ? 'small' : 'medium'}
          />
          <AppButton
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              width: '15%',
              padding: '0px 0px'
            }}
            className='bg-button'
          >
            <SearchIcon />
          </AppButton>
        </div>
      </ThemeProvider>
    </>
  )
}

SearchBar.propTypes = {
  openSelectPlace: PropTypes.bool,
  setOpenSelectPlace: PropTypes.func
}

export default SearchBar
