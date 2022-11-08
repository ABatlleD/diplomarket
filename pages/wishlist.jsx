import React, { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import FavList from '../components/fav/FavList'
import { useFav } from '../store/fav/fav.context'
import { useTranslation } from 'react-i18next'

function Wishlist() {
  const { items } = useFav()
  const [loading] = useState(false)
  const { t } = useTranslation()

  return (
    <div className='flex flex-col items-center my-10'>
      <div className='flex mb-4 flex-row justify-center'>
        <div className='font-bold text-2xl md:text-3xl'>{t('wishlist.title')}</div>
      </div>
      <FavList products={items} loading={loading} />
    </div>
  )
}

Wishlist.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      {page}
    </MainLayout>
  )
}

export default Wishlist
