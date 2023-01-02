import React from 'react'
import AppCounter from '../AppCounter'
import AddToCartBtn from './AddCartBtn'
import { useCart } from '../../store/cart/cart.context'
import { generateCartItem } from '../../store/cart/generate-cart-item'
import { addClicks } from '../../libs/quick-tip'
import { useSession } from 'next-auth/react'

function AddToCart ({
  data,
  counterClass,
  helium,
  variation,
  disabled,
  size,
  sizes,
  text
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
  const session = useSession()

  const handleAddClick = (
    e
  ) => {
    e.stopPropagation()
    addClicks()
    if (session && session.data && session.data.mayorista) {
      item.price = item.price_b2b
    }
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
        dimensions={size}
        text={text}
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
          size={sizes}
        />
      )}
    </>
  )
}

export default AddToCart
