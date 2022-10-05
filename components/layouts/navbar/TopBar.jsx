import React from 'react'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Badge, Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LangSelector from './LangSelector'
import LockIcon from '@mui/icons-material/Lock'
import useWindowSize from '../../../hooks/WindowSize'
import AppButton from '../../AppButton'
import { useTranslation } from 'react-i18next'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import SearchBar from '../../SearchBar'
import AccountMenu from './AccountMenu'
import Link from 'next/link'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function TopBar() {
  const [t] = useTranslation()
  const size = useWindowSize()

  return (
    <>
      < div className='bg-background-100 flex flex-row justify-around md:justify-between my-2 xl:mt-1 xl:mb-2'>
        <div className='flex flex-row justify-between md:ml-6 w-1/2 md:w-1/5 xl:w-[12%]'>
          <DensityMediumIcon
            fontSize='large'
            className='mt-2 lg:hidden'
          />
          <Link href="/">
            <img src="/logo-preloader0.png" className="max-w-max h-14 hover:cursor-pointer" alt="..." />
          </Link>
        </div>
        <div className='hidden md:hidden xl:flex xl:w-9/12 flex-row mt-2'>
          <div className='mr-2'>
            <AppButton
              sx={{
                fontSize: {
                  xs: 10,
                  sm: 10,
                  md: 15,
                  lg: 10,
                  xl: 10
                },
                paddingY: 1.3,
                paddingX: 1
              }}
              className='bg-button'
            >
              {t('layout.navbar.categories')} <span className='mt-[-1px]'><ArrowForwardIosIcon fontSize='small' /></span>
            </AppButton>
          </div>
          <div className='md:w-[88%]'>
            <SearchBar />
          </div>
        </div>
        <div className='flex flex-row justify-between md:justify-around w-5/12 md:w-4/12 xl:w-3/12 md:mt-[-5px]'>
          <div className='hidden md:flex mt-3 md:mt-7 mr-[-7px] md:mr-[-20px]'>
            <LangSelector />
          </div>
          <Divider orientation="vertical" flexItem className='hidden md:flex' />
          <div
            className='hidden md:flex flex-row mt-4 md:mt-6 ml-1 md:ml-[-10px] text-text-100 xl:text-sm'
            onClick={() => {}}
          >
            USD <span className='mt-[-3px]'><LockIcon fontSize={size.width < 1024 ? 'large' : 'small'} /></span>
          </div>
          <ThemeProvider theme={theme}>
            <Badge
              badgeContent={2}
              color='error'
              sx={{
                marginTop: {
                  xs: '0.5rem',
                  sm: '0.5rem',
                  md: '0.75rem'
                }
              }}
            >
              <FavoriteBorderIcon fontSize='large' />
            </Badge>
            <Badge
              badgeContent={1}
              color='error'
              sx={{
                marginTop: {
                  xs: '0.5rem',
                  sm: '0.5rem',
                  md: '0.75rem'
                }
              }}
            >
              <ShoppingCartOutlinedIcon fontSize='large' />
            </Badge>
          </ThemeProvider>
          <div className='mt-1'>
            <AccountMenu />
          </div>
        </div>
      </div>
    </>
  )
}

export default TopBar
