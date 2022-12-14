import React from 'react'
import Cart from '../icons/cart'
import useWindowSize from '../../hooks/WindowSize'

function AddToCartBtn({ onClick, disabled, dimentions, text }) {
  const size = useWindowSize()

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center text-button bg-background-100 justify-center px-1 md:px-3 py-[0.1rem] text-sm font-semibold transition-colors duration-300 border-[1px] rounded-md sm:px-5 border-border-100 sm:justify-start text-accent bg-light hover:bg-accent hover:border-accent"
    >
      <Cart width={dimentions ? dimentions[0] : size.width < 768 ? 19 : 18} height={dimentions ? dimentions[0] : size.width < 768 ? 19 : 18} />
      {text && (
        <p className='ml-1'>{text}</p>
      )}
    </button>
  )
};

export default AddToCartBtn
