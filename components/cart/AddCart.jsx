import React from 'react'
import Counter from '../../../components/ui/counter-alt'
import AddToCartBtn from '../../../components/products/add-to-cart/add-to-cart-btn'
import { useCart } from '../../../store/quick-cart/cart.context'
import { generateCartItem } from '../../../store/quick-cart/generate-cart-item'
import PropTypes from 'prop-types'

function AddToCart ({
  data,
  counterClass,
  helium,
  variation,
  disabled
}) {
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart
  } = useCart()
  const item = generateCartItem(data, variation)
  const handleAddClick = (
    e
  ) => {
    e.stopPropagation()
    addItemToCart(item, 1)
  }
  const handleRemoveClick = (e) => {
    e.stopPropagation()
    removeItemFromCart(`${item.id}`)
  }
  const outOfStock = isInCart(`${item.id}`) && !isInStock(`${item.id}`)
  return !isInCart(`${item.id}`)
    ? (
    <AddToCartBtn
      disabled={disabled || outOfStock}
      onClick={handleAddClick}
    />
      )
    : (
    <>
      <Counter
        value={getItemFromCart(`${item.id}`).quantity}
        onDecrement={handleRemoveClick}
        onIncrement={handleAddClick}
        className={counterClass}
        variant={helium ? 'helium' : 'details'}
        disabled={outOfStock}
      />
    </>
      )
}

AddToCart.propTypes = {
  data: PropTypes.any,
  counterClass: PropTypes.string,
  helium: PropTypes.bool,
  variation: PropTypes.any,
  disabled: PropTypes.bool
}

export default AddToCart
