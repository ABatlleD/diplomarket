import React from 'react'
import TopBar from '../components/layouts/navbar/TopBar'
import BottomOptions from '../components/layouts/navbar/BottomOptions'
import PropTypes from 'prop-types'
import { Josefin_Sans } from '@next/font/google'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: '"Josefin Sans", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
})

const js = Josefin_Sans({
  weight: '400',
  subsets: ['latin']
})

function NavBar({
  categoriesSideBar,
  setCategoriesSideBar,
  mainSideBar,
  setMainSideBar,
  cartSideBar,
  setCartSideBar,
  openSelectPlace,
  setOpenSelectPlace
}) {
  return (
    <ThemeProvider theme={theme}>
    <main className={js.className}>
      <div className='flex flex-col'>
        <TopBar {...{
          categoriesSideBar,
          setCategoriesSideBar,
          mainSideBar,
          setMainSideBar,
          cartSideBar,
          setCartSideBar,
          openSelectPlace,
          setOpenSelectPlace
        }} />
        <BottomOptions {...{
          categoriesSideBar,
          setCategoriesSideBar,
          mainSideBar,
          setMainSideBar,
          openSelectPlace,
          setOpenSelectPlace
        }} />
      </div>
    </main>
    </ThemeProvider>
  )
}

NavBar.propTypes = {
  categoriesSideBar: PropTypes.bool,
  setCategoriesSideBar: PropTypes.func,
  mainSideBar: PropTypes.bool,
  setMainSideBar: PropTypes.func,
  cartSideBar: PropTypes.bool,
  setCartSideBar: PropTypes.func,
  openSelectPlace: PropTypes.bool,
  setOpenSelectPlace: PropTypes.func
}

export default NavBar
