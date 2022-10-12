import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import CategoriesSideBar from '../components/layouts/sidebar/CategoriesSideBar'
import MainSideBar from '../components/layouts/sidebar/MainSideBar'
import CartSideBar from '../components/layouts/sidebar/CartSideBar'
import { motion } from 'framer-motion'

function MainLayout({ children }) {
  const [categoriesSideBar, setCategoriesSideBar] = useState(false)
  const [mainSideBar, setMainSideBar] = useState(false)
  const [cartSideBar, setCartSideBar] = useState(false)

  return (
    <>
      <motion.div
        animate={{
          opacity: categoriesSideBar || mainSideBar || cartSideBar ? 0.5 : 1
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      >
        <NavBar {...{ categoriesSideBar, setCategoriesSideBar, mainSideBar, setMainSideBar, cartSideBar, setCartSideBar }}/>
        <main>{children}</main>
        <Footer />
      </motion.div>
      <CategoriesSideBar {...{ categoriesSideBar, setCategoriesSideBar }} />
      <MainSideBar {...{ mainSideBar, setMainSideBar }} />
      <CartSideBar {...{ cartSideBar, setCartSideBar }} />
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout
