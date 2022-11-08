import React, { useCallback } from 'react'
import { cartReducer, initialState } from './cart.reducer'
import { getItem, inStock, available } from './cart.utils'
import { useLocalStorage } from '../../libs/use-local-storage'
import { CART_KEY } from '../../libs/constants'

export const cartContext = React.createContext(undefined)

cartContext.displayName = 'CartContext'

export const useCart = () => {
  const context = React.useContext(cartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return React.useMemo(() => context, [context])
}

export const CartProvider = (props) => {
  const [savedCart, saveCart] = useLocalStorage(
    CART_KEY,
    JSON.stringify(initialState)
  )
  const [state, dispatch] = React.useReducer(
    cartReducer,
    savedCart ? JSON.parse(savedCart) : initialState
  )

  React.useEffect(() => {
    saveCart(JSON.stringify(state))
  }, [state, saveCart])

  const addItemToCart = (item, quantity) =>
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity })
  const updateItemToCart = (items) =>
    dispatch({ type: 'UPDATE_ITEM', items })
  const removeItemFromCart = (id) =>
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id })
  const clearItemFromCart = (id) =>
    dispatch({ type: 'REMOVE_ITEM', id })
  const isInCart = useCallback(
    (id) => !!getItem(state.items, id),
    [state.items]
  )
  const getItemFromCart = useCallback(
    (id) => getItem(state.items, id),
    [state.items]
  )
  const isInStock = useCallback(
    (id) => inStock(state.items, id),
    [state.items]
  )
  const isAvailable = useCallback(
    (id) => available(state.items, id),
    [state.items]
  )
  const resetCart = () => dispatch({ type: 'RESET_CART' })
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      updateItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      isAvailable,
      resetCart
    }),
    [getItemFromCart, isInCart, isInStock, isAvailable, state]
  )
  return <cartContext.Provider value={value} {...props} />
}
