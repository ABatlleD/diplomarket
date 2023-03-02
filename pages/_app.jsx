import React from "react"
import NextNProgress from "nextjs-progressbar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "../i18n"
import "swiper/css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/globals.css"
import "../styles/preloader.css"
import "@fontsource/josefin-sans/300.css"
import "@fontsource/josefin-sans/400.css"
import "@fontsource/josefin-sans/500.css"
import "@fontsource/josefin-sans/700.css"
import SwiperCore, { Autoplay } from "swiper"
import { SessionProvider } from "next-auth/react"
import localFont from "@next/font/local"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import dynamic from "next/dynamic"

const WebChat = dynamic(() => import("../components/WebChat"))

const theme = createTheme({
  typography: {
    fontFamily: '"Arial", "Helvetica", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
})

const arial = localFont({ src: "../public/assets/font/arial/Arial.ttf" })

SwiperCore.use([Autoplay])

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <ThemeProvider theme={theme}>
        <NextNProgress color="#b12024" />
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <main className={arial.className}>
              <Component {...pageProps} />
            </main>
          </QueryClientProvider>
        </SessionProvider>
        <WebChat />
      </ThemeProvider>
    </>
  )
}

export default MyApp
