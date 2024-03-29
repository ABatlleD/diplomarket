import React, { useState, useEffect } from "react"
import { addClicks, clicks } from "../libs/quick-tip"
import useScrollY from "../hooks/Scroll.js"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import dynamic from "next/dynamic.js"
import { useAtom } from "jotai"
import { municipalityAtom, provinceAtom } from "../store/place.js"

const Providers = dynamic(() => import("./Providers"))
const NavBar = dynamic(() => import("./NavBar"))
const Footer = dynamic(() => import("./Footer"))
const CategoriesSideBar = dynamic(() =>
  import("../components/layouts/sidebar/CategoriesSideBar")
)
const MainSideBar = dynamic(() =>
  import("../components/layouts/sidebar/MainSideBar")
)
const CartSideBar = dynamic(() =>
  import("../components/layouts/sidebar/CartSideBar")
)
const SelectPlace = dynamic(() => import("../components/modals/SelectPlace"))
const QuickTip = dynamic(() => import("../components/modals/QuickTip"))

function MainLayout({ children, filterBar = false }) {
  const [categoriesSideBar, setCategoriesSideBar] = useState(false)
  const [mainSideBar, setMainSideBar] = useState(false)
  const [cartSideBar, setCartSideBar] = useState(false)
  const [openSelectPlace, setOpenSelectPlace] = useState(false)
  const [openQuickTip, setOpenQuickTip] = useState(false)
  const [municipality] = useAtom(municipalityAtom)
  const [province] = useAtom(provinceAtom)
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

  if (!municipality || !province) {
    return (
      <Providers>
        <SelectPlace openSelectPlace={true}></SelectPlace>
      </Providers>
    )
  }

  return (
    <Providers>
      <div>
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
      </div>
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
    </Providers>
  )
}

export default MainLayout
