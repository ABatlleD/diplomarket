import React from 'react'
import AppHeader from '../components/layouts/AppHeader'
import MainLayout from '../layouts/MainLayout'
import { useTranslation } from 'react-i18next'

function Compare() {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.compare')}/>
      <div className='font-bold'>Compare View</div>
    </>
  )
}

Compare.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Compare
