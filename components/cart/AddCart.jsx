import React from 'react'
import AppCounter from '../AppCounter'
import AddToCartBtn from './AddCartBtn'
import { useCart } from '../../store/cart/cart.context'
import { generateCartItem } from '../../store/cart/generate-cart-item'
import { addClicks } from '../../libs/quick-tip'

function AddToCart ({
  data,
  counterClass,
  helium,
  variation,
  disabled,
  size
}) {
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart
  } = useCart()
  const item = generateCartItem(data, variation)
  const outOfStock = isInCart(`${item.id}`) && !isInStock(`${item.id}`)

  const handleAddClick = (
    e
  ) => {
    e.stopPropagation()
    addClicks()
    addItemToCart(item, 1)
  }

  const handleRemoveClick = (e) => {
    e.stopPropagation()
    addClicks()
    removeItemFromCart(`${item.id}`)
  }

  //! Hydration error because isInCart method
  return (
    <>
      {!isInCart(`${item.id}`) && (
      <AddToCartBtn
        disabled={disabled || outOfStock}
        onClick={handleAddClick}
        dimentions={size}
      />
      )}
      {isInCart(`${item.id}`) && (
        <AppCounter
          value={getItemFromCart(`${item.id}`).quantity}
          onDecrement={handleRemoveClick}
          onIncrement={handleAddClick}
          className={counterClass}
          variant={helium ? 'helium' : 'details'}
          disabled={outOfStock}
        />
      )}
    </>
  )
}

export default AddToCart
