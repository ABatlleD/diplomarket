import React from 'react'
import { useFav } from '../../store/fav/fav.context'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import { generateFavItem } from '../../store/fav/generate-fav-item'
import PropTypes from 'prop-types'

function AddToFav({
  data,
  counterClass,
  variation,
  disabled
}) {
  const {
    addItemToFav,
    removeItemFromFav,
    isInFav
  } = useFav()
  const item = generateFavItem(data, variation)
  const handleAddClick = (
    e
  ) => {
    e.stopPropagation()
    addItemToFav(item, 1)
  }
  const handleRemoveClick = (e) => {
    e.stopPropagation()
    removeItemFromFav(item.id)
  }
  return !isInFav(item?.id)
    ? (
      <div onClick={handleAddClick} className='text-button hover:cursor-pointer'>
        <FavoriteBorderOutlinedIcon
            fontSize="large"
        />
      </div>
      )
    : (
        <div onClick={handleRemoveClick} className='text-button hover:cursor-pointer'>
          <FavoriteOutlinedIcon
              fontSize="large"
          />
        </div>
      )
}

AddToFav.propTypes = {
  data: PropTypes.any,
  counterClass: PropTypes.string,
  variation: PropTypes.any,
  disabled: PropTypes.bool
}

export default AddToFav
