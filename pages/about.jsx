import React from 'react'
import { useTranslation } from 'react-i18next'
import MainLayout from '../layouts/MainLayout'
import AppHeader from '../components/layouts/AppHeader'

function About() {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.about')} />
      <div className='flex flex-col mt-8 mb-8 xl:mb-24 mx-4 lg:mx-40 2xl:mb-96'>
        <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('about.title')}</h1>
        <p className='text-xl text-justify'>{t('about.text')}</p>
      </div>
    </>
  )
}

About.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default About
