import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import localFont from '@next/font/local'

const FooterBox = dynamic(() =>
  import('../components/layouts/footer/FooterBox')
)
const BrandBar = dynamic(() => import('../components/layouts/footer/BrandBar'))

const arial = localFont({ src: '../public/assets/font/arial/Arial.ttf' })

function Footer({ cartSideBar, setCartSideBar }) {
  return (
    <footer className={arial.className}>
      <div className="flex flex-col">
        <FooterBox
          {...{
            cartSideBar,
            setCartSideBar,
          }}
        />
        <BrandBar />
      </div>
    </footer>
  )
}

Footer.propTypes = {
  cartSideBar: PropTypes.bool,
  setCartSideBar: PropTypes.func,
}

export default Footer
