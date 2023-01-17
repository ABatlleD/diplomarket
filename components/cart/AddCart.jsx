import React from 'react'
import dynamic from 'next/dynamic'
import { useCart } from '../../store/cart/cart.context'
import { generateCartItem } from '../../store/cart/generate-cart-item'
import { addClicks } from '../../libs/quick-tip'
import { useSession } from 'next-auth/react'

const AddToCartBtn = dynamic(() => import('./AddCartBtn'))
const AppCounter = dynamic(() => import('../AppCounter'))

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
