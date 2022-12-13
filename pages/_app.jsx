import React from 'react'
import NextNProgress from 'nextjs-progressbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../i18n'
import 'swiper/css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import SwiperCore, { Autoplay } from 'swiper'
import WebChat from '../components/WebChat'
import { SessionProvider } from 'next-auth/react'
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

SwiperCore.use([Autoplay])

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <NextNProgress color="#b12024" />
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <main className={roboto.className}>
            <Component {...pageProps} />
          </main>
        </QueryClientProvider>
      </SessionProvider>
      <WebChat />
    </>
  )
}

export default MyApp
