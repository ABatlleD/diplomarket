import { useEffect } from 'react'
import resources from '../restapi/resources'
import { useCart } from '../store/cart/cart.context'

export const checkCart = () => {
  const cart = localStorage.getItem('dm-cart')
  try {
    const cart_json = JSON.parse(cart)
    return JSON.parse(cart_json)
  } catch (_) {
    return false
  }
}

const checkItems = () => {
  const { items, updateItemToCart } = useCart()
  useEffect(() => {
    updateItem()
  }, [])
  const updateItem = (() => {
    const executed = false
    return () => {
      if (!executed) {
        const cartItems = Promise.all(items.map(obj => resources.products.one(obj?.id)))
          .then((products) => {
            const all = products.map(result => {
              const producto = result?.data
              const itm = items.filter((item) => {
                if (item?.id === producto?.id && item?.max !== producto?.max) {
                  item.max = producto?.max
                  item.stock = producto?.cant_inventario
                }
                const { itemTotal, ...restItem } = item
                return restItem
              })
              return itm
            })
            const [product] = all
            return product
          })
        cartItems.then((data) => {
          updateItemToCart(data)
        })
      }
    }
  })()
}

export default checkItems
