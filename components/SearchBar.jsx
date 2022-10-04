import React from 'react'
import { OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppButton from './AppButton'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import useWindowSize from '../hooks/WindowSize'
import { useTranslation } from 'react-i18next'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function SearchBar() {
  const size = useWindowSize()
  const { t } = useTranslation()

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
              >
                <span className='mt-[-1px] mr-1'><AddLocationAltOutlinedIcon fontSize='small' /></span> Miami <span className='mt-[-1px]'><KeyboardArrowDownOutlinedIcon fontSize='small' /></span>
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

export default SearchBar
