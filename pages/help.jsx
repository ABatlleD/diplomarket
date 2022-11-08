import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MainLayout from '../layouts/MainLayout'
import AppHeader from '../components/layouts/AppHeader'
import AppAccordion from '../components/AppAccordion'
import resources from '../restapi/resources'
import PropTypes from 'prop-types'

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
        faq.results.map((question) => (
          <AppAccordion
            key={question.id}
            title={i18n.language === 'es' ? question.pregunta : question.pregunta_ingles}
            text={i18n.language === 'es' ? question.respuesta : question.respuesta_ingles}
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

Help.propTypes = {
  faq: PropTypes.object,
  help: PropTypes.object,
  fetchError: PropTypes.string
}

Help.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Help
