export function generateCartItem(item, variation) {
  const {
    id,
    nombre,
    imagen,
    img_principal,
    precio,
    discount,
    sale_price,
    free_shipping,
    cant_inventario,
    max
  } = item

  return {
    id: `${id}`,
    name: nombre,
    slug: item?.slug,
    image: img_principal || imagen,
    stock: cant_inventario,
    max,
    free_shipping,
    price: Number(sale_price || precio.cantidad),
    discount
  }
}
