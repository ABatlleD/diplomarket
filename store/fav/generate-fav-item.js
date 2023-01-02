// Dont use Lodash 268
const isEmpty = (obj) => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

export function generateFavItem(item, variation) {
  const {
    id,
    name,
    slug,
    image,
    imagen,
    img_principal,
    price,
    precio_b2b,
    sale_price,
    quantity,
    unit,
    is_digital
  } = item
  if (!isEmpty(variation)) {
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      name: `${name} - ${variation.title}`,
      slug,
      unit,
      is_digital: variation?.is_digital,
      stock: variation.quantity,
      price: Number(
        variation.sale_price ? variation.sale_price : variation.price
      ),
      price_b2b: Number(
        variation.sale_price ? variation.sale_price : variation.price_b2b
      ),
      image: image?.thumbnail,
      variationId: variation.id
    }
  }
  return {
    id: `${id}`,
    name,
    slug,
    unit,
    is_digital,
    image: img_principal || imagen,
    stock: quantity,
    price: Number(sale_price || price),
    price_b2b: Number(sale_price || precio_b2b)
  }
}
