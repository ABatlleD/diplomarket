import React from 'react'
import AppHeader from '../components/layouts/AppHeader'
import MainLayout from '../layouts/MainLayout'
import { useCompare } from '../store/compare/compare.context'
import { useTranslation } from 'react-i18next'
import CompareItem from '../components/compare/CompareItem'

function Compare() {
  const { items } = useCompare()

  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.compare')}/>
      <div className='flex flex-row justify-center w-full font-bold text-2xl my-4'>Comparar Productos</div>
      <div className='flex flex-row mx-5 mb-5'>
        {items.map((item) => (
          <div key={item.id} className='flex w-1/5'>
            <CompareItem id={item.id} />
          </div>
        ))}
      </div>
    </>
  )
}

Compare.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      {page}
    </MainLayout>
  )
}

export default Compare
