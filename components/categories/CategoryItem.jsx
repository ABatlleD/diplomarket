import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import useWindowSize from '../../hooks/WindowSize'

function CategoryItem({ category }) {
  const size = useWindowSize()
  const resizeTitle = (string, maxLength) => {
    return string.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  return (
    <>
      <div className='w-full relative flex flex-row justify-center rounded-2xl h-40 md:h-44 xl:h-96'>
        <Link href={`/categorys/${category.id}`}>
          <Image
            src={`http://127.0.0.1:8000${category.imagen}`}
            width={size.width < 768 ? 350 : 400}
            height={40}
            placeholder='blur'
            blurDataURL='/loading.gif'
            className='hover:cursor-pointer'
          />
        </Link>
        <Link href={`/categorys/${category.id}`}>
          <div className='absolute hover:cursor-pointer w-full h-full flex flex-row justify-center items-center font-bold text-xl md:text-2xl bg-background-100 bg-opacity-60 text-footer-background-200 top-0 left-0'>
            {resizeTitle(category.nombre, 20)}
          </div>
        </Link>
      </div>
    </>
  )
}

CategoryItem.propTypes = {
  category: PropTypes.object
}

export default CategoryItem
