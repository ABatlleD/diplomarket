export function addItemWithQuantity(
  items,
  item,
  quantity
) {
  if (quantity <= 0) { throw new Error("cartQuantity can't be zero or less than zero") }
  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem.id === item.id
  )
  if (existingItemIndex > -1) {
    const newItems = [...items]
    newItems[existingItemIndex].quantity += quantity
    return newItems
  }
  return [...items, { ...item, quantity }]
}

export function removeItemOrQuantity(
  items,
  id,
  quantity
) {
  return items.reduce((acc, item) => {
    if (item.id === id) {
      const newQuantity = item.quantity - quantity

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc]
    }
    return [...acc, item]
  }, [])
}
// Simple CRUD for Item
export function addItem(items, item) {
  console.log('🚀 ~ file: fav.utils.js ~ line 40 ~ addItem ~ item', item)
  return [...items, item]
}

export function getItem(items, id) {
  return items.find((item) => item.id === id)
}

export function updateItem(
  items,
  id,
  item
) {
  return items.map((existingItem) =>
    existingItem.id === id ? { ...existingItem, ...item } : existingItem
  )
}

export function removeItem(items, id) {
  return items.filter((existingItem) => existingItem.id !== id)
}
export function inStock(items, id) {
  const item = getItem(items, id)
  if (item) return item.quantity < item.stock
  return false
}
export const calculateItemTotals = (items) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.price * item.quantity
  }))

export const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.quantity * item.price, 0)

export const calculateTotalItems = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)

export const calculateUniqueItems = (items) => items.length

export const calculatePaidTotal = (
  { totalAmount, tax, shipping_charge },
  discount
) => {
  let paidTotal = totalAmount + tax + shipping_charge
  if (discount) {
    paidTotal = paidTotal - discount
  }
  return paidTotal
}
