import React from 'react'
import PropTypes from 'prop-types'
import NextNProgress from 'nextjs-progressbar'
import '../config/i18n'
import 'swiper/css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <NextNProgress color="#b12024" />
      <Component {...pageProps} />
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default MyApp
