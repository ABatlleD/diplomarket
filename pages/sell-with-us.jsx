import React from 'react'
import { useTranslation } from 'react-i18next'
import MainLayout from '../layouts/MainLayout'
import AppHeader from '../components/layouts/AppHeader'

function Contact() {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.sell-with-us')} />
      <div className='w-full flex flex-row justify-center my-8'>
        <div
          className='flex flex-col items-center p-4 rounded-lg shadow-md'
        >
          <div></div>
        </div>
      </div>
    </>
  )
}

Contact.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Contact
