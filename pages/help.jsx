import React from 'react'
import { useTranslation } from 'react-i18next'
import MainLayout from '../layouts/MainLayout'
import AppHeader from '../components/layouts/AppHeader'

function Help() {
  const { t } = useTranslation()

  return (
    <>
     <AppHeader title={t('pages.help')}/>
     <div className='flex flex-col my-8 mx-4 lg:mx-40'></div>
    </>
  )
}

Help.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Help
