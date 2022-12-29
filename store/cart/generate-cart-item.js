export function generateCartItem(item, variation) {
  const {
    id,
    nombre,
    nombre_ingles,
    imagen,
    img_principal,
    precio,
    precio_b2b,
    discount,
    sale_price,
    free_shipping,
    cant_inventario,
    max
  } = item

  return {
    id: `${id}`,
    name: nombre,
    english_name: nombre_ingles,
    slug: item?.slug,
    image: img_principal || imagen,
    stock: cant_inventario,
    max,
    free_shipping,
    price: Number(sale_price || precio.cantidad),
    price_b2b: Number(sale_price || precio_b2b.cantidad),
    discount
  }
}
