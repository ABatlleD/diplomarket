import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import CategoriesSideBar from '../components/layouts/sidebar/CategoriesSideBar'
import MainSideBar from '../components/layouts/sidebar/MainSideBar'
import CartSideBar from '../components/layouts/sidebar/CartSideBar'
import { motion } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { FavProvider } from '../store/fav/fav.context.jsx'

function MainLayout({ children }) {
  const [categoriesSideBar, setCategoriesSideBar] = useState(false)
  const [mainSideBar, setMainSideBar] = useState(false)
  const [cartSideBar, setCartSideBar] = useState(false)
  const [openSelectPlace, setOpenSelectPlace] = useState(false)
  const NEXT_MUNICIPALITY = getCookie('NEXT_MUNICIPALITY')

  useEffect(() => {
    if (!NEXT_MUNICIPALITY) {
      setOpenSelectPlace(true)
    }
  }, [])

  const queryClient = new QueryClient()

  return (
    <>
      <FavProvider>
        <QueryClientProvider client={queryClient}>
          <motion.div
            animate={{
              opacity: categoriesSideBar || mainSideBar || cartSideBar ? 0.5 : 1
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <NavBar {...{
              categoriesSideBar,
              setCategoriesSideBar,
              mainSideBar,
              setMainSideBar,
              cartSideBar,
              setCartSideBar,
              openSelectPlace,
              setOpenSelectPlace
            }}/>
            <main>{children}</main>
            <Footer {...{
              cartSideBar,
              setCartSideBar
            }} />
          </motion.div>
          <CategoriesSideBar {...{ categoriesSideBar, setCategoriesSideBar }} />
          <MainSideBar {...{ mainSideBar, setMainSideBar }} />
          <CartSideBar {...{ cartSideBar, setCartSideBar }} />
        </QueryClientProvider>
      </FavProvider>
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout
