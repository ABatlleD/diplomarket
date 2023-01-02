import React from 'react'
import { useFav } from '../../store/fav/fav.context'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import { generateFavItem } from '../../store/fav/generate-fav-item'
import useWindowSize from '../../hooks/WindowSize'
import { addClicks } from '../../libs/quick-tip'
import { useSession } from 'next-auth/react'

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
  const session = useSession()
  const item = generateFavItem(data, variation)
  const handleAddClick = (
    e
  ) => {
    e.stopPropagation()
    addClicks()
    if (session && session.data && session.data.mayorista) {
      item.price = item.price_b2b
    }
    addItemToFav(item, 1)
  }
  const handleRemoveClick = (e) => {
    e.stopPropagation()
    addClicks()
    removeItemFromFav(item.id)
  }
  return !isInFav(item?.id)
    ? (
      <div onClick={handleAddClick} className='text-button hover:cursor-pointer'>
        <FavoriteBorderOutlinedIcon
            fontSize={size.width < 768 ? 'medium' : 'medium'}
        />
        {text && (
          <span>{text}</span>
        )}
      </div>
      )
    : (
        <div onClick={handleRemoveClick} className='text-button hover:cursor-pointer'>
          <FavoriteOutlinedIcon
              fontSize={size.width < 768 ? 'medium' : 'medium'}
          />
          {success && (
            <span>{success}</span>
          )}
        </div>
      )
}

export default AddToFav
