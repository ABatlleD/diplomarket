import React from 'react'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Badge, Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LangSelector from './LangSelector'
import LockIcon from '@mui/icons-material/Lock'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function TopBar() {
  return (
    <>
      <div className='bg-background-100 flex flex-row justify-around md:justify-between my-2'>
        <div className='flex flex-row justify-between md:justify-around w-1/2 md:w-1/5'>
          <DensityMediumIcon fontSize='large' className='mt-3' />
          <img src="/logo-preloader0.png" className="max-w-max h-14" alt="..." />
        </div>
        <div className='flex flex-row justify-between md:justify-around w-5/12 md:w-4/12'>
          <div className='hidden md:flex mt-1 md:mt-3 mr-[-7px] md:mr-[-20px]'>
            <LangSelector />
          </div>
          <Divider orientation="vertical" flexItem className='hidden md:flex' />
          <div className='hidden md:flex flex-row mt-3 md:mt-5 ml-1 md:ml-[-10px] text-text-100' onClick={() => {}}>
            USD <span className='mt-[-3px]'><LockIcon fontSize='small' /></span>
          </div>
          <ThemeProvider theme={theme}>
            <Badge badgeContent={2} color='error' className='mt-3'>
              <FavoriteBorderIcon fontSize='large' />
            </Badge>
            <Badge badgeContent={1} color="error" className='mt-3'>
              <ShoppingCartOutlinedIcon fontSize='large' />
            </Badge>
          </ThemeProvider>
          <AccountCircleIcon fontSize='large' className='mt-3' />
        </div>
      </div>
    </>
  )
}

export default TopBar
