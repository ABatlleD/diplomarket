import React from 'react'
import PropTypes from 'prop-types'
import NextNProgress from 'nextjs-progressbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../i18n'
import 'swiper/css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import SwiperCore, { Autoplay } from 'swiper'

SwiperCore.use([Autoplay])

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <NextNProgress color="#b12024" />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default MyApp
