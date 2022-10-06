import React from 'react'
import { useTranslation } from 'react-i18next'
import MainLayout from '../layouts/MainLayout'
import AppHeader from '../components/layouts/AppHeader'
import Link from 'next/link'

function Terms() {
  const { t } = useTranslation()

  return (
    <>
     <AppHeader title={t('pages.terms')}/>
     <div className='flex flex-col my-8 mx-4 lg:mx-40'>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('terms.sections.1.title')}</h1>
          <p className='text-xl text-justify'>{t('terms.sections.1.text')}</p>
        </div>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('terms.sections.2.title')}</h1>
          <p className='text-xl text-justify'><span className='font-bold'>DIPLOMARKET </span>{t('terms.sections.2.text.1')}</p>
          <p className='text-xl text-justify'>{t('terms.sections.2.text.2')}</p>
          <p className='text-xl text-justify'>{t('terms.sections.2.text.3')}</p>
          <p className='text-xl text-justify'>{t('terms.sections.2.text.4')}</p>
        </div>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('terms.sections.3.title')}</h1>
          <p className='text-xl text-justify'>{t('terms.sections.3.text.1')}</p>
          <p className='text-xl text-justify mb-4'>{t('terms.sections.3.text.2')}</p>
          <p className='text-xl text-justify'>{t('terms.sections.3.text.3')}</p>
          <p className='text-xl text-justify'>{t('terms.sections.3.text.4')}</p>
        </div>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('terms.sections.4.title')}</h1>
          <p className='text-xl text-justify'>{t('terms.sections.4.text.1')}</p>
          <p className='text-xl text-justify'>{t('terms.sections.4.text.2')}</p>
        </div>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('terms.sections.5.title')}</h1>
          <p className='text-xl text-justify'>{t('terms.sections.5.text')}</p>
        </div>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('terms.sections.6.title')}</h1>
          <p className='text-xl text-justify mb-4'>{t('terms.sections.6.text.1')} <span> <Link href='https://www.state.gov/cuba-restricted-list/list-of-restricted-entities-and-subentities-associated-with-cuba-effective-january-8-2021/'><span className='font-bold underline italic hover:cursor-pointer'>{t('terms.sections.6.text.2')}</span></Link></span></p>
          <p className='text-xl text-justify mb-4'>{t('terms.sections.6.text.3')}</p>
          <p className='text-xl text-justify mb-4'>{t('terms.sections.6.text.4')}</p>
        </div>
        <div className='flex flex-col mb-8'>
          <h1 className='font-bold text-[2rem] text-footer-background-200 mb-4'>{t('terms.sections.7.title')}</h1>
          <p className='text-xl text-justify'><span>{t('terms.sections.7.text.1')} </span><Link href='/'><span className='underline hover:cursor-pointer font-bold italic'>diplomarket.com</span></Link><span> {t('terms.sections.7.text.2')}</span></p>
        </div>
      </div>
    </>
  )
}

Terms.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Terms
