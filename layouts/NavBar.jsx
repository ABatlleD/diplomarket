import React from "react"
import PropTypes from "prop-types"
import localFont from "@next/font/local"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import dynamic from "next/dynamic"

const TopBar = dynamic(() => import("../components/layouts/navbar/TopBarAlt"))
const BottomOptions = dynamic(() =>
  import("../components/layouts/navbar/BottomOptions")
)

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

function NavBar({
  categoriesSideBar,
  setCategoriesSideBar,
  mainSideBar,
  setMainSideBar,
  cartSideBar,
  setCartSideBar,
  openSelectPlace,
  setOpenSelectPlace,
}) {
  return (
    <ThemeProvider theme={theme}>
      <main className={arial.className}>
        <div className="flex flex-col">
          <TopBar
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
          <BottomOptions
            {...{
              categoriesSideBar,
              setCategoriesSideBar,
              mainSideBar,
              setMainSideBar,
              openSelectPlace,
              setOpenSelectPlace,
            }}
          />
        </div>
      </main>
    </ThemeProvider>
  )
}

NavBar.propTypes = {
  categoriesSideBar: PropTypes.bool,
  setCategoriesSideBar: PropTypes.func,
  mainSideBar: PropTypes.bool,
  setMainSideBar: PropTypes.func,
  cartSideBar: PropTypes.bool,
  setCartSideBar: PropTypes.func,
  openSelectPlace: PropTypes.bool,
  setOpenSelectPlace: PropTypes.func,
}

export default NavBar
