import React from 'react'
import FooterBox from '../components/layouts/footer/FooterBox'
import BrandBar from '../components/layouts/footer/BrandBar'
import PropTypes from 'prop-types'
import { Josefin_Sans } from '@next/font/google'

const js = Josefin_Sans({
  weight: '400',
  subsets: ['latin']
})

function Footer({ cartSideBar, setCartSideBar }) {
  return (
    <main className={js.className}>
      <div className='flex flex-col'>
        <FooterBox {...{
          cartSideBar,
          setCartSideBar
        }}/>
        <BrandBar />
      </div>
    </main>
  )
}

Footer.propTypes = {
  cartSideBar: PropTypes.bool,
  setCartSideBar: PropTypes.func
}

export default Footer
