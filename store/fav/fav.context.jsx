import React, { useCallback } from 'react'
import { favReducer, initialState } from './fav.reducer'
import { getItem, inStock } from './fav.utils'
import { useLocalStorage } from '../../libs/use-local-storage'
import { FAV_KEY } from '../../libs/constants'

export const FavContext = React.createContext(undefined)

FavContext.displayName = 'FavContext'

export const useFav = () => {
  const context = React.useContext(FavContext)
  if (context === undefined) {
    throw new Error('useFav must be used within a FavProvider')
  }
  return React.useMemo(() => context, [context])
}

export const FavProvider = (props) => {
  const [savedFav, saveFav] = useLocalStorage(
    FAV_KEY,
    JSON.stringify(initialState)
  )
  const [state, dispatch] = React.useReducer(
    favReducer,
    savedFav ? JSON.parse(savedFav) : initialState
  )

  React.useEffect(() => {
    saveFav(JSON.stringify(state))
  }, [state, saveFav])

  const addItemToFav = (item, quantity) =>
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity })
  const removeItemFromFav = (id) =>
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id })
  const clearItemFromFav = (id) =>
    dispatch({ type: 'REMOVE_ITEM', id })
  const isInFav = useCallback(
    (id) => !!getItem(state.items, id),
    [state.items]
  )
  const getItemFromFav = useCallback(
    (id) => getItem(state.items, id),
    [state.items]
  )
  const isInStock = useCallback(
    (id) => inStock(state.items, id),
    [state.items]
  )
  const resetFav = () => dispatch({ type: 'RESET_FAV' })
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToFav,
      removeItemFromFav,
      clearItemFromFav,
      getItemFromFav,
      isInFav,
      isInStock,
      resetFav
    }),
    [getItemFromFav, isInFav, isInStock, state]
  )
  return <FavContext.Provider value={value} {...props} />
}
