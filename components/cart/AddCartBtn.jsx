import React from 'react'
import dynamic from 'next/dynamic'
import useWindowSize from '../../hooks/WindowSize'

const Cart = dynamic(() => import('../icons/cart'))

function AddToCartBtn({ onClick, disabled, dimensions, text }) {
  const size = useWindowSize()

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center text-button bg-background-100 justify-center px-1 md:px-3 text-sm font-semibold transition-colors duration-300 border-[1px] rounded-md sm:px-5 border-border-100 sm:justify-start text-accent bg-light hover:bg-accent hover:border-accent"
    >
      <Cart width={dimensions ? dimensions[0] : size.width < 768 ? 19 : 18} height={dimensions ? dimensions[0] : size.width < 768 ? 19 : 18} />
      {text && (
        <p className='ml-1 mt-[0.2rem]'>{text}</p>
      )}
    </button>
  )
};

export default AddToCartBtn
