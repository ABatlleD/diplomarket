import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import CategoriesSideBar from '../components/layouts/sidebar/CategoriesSideBar'
import MainSideBar from '../components/layouts/sidebar/MainSideBar'
import CartSideBar from '../components/layouts/sidebar/CartSideBar'
import { motion } from 'framer-motion'
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function MainLayout({ pageProps, children }) {
  const [categoriesSideBar, setCategoriesSideBar] = useState(false)
  const [mainSideBar, setMainSideBar] = useState(false)
  const [cartSideBar, setCartSideBar] = useState(false)
  const [openSelectPlace, setOpenSelectPlace] = useState(false)

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
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
            <Footer />
          </motion.div>
          <CategoriesSideBar {...{ categoriesSideBar, setCategoriesSideBar }} />
          <MainSideBar {...{ mainSideBar, setMainSideBar }} />
          <CartSideBar {...{ cartSideBar, setCartSideBar }} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node,
  pageProps: PropTypes.object
}

export default MainLayout
