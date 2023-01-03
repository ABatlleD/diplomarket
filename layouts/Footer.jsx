import React from 'react'
import PropTypes from 'prop-types'
import { Josefin_Sans } from '@next/font/google'
import dynamic from 'next/dynamic'

const FooterBox = dynamic(() => import('../components/layouts/footer/FooterBox'))
const BrandBar = dynamic(() => import('../components/layouts/footer/BrandBar'))

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
