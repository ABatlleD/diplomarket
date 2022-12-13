import React from 'react'
import FooterBox from '../components/layouts/footer/FooterBox'
import BrandBar from '../components/layouts/footer/BrandBar'
import PropTypes from 'prop-types'
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

function Footer({ cartSideBar, setCartSideBar }) {
  return (
    <main className={roboto.className}>
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
