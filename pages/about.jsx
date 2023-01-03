import React from 'react'
import { useTranslation } from 'react-i18next'
import { Josefin_Sans } from '@next/font/google'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(() => import('../layouts/MainLayout'))
const AppHeader = dynamic(() => import('../components/layouts/AppHeader'))

const js = Josefin_Sans({
  weight: '400',
  subsets: ['latin']
})

function About() {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.about')} />
      <main className={js.className}>
        <div className='flex flex-col mt-8 mb-8 xl:mb-24 mx-4 xl:mx-44 2xl:mb-96'>
          <h1 className='font-bold text-[2rem] text-footer-background-300 mb-4'>{t('about.title')}</h1>
          <p className='text-xl text-justify text-footer-background-300'>{t('about.text')}</p>
        </div>
      </main>
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
