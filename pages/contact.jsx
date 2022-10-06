import React from 'react'
import { useTranslation } from 'react-i18next'
import MainLayout from '../layouts/MainLayout'
import AppHeader from '../components/layouts/AppHeader'

function Contact() {
  const { t } = useTranslation()

  return (
    <>
     <AppHeader title={t('pages.contact')}/>
     <div className='flex flex-col my-8 mx-4 lg:mx-40'></div>
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
