import React, { useState } from 'react'
import TopBar from '../components/layouts/navbar/TopBar'
import BottomOptions from '../components/layouts/navbar/BottomOptions'
import CategoriesSideBar from '../components/layouts/sidebar/CategoriesSideBar'
import MainSideBar from '../components/layouts/sidebar/MainSideBar'
import CartSideBar from '../components/layouts/sidebar/CartSideBar'

function Footer() {
  const [categoriesSideBar, setCategoriesSideBar] = useState(false)
  const [mainSideBar, setMainSideBar] = useState(false)
  const [cartSideBar, setCartSideBar] = useState(false)

  return (
    <>
      <div className='flex flex-col'>
        <TopBar {...{ categoriesSideBar, setCategoriesSideBar, mainSideBar, setMainSideBar, cartSideBar, setCartSideBar }} />
        <BottomOptions {...{ categoriesSideBar, setCategoriesSideBar, mainSideBar, setMainSideBar }} />
        <CategoriesSideBar {...{ categoriesSideBar, setCategoriesSideBar }} />
        <MainSideBar {...{ mainSideBar, setMainSideBar }} />
        <CartSideBar {...{ cartSideBar, setCartSideBar }} />
      </div>
    </>
  )
}

export default Footer
