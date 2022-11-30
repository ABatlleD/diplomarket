import React from 'react'
import PropTypes from 'prop-types'
import Cart from '../icons/cart'
import useWindowSize from '../../hooks/WindowSize'

function AddToCartBtn({ onClick, disabled, dimentions }) {
  const size = useWindowSize()

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center text-button bg-background-100 justify-center px-1 md:px-3 py-[0.1rem] text-sm font-semibold transition-colors duration-300 border-[1px] rounded-md sm:px-5 border-border-100 sm:justify-start text-accent bg-light hover:bg-accent hover:border-accent"
    >
      <Cart width={dimentions ? dimentions[0] : size.width < 768 ? 12 : 18} height={dimentions ? dimentions[0] : size.width < 768 ? 12 : 18} />
    </button>
  )
};

AddToCartBtn.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  dimentions: PropTypes.array
}

export default AddToCartBtn
