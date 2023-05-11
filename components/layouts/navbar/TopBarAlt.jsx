import React, { useState, useEffect } from 'react'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import { Badge, Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockIcon from '@mui/icons-material/Lock'
import useWindowSize from '../../../hooks/WindowSize'
import Link from 'next/link'
import { useFav } from '../../../store/fav/fav.context'
import { useCart } from '../../../store/cart/cart.context'
import dynamic from 'next/dynamic'

const LangSelector = dynamic(() => import('./LangSelector'))
const SearchBar = dynamic(() => import('../../SearchBar'))
const AccountMenu = dynamic(() => import('./AccountMenu'))
const SelectPlace = dynamic(() => import('../../modals/SelectPlace'))
const CartHomeIcon = dynamic(() => import('../../icons/cart-home-icon'))
const HeartIcon = dynamic(() => import('../../icons/heart-icon'))

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff',
    },
  },
})

function TopBar({
  categoriesSideBar,
  setCategoriesSideBar,
  mainSideBar,
  setMainSideBar,
  cartSideBar,
  setCartSideBar,
  openSelectPlace,
  setOpenSelectPlace,
}) {
  const size = useWindowSize()
  const { totalUniqueItemsFav } = useFav()
  const { totalUniqueItems } = useCart()
  const [totalFav, setTotalFav] = useState(0)
  const [totalCart, setTotalCart] = useState(0)

  useEffect(() => {
    setTotalFav(totalUniqueItemsFav)
    setTotalCart(totalUniqueItems)
  }, [totalUniqueItemsFav, totalUniqueItems])

  return (
    <>
      <nav className="w-full flex flex-col relative z-10 text-footer-background-300">
        <div className="w-full flex justify-between items-center mx-auto px-3 py-1">
      
          {/* <!-- start logo --> */}
          <div className="inline-flex">
            <Link href="/">
              <img src="/logo-navbar.png" width="128" height="52" alt="Diplomark Logo" />
            </Link>
          </div>
          {/* <!-- end logo --> */}
      
          {/* <!-- start delivery location --> */}
          <button 
            type="button"
            className="flex mx-1"
            onClick={() => setOpenSelectPlace(true)}
          >
            <div className="flex justify-center items-center">
              <div className="h-5 w-5 flex justify-center items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" width="32" height="32" aria-hidden="true" role="presentation" focusable="false" viewBox="0 0 16 16">
                  <path fill="currentColor" d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4Zm6 3c0 2.874-3.097 6.016-4.841 7.558a1.74 1.74 0 0 1-2.318 0C5.097 13.016 2 9.874 2 7a6 6 0 1 1 12 0Zm-1 0A5 5 0 0 0 3 7c0 1.108.615 2.395 1.57 3.683c.934 1.258 2.087 2.377 2.933 3.126a.74.74 0 0 0 .994 0c.846-.749 2-1.867 2.933-3.126C12.385 9.395 13 8.108 13 7Z"/>
                </svg>
              </div>
              <div className="flex flex-col text-sm leading-tight text-left">
                <p className="text-gray-700 font-bold tracking-tight">
                  Hello, select
                </p>
                <p className="font-bold text-sm leading-4">Your delivery city</p>
              </div>
            </div>
          </button>
          {/* <!-- end delivery location --> */}
      
          {/* <!-- start search bar --> */}
          {/* <Search /> */}
          {/* <!-- end search bar --> */}
          
          {/* <!-- start lang/currency --> */}
          {/* <LangCurrency /> */}
          {/* <!-- end lang/currency --> */}
      
          {/* <!-- start login --> */}
          {/* <Login /> */}
          {/* <!-- end login --> */}
      
          {/* <!-- start orders --> */}
          <a className="sm:block flex mx-2 mr-4" href="#">
            <div className="flex justify-center items-center">
              <div className="flex flex-col text-sm leading-tight text-left">
                <p className="text-gray-700 font-bold tracking-tight">
                  View 
                </p>
                <div className="flex flex-wrap items-center">
                  <p className="font-bold text-sm leading-4">
                    Your Orders
                  </p>
                </div>
              </div>
            </div>
          </a>
          {/* <!-- end orders --> */}
      
          {/* <!-- start cart --> */}
          <button type="button" className="relative block mx-3.5">
            <svg className="w-8 h-8 text-gray-700 fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M2.5 2a.5.5 0 0 0 0 1h.246a.5.5 0 0 1 .48.363l1.586 5.55A1.5 1.5 0 0 0 6.254 10h4.569a1.5 1.5 0 0 0 1.393-.943l1.474-3.686A1 1 0 0 0 12.762 4H4.448l-.261-.912A1.5 1.5 0 0 0 2.746 2H2.5Zm3.274 6.637L4.734 5h8.027l-1.474 3.686a.5.5 0 0 1-.464.314H6.254a.5.5 0 0 1-.48-.363ZM6.5 14a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm4 1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Z"/></svg>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-dm-red rounded-full">99</span>
          </button>
          {/* <!-- end cart --> */}
        </div>
      </nav>
      <SelectPlace {...{ openSelectPlace, setOpenSelectPlace }}></SelectPlace>
    </>
  )
}

export default TopBar
