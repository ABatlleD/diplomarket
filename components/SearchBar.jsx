import React, { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { FormControl, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import { useTranslation } from 'react-i18next'
import { getCookie } from 'cookies-next'
import resources from '../restapi/resources'
import useWindowSize from '../hooks/WindowSize'
import { Search } from '@mui/icons-material'
import dynamic from 'next/dynamic'

const AppButton = dynamic(() => import('./AppButton'))
const SearchResult = dynamic(() => import('./products/SearchResult'))

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

const CssOutlinedInput = styled(OutlinedInput)({
  '& .MuiInputBase-input': {
    padding: 3
  },
  '& .MuiInputBase-focused': {
    padding: 3
  }
})

function SearchBar({ openSelectPlace, setOpenSelectPlace }) {
  const size = useWindowSize()
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

  const searchSubmit = (e, value) => {
    e.preventDefault()
    if (value && value !== 'undefined') {
      setInputValue(value)
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='flex flex-row'>
          <div className='hidden md:w-[14%] md:flex'>
            <AppButton
                sx={{
                  fontSize: {
                    xs: 10,
                    sm: 10,
                    md: 12
                  },
                  borderTopRightRadius: 0,
                  width: '100%',
                  borderBottomRightRadius: 0
                }}
                className='bg-button'
                onClick={() => setOpenSelectPlace(true)}
              >
                <span className='mr-1 -mt-[0.2rem]'>
                  <AddLocationAltOutlinedIcon sx={{
                    fontSize: '1rem'
                  }} />
                </span>
                <span className='-mb-[0.2rem]'>{size.width < 1900 ? resizeTitle(district, 6) : resizeTitle(district, 14)}</span>
            </AppButton>
          </div>
          <Autocomplete
            id="search-in-site"
            options={options}
            onInputChange={searchSubmit}
            // @ts-ignore
            getOptionLabel={(option) => {
              if (option.nombre) {
                return option.nombre
              }
              return inputValue
            }}
            noOptionsText={<p>{t('no_options')}</p>}
            style={{
              width: '100%'
            }}
            freeSolo
            // PaperComponent={CustomPaper}
            renderInput={(params) => {
              return (
                <div ref={params.InputProps.ref}>
                  <FormControl fullWidth variant="outlined">
                    <CssOutlinedInput
                      id="outlined-adornment-search"
                      type='text'
                      size='small'
                      {...params.inputProps}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              )
            }}
            renderOption={(props, option) => (
              <SearchResult data={option} {...{ setInputValue }} />
            )}
          />
          {/* <div className='hidden md:flex'>
            <AppButton
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                padding: '0px 0px'
              }}
              className='bg-button'
            >
              <SearchIcon />
            </AppButton>
          </div> */}
        </div>
      </ThemeProvider>
    </>
  )
}

export default SearchBar
