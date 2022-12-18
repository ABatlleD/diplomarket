import React, { useState, useEffect } from 'react'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import { Badge, Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LangSelector from './LangSelector'
import LockIcon from '@mui/icons-material/Lock'
import useWindowSize from '../../../hooks/WindowSize'
import SearchBar from '../../SearchBar'
import AccountMenu from './AccountMenu'
import Link from 'next/link'
import SelectPlace from '../../modals/SelectPlace'
import { useFav } from '../../../store/fav/fav.context'
import { useCart } from '../../../store/cart/cart.context'
import CartHomeIcon from '../../icons/cart-home-icon'
import HeartIcon from '../../icons/heart-icon'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function TopBar({
  categoriesSideBar,
  setCategoriesSideBar,
  mainSideBar,
  setMainSideBar,
  cartSideBar,
  setCartSideBar,
  openSelectPlace,
  setOpenSelectPlace
}) {
  // const [t] = useTranslation()
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
      < div className='flex flex-row justify-between md:justify-between dark:bg-background-100'>
        <div className='flex flex-row dark:text-[black] justify-start md:ml-6 w-1/2 md:w-1/5 xl:w-[8%]'>
          <div
            className='mt-2
            xl:hidden'
            onClick={() => setMainSideBar(true)}
          >
            <DensityMediumIcon
              fontSize='large'
            />
          </div>
          <Link href="/">
            <img src="/logo-preloader0.png" className="max-w-max h-14 hover:cursor-pointer" alt="..." />
          </Link>
        </div>
        <div className='hidden md:hidden xl:flex xl:w-10/12 2xl:w-10/12 flex-row mt-2'>
          <div className='md:ml-3 md:w-[98%]'>
            <SearchBar {...{ openSelectPlace, setOpenSelectPlace }} />
          </div>
        </div>
        <div className='flex flex-row justify-between md:justify-around w-5/12 md:w-4/12 xl:w-3/12 2xl:w-2/12 md:mt-[-5px]'>
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
            <Link href={'/wishlist'}>
              <div className='hover:cursor-pointer'>
                <Badge
                  badgeContent={totalFav}
                  color='error'
                  sx={{
                    marginTop: {
                      xs: '1rem',
                      sm: '1rem',
                      md: '1.1rem'
                    }
                  }}
                >
                  <HeartIcon />
                </Badge>
              </div>
            </Link>
            <div className='hover:cursor-pointer'>
              <Badge
                badgeContent={totalCart}
                color='error'
                sx={{
                  marginTop: {
                    xs: '0.9rem',
                    sm: '0.9rem',
                    md: '1rem'
                  }
                }}
                onClick={() => setCartSideBar(true)}
              >
                <CartHomeIcon />
              </Badge>
            </div>
          </ThemeProvider>
          <div className='mt-[0.25rem] flex md:hidden'>
            <AccountMenu />
          </div>
          <div className='mt-[0.45rem] hidden md:flex'>
            <AccountMenu />
          </div>
        </div>
      </div>
      <SelectPlace {...{ openSelectPlace, setOpenSelectPlace }}></SelectPlace>
    </>
  )
}

export default TopBar
