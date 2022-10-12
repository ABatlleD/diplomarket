import React from 'react'
import TopBar from '../components/layouts/navbar/TopBar'
import BottomOptions from '../components/layouts/navbar/BottomOptions'
import PropTypes from 'prop-types'

function NavBar({ categoriesSideBar, setCategoriesSideBar, mainSideBar, setMainSideBar, cartSideBar, setCartSideBar }) {
  return (
    <>
      <div className='flex flex-col'>
        <TopBar {...{ categoriesSideBar, setCategoriesSideBar, mainSideBar, setMainSideBar, cartSideBar, setCartSideBar }} />
        <BottomOptions {...{ categoriesSideBar, setCategoriesSideBar, mainSideBar, setMainSideBar }} />
      </div>
    </>
  )
}

NavBar.propTypes = {
  categoriesSideBar: PropTypes.bool,
  setCategoriesSideBar: PropTypes.func,
  mainSideBar: PropTypes.bool,
  setMainSideBar: PropTypes.func,
  cartSideBar: PropTypes.bool,
  setCartSideBar: PropTypes.func
}

export default NavBar
