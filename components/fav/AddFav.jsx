import React from 'react'
import { useFav } from '../../store/fav/fav.context'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import { generateFavItem } from '../../store/fav/generate-fav-item'
import PropTypes from 'prop-types'
import useWindowSize from '../../hooks/WindowSize'

function AddToFav({
  data,
  text,
  success,
  counterClass,
  variation,
  disabled
}) {
  const size = useWindowSize()
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
      <div onClick={handleAddClick} className='text-button hover:cursor-pointer mt-[-2px] md:mt-0'>
        <FavoriteBorderOutlinedIcon
            fontSize={size.width < 768 ? 'small' : 'medium'}
        />
        {text && (
          <span>{text}</span>
        )}
      </div>
      )
    : (
        <div onClick={handleRemoveClick} className='text-button hover:cursor-pointer'>
          <FavoriteOutlinedIcon
              fontSize={size.width < 768 ? 'small' : 'medium'}
          />
          {success && (
            <span>{success}</span>
          )}
        </div>
      )
}

AddToFav.propTypes = {
  data: PropTypes.any,
  counterClass: PropTypes.string,
  text: PropTypes.string,
  success: PropTypes.string,
  variation: PropTypes.any,
  disabled: PropTypes.bool
}

export default AddToFav
