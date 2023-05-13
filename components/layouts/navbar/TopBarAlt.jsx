import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import { useFav } from '../../../store/fav/fav.context'
import { useCart } from '../../../store/cart/cart.context'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const LangSelector = dynamic(() => import('./LangSelectorAlt'))
const SearchBar = dynamic(() => import('../../SearchBarAlt'))
const AccountMenu = dynamic(() => import('./AccountMenuAlt'))
const SelectPlace = dynamic(() => import('../../modals/SelectPlace'))

function TopBar({
  setMainSideBar,
  setCartSideBar,
  openSelectPlace,
  setOpenSelectPlace,
}) {
  const [ t ] = useTranslation()
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
          <div className="flex items-center">
            <div
              className="ml-1 xl:hidden"
              onClick={() => setMainSideBar(true)}
            >
              <DensityMediumIcon fontSize="large" />
            </div>
            {/* <!-- start logo --> */}
            <div className="inline-flex">
              <Link href="/">
                <img src="/logo-navbar.png" width="128" height="52" alt="Diplomark Logo" />
              </Link>
            </div>
            {/* <!-- end logo --> */}
          </div>
          {/* <!-- start delivery location --> */}
          {/* <!-- end delivery location --> */}
      
          {/* <!-- start search bar --> */}
          <div className="hidden xl:flex flex-grow items-center rounded-md shadow-sm mx-2">
            <SearchBar {...{ setOpenSelectPlace }} />
          </div>
          {/* <!-- end search bar --> */}
          <div className="flex items-center">
            {/* <!-- start lang/currency --> */}
            <LangSelector />
            {/* <!-- end lang/currency --> */}

            {/* <!-- start login --> */}
            {/* <a className="flex mx-2 mr-4 justify-center items-center" href="#">
              <div className="flex flex-col text-sm leading-tight text-left">
                <p className="text-gray-700 font-bold tracking-tight">
                  Hello, sign in
                </p>
                <div className="flex flex-wrap items-center">
                  <p className="font-bold text-sm leading-4">
                    Account &amp; Wishlist
                  </p>
                  <svg className="ml-1 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  </svg>
                </div>
              </div>
            </a> */}
            <AccountMenu />
            {/* <!-- end login --> */}
          
            {/* <!-- start orders --> */}
            <div className="hidden xl:flex mx-2 mr-4">
              <Link href={'/account/orders'}>
                <div className="flex justify-center items-center">
                  <div className="flex flex-col text-sm leading-tight text-left">
                    <p className="text-gray-700 font-bold tracking-tight">
                      {t('layout.navbar.view')}
                    </p>
                    <div className="flex flex-wrap items-center">
                      <p className="font-bold text-sm leading-4">
                        {t('layout.navbar.my_orders')}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/* <!-- end orders --> */}
          
            {/* <!-- start cart --> */}
            <button 
              onClick={() => setCartSideBar(true)} 
              type="button" 
              className="relative block mx-3.5"
            >
              <svg className="w-8 h-8 text-gray-700 fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                <path fill="currentColor" d="M2.5 2a.5.5 0 0 0 0 1h.246a.5.5 0 0 1 .48.363l1.586 5.55A1.5 1.5 0 0 0 6.254 10h4.569a1.5 1.5 0 0 0 1.393-.943l1.474-3.686A1 1 0 0 0 12.762 4H4.448l-.261-.912A1.5 1.5 0 0 0 2.746 2H2.5Zm3.274 6.637L4.734 5h8.027l-1.474 3.686a.5.5 0 0 1-.464.314H6.254a.5.5 0 0 1-.48-.363ZM6.5 14a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm4 1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Z"/>
              </svg>
              {totalCart > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-dm-red rounded-full">
                {totalCart > 99 ? "+99" : totalCart}
              </span>}
            </button>
            {/* <!-- end cart --> */}
          </div>
        </div>
      </nav>
      <SelectPlace {...{ openSelectPlace, setOpenSelectPlace }}></SelectPlace>
    </>
  )
}

export default TopBar
