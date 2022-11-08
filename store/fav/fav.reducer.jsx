import {
  addItemWithQuantity,
  removeItemOrQuantity,
  addItem,
  updateItem,
  removeItem,
  calculateUniqueItems,
  calculateItemTotals,
  calculateTotalItems,
  calculateTotal
} from './fav.utils'

export const initialState = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItemsFav: 0,
  total: 0,
  meta: null
}

export function favReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM_WITH_QUANTITY': {
      const items = addItemWithQuantity(
        state.items,
        action.item,
        action.quantity
      )
      return generateFinalState(state, items)
    }
    case 'REMOVE_ITEM_OR_QUANTITY': {
      const items = removeItemOrQuantity(
        state.items,
        action.id,
        action.quantity ?? 1
      )
      return generateFinalState(state, items)
    }
    case 'ADD_ITEM': {
      const items = addItem(state.items, action.item)
      return generateFinalState(state, items)
    }
    case 'REMOVE_ITEM': {
      const items = removeItem(state.items, action.id)
      return generateFinalState(state, items)
    }
    case 'UPDATE_ITEM': {
      const items = updateItem(state.items, action.id, action.item)
      return generateFinalState(state, items)
    }
    case 'RESET_FAV':
      return initialState
    default:
      return state
  }
}

const generateFinalState = (state, items) => {
  const totalUniqueItemsFav = calculateUniqueItems(items)
  return {
    ...state,
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    totalUniqueItemsFav,
    total: calculateTotal(items),
    isEmpty: totalUniqueItemsFav === 0
  }
}
