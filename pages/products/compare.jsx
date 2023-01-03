import React from 'react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(() => import('../../layouts/MainLayout'))
const AppHeader = dynamic(() => import('../../components/layouts/AppHeader'))

function Compare() {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.compare')} />
      <div className='flex flex-col items-center mt-44 mb-44'>
        <p className='font-bold text-footer-background-200 text-4xl'>COMPARE PRODUCTS VIEW</p>
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
