import React, { useCallback } from 'react'
import { compareReducer, initialState } from './compare.reducer'
import { getItem, inStock } from './compare.utils'
import { useLocalStorage } from '../../libs/use-local-storage'
import { COMPARE_KEY } from '../../libs/constants'

export const CompareContext = React.createContext(undefined)

CompareContext.displayName = 'CompareContext'

export const useCompare = () => {
  const context = React.useContext(CompareContext)
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider')
  }
  return React.useMemo(() => context, [context])
}

export const CompareProvider = (props) => {
  const [savedCompare, saveCompare] = useLocalStorage(
    COMPARE_KEY,
    JSON.stringify(initialState)
  )
  const [state, dispatch] = React.useReducer(
    compareReducer,
    savedCompare ? JSON.parse(savedCompare) : initialState
  )

  React.useEffect(() => {
    saveCompare(JSON.stringify(state))
  }, [state, saveCompare])

  const addItemToCompare = (item, quantity) =>
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity })
  const removeItemFromCompare = (id) =>
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id })
  const clearItemFromCompare = (id) =>
    dispatch({ type: 'REMOVE_ITEM', id })
  const isInCompare = useCallback(
    (id) => !!getItem(state.items, id),
    [state.items]
  )
  const getItemFromCompare = useCallback(
    (id) => getItem(state.items, id),
    [state.items]
  )
  const isInStock = useCallback(
    (id) => inStock(state.items, id),
    [state.items]
  )
  const resetCompare = () => dispatch({ type: 'RESET_COMPARE' })
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCompare,
      removeItemFromCompare,
      clearItemFromCompare,
      getItemFromCompare,
      isInCompare,
      isInStock,
      resetCompare
    }),
    [getItemFromCompare, isInCompare, isInStock, state]
  )
  return <CompareContext.Provider value={value} {...props} />
}
