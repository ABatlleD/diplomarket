import React, { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppButton from './AppButton'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { useTranslation } from 'react-i18next'
import { PropTypes } from 'prop-types'
import { getCookie } from 'cookies-next'
import resources from '../restapi/resources'
import SearchResult from './products/SearchResult'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function SearchBar({ openSelectPlace, setOpenSelectPlace }) {
  const { t } = useTranslation()
  const NEXT_DISTRICT = getCookie('NEXT_DISTRICT')
  const NEXT_MUNICIPALITY = getCookie('NEXT_MUNICIPALITY')
  const [district, setDistrict] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])

  useEffect(() => {
    setDistrict(NEXT_DISTRICT)
  }, [NEXT_DISTRICT])

  useEffect(() => {
    if (inputValue.length > 2) {
      resources.products.search(NEXT_MUNICIPALITY, inputValue)
        .then((response) => setOptions(response.data))
    } else {
      setOptions([])
    }
  }, [inputValue])

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
          <Autocomplete
            id="search-in-site"
            options={options}
            onInputChange={(_, value) => setInputValue(value)}
            // @ts-ignore
            getOptionLabel={(option) => option.nombre}
            noOptionsText={<p>{t('no_options')}</p>}
            style={{ width: '100%' }}
            freeSolo
            // PaperComponent={CustomPaper}
            renderInput={(params) => {
              return (
                <div ref={params.InputProps.ref}>
                  <input
                    {...params.inputProps}
                    type="text"
                    id={'search_bar'}
                    placeholder={t('layout.navbar.search')}
                    style={{
                      width: '100%',
                      height: '42px',
                      border: '1px solid #D1D1D1',
                      backgroundColor: '#fff',
                      color: '#000',
                      borderRadius: '0',
                      padding: '0 15px',
                      transition: 'all 0.3s linear',
                      WebkitTransition: 'all 0.3s linear',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      fontFamily: 'sans-serif'
                    }}
                    autoFocus
                  />
                </div>
              )
            }}
            renderOption={(props, option) => (
              <SearchResult data={option} {...props} />
            )}
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
