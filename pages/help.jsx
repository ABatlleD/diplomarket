import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import resources from '../restapi/resources'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(() => import('../layouts/MainLayout'))
const AppHeader = dynamic(() => import('../components/layouts/AppHeader'))
const AppAccordion = dynamic(() => import('../components/AppAccordion'))

function Help({ faq, help, fetchError }) {
  const { t, i18n } = useTranslation()
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
          className='w-5/12 text-center border py-2 rounded-xl hover:cursor-pointer text-footer-background-300 text-lg hover:shadow-lg'
          onClick={() => { handleChangeView('faq') }}
        >
          {t('help.questionTitle')}
        </div>
        <div
          className='w-5/12 text-center border py-2 rounded-xl hover:cursor-pointer text-footer-background-300 text-lg hover:shadow-lg'
          onClick={() => { handleChangeView('how') }}
        >
          {t('help.how.title')}
        </div>
      </div>
      {view === 'faq' &&
        faq.results.map((question) => (
          <AppAccordion
            key={question.id}
            title={i18n.language === 'es' ? question.pregunta : question.pregunta_ingles}
            text={i18n.language === 'es' ? question.respuesta : question.respuesta_ingles}
          />
        ))
      }
      {view === 'how' &&
        <div className='w-full text-center text-footer-background-300 text-[7rem]'>HOW TO USE VIEW</div>
      }
     </div>
    </>
  )
}

export async function getServerSideProps() {
  const { faq, help, fetchError } = await fetchData()

  return {
    props: {
      faq,
      help,
      fetchError
    }
  }
}

async function fetchData() {
  let fetchError = ''
  let faq = []
  let help = []
  try {
    faq = await (await resources.faq.all()).data
    help = await (await resources.help.all()).data
  } catch (error) {
    fetchError = error.message
  }
  return { faq, help, fetchError }
}

Help.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Help
