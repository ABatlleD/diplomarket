import React from 'react'
import { useTranslation } from 'react-i18next'
import MainLayout from '../layouts/MainLayout'
import AppHeader from '../components/layouts/AppHeader'
import Link from 'next/link'

function Privacy() {
  const { t } = useTranslation()

  return (
    <>
     <AppHeader title={t('pages.privacy')}/>
     <div className='flex flex-col my-8 mx-4 lg:mx-40'>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('privacy.sections.1.title')}</h1>
          <p className='text-xl text-justify'><span>{t('privacy.sections.1.text.1')} </span> <Link href='/'><span className='underline hover:cursor-pointer font-bold italic'>diplomarket.com</span></Link> <span> {t('privacy.sections.1.text.2')}</span></p>
        </div>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('privacy.sections.2.title')}</h1>
          <p className='text-xl text-justify'>{t('privacy.sections.2.text')}</p>
        </div>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('privacy.sections.3.title')}</h1>
          <p className='text-xl text-justify'>{t('privacy.sections.3.text')}</p>
        </div>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('privacy.sections.4.title')}</h1>
          <p className='text-xl text-justify'>{t('privacy.sections.4.text')}</p>
        </div>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('privacy.sections.5.title')}</h1>
          <p className='text-xl text-justify'>{t('privacy.sections.5.text')}</p>
        </div>
      </div>
    </>
  )
}

Privacy.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Privacy
