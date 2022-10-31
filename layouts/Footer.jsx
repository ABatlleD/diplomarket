import React from 'react'
import FooterBox from '../components/layouts/footer/FooterBox'
import BrandBar from '../components/layouts/footer/BrandBar'
import PropTypes from 'prop-types'

function Footer({ cartSideBar, setCartSideBar }) {
  return (
    <div className='flex flex-col'>
      <FooterBox {...{
        cartSideBar,
        setCartSideBar
      }}/>
      <BrandBar />
    </div>
  )
}

Footer.propTypes = {
  cartSideBar: PropTypes.bool,
  setCartSideBar: PropTypes.func
}

export default Footer
