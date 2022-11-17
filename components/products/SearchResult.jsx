import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import useWindowSize from '../../hooks/WindowSize'

function SearchResult({ data }) {
  const size = useWindowSize()
  const { i18n } = useTranslation()

  const resizeTitle = (string, maxLength) => {
    return string.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  return (
    <div className='flex flex-col mx-4 my-2'>
      <Link href={`/products/${data.pk}`}>
        <div className='w-full flex flex-row justify-between hover:cursor-pointer hover:bg-background-300'>
          <div>{resizeTitle(i18n.language === 'es' ? data.nombre : data.nombre_ingles, size.width < 768 ? 15 : 25)}</div>
          <div className='bg-button px-1 text-background-100 rounded-md'>{data.precio} USD</div>
        </div>
      </Link>
    </div>
  )
}

SearchResult.propTypes = {
  data: PropTypes.any
}

export default SearchResult
