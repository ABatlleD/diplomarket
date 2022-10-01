import React from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'

function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout
