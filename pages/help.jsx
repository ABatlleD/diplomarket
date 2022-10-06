import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MainLayout from '../layouts/MainLayout'
import AppHeader from '../components/layouts/AppHeader'
import AppAccordion from '../components/AppAccordion'

function Help() {
  const questions = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  const { t } = useTranslation()
  const [view, setView] = useState('faq')

  const handleChangeView = (option) => {
    if (option !== view) {
      setView(option)
    }
  }

  return (
    <>
     <AppHeader title={t('pages.help')}/>
     <div className='flex flex-col my-8 mx-4 lg:mx-40'>
      <div className='flex flex-row justify-around mb-8'>
        <div
          className='w-5/12 text-center border py-2 rounded-xl hover:cursor-pointer hover:shadow-lg'
          onClick={() => { handleChangeView('faq') }}
        >
          {t('help.questionTitle')}
        </div>
        <div
          className='w-5/12 text-center border py-2 rounded-xl hover:cursor-pointer hover:shadow-lg'
          onClick={() => { handleChangeView('how') }}
        >
          {t('help.how.title')}
        </div>
      </div>
      {view === 'faq' &&
        questions.map((question) => (
          <AppAccordion
            key={question}
            title={t(`help.questions.${question}.question`)}
            text={t(`help.questions.${question}.answer`)}
          />
        ))
      }
      {view === 'how' &&
        <div className='w-full text-center text-[7rem]'>HOW TO USE VIEW</div>
      }
     </div>
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
