import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { FavProvider } from "../store/fav/fav.context.jsx"
import { CompareProvider } from "../store/compare/compare.context.jsx"
import { CartProvider } from "../store/cart/cart.context.jsx"
import { SessionProvider } from "next-auth/react"
import { addClicks, clicks } from "../libs/quick-tip"
import useScrollY from "../hooks/Scroll.js"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import PreLoader from "../components/PreLoader.jsx"
import NavBar from "./NavBar"
import Footer from "./Footer"
import CategoriesSideBar from "../components/layouts/sidebar/CategoriesSideBar"
import MainSideBar from "../components/layouts/sidebar/MainSideBar"
import CartSideBar from "../components/layouts/sidebar/CartSideBar"
import QuickTip from "../components/modals/QuickTip"

function MainLayout({ children, filterBar = false }) {
  const [categoriesSideBar, setCategoriesSideBar] = useState(false)
  const [mainSideBar, setMainSideBar] = useState(false)
  const [cartSideBar, setCartSideBar] = useState(false)
  const [openSelectPlace, setOpenSelectPlace] = useState(false)
  const [openQuickTip, setOpenQuickTip] = useState(false)
  const NEXT_MUNICIPALITY = getCookie("NEXT_MUNICIPALITY")
  const scrollY = useScrollY()

  useEffect(() => {
    const interval = setInterval(() => {
      if (clicks === 1) {
        addClicks()
        setOpenQuickTip(true)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!NEXT_MUNICIPALITY) {
      setOpenSelectPlace(true)
    }
  })

  const queryClient = new QueryClient()

  const [done, setDone] = useState(false)

  useEffect(() => {
    setTimeout(() => setDone(true), 500)
  }, [])

  if (!done)
    return (
      <div style={{ margin: 20 }}>
        <PreLoader />
      </div>
    )

  return (
    <>
      <SessionProvider session={children.session}>
        <CompareProvider>
          <FavProvider>
            <CartProvider>
              <QueryClientProvider client={queryClient}>
                <motion.div
                  animate={{
                    opacity:
                      categoriesSideBar || mainSideBar || cartSideBar ? 0.5 : 1,
                  }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                >
                  <NavBar
                    {...{
                      categoriesSideBar,
                      setCategoriesSideBar,
                      mainSideBar,
                      setMainSideBar,
                      cartSideBar,
                      setCartSideBar,
                      openSelectPlace,
                      setOpenSelectPlace,
                    }}
                  />
                  <main>{children}</main>
                  <Footer
                    {...{
                      cartSideBar,
                      setCartSideBar,
                    }}
                  />
                </motion.div>
                <CategoriesSideBar
                  {...{ categoriesSideBar, setCategoriesSideBar }}
                />
                <MainSideBar
                  {...{
                    mainSideBar,
                    setMainSideBar,
                    openSelectPlace,
                    setOpenSelectPlace,
                  }}
                />
                <CartSideBar {...{ cartSideBar, setCartSideBar }} />
                <QuickTip {...{ openQuickTip, setOpenQuickTip }} />
                {scrollY !== 0 && (
                  <div
                    className="fixed overflow-hidden p-2 rounded-full bottom-8 right-3 bg-footer-background-300 text-background-100 flex flex-row justify-center items-center shadow-md hover:cursor-pointer"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <KeyboardArrowUpIcon fontSize="large" />
                  </div>
                )}
              </QueryClientProvider>
            </CartProvider>
          </FavProvider>
        </CompareProvider>
      </SessionProvider>
    </>
  )
}

export default MainLayout
