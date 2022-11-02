import React from 'react'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem'

function ListProducts({ products }) {
  // const [items, setItems] = useState([])
  // const size = useWindowSize()

  // const itemsPerRow = () => {
  //   if (size.width < 460) {
  //     return 2
  //   } else if (size.width < 1200) {
  //     return 3
  //   } else {
  //     return 4
  //   }
  // }

  // const serializeProducts = (productsList) => {
  //   for (let index = 0; index < array.length; index++) {
  //     const element = array[index];
  //   }
  // }

  return (
    <div className='flex flex-wrap items-center'>
      {products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  )
}

ListProducts.propTypes = {
  products: PropTypes.array
}

export default ListProducts
