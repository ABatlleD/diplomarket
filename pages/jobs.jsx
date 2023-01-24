import React from 'react'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/layouts/AppHeader'
import MainLayout from '../layouts/MainLayout'
import resources from '../restapi/resources'

function Jobs({ jobs }) {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.jobs')} />
      <div className="flex justify-center w-full my-3">
        <div className="flex flex-col justify-center w-[95%] xl:w-3/4">
          <h1 className="text-center text-lg md:text-2xl font-bold text-footer-background-300 mb-3">
            {t('pages.jobs')}
          </h1>
          {jobs?.results?.map((element) => (
            <div
              key={element.titulo}
              className="flex flex-col space-y-1 w-full mb-8 border-footer-background-100 text-footer-background-300 p-4 border rounded-md shadow-lg"
            >
              <div className="md:text-lg font-bold">{element.titulo}</div>
              <div className="text-justify text-sm md:text-base">
                {element.descripcion}
              </div>
              <a
                rel="noreferrer"
                href={element.link}
                target="_blank"
                className="text-text-blue underline md:text-base text-sm"
              >
                Click aquí...
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const { jobs, fetchError } = await fetchData()

  return {
    props: {
      jobs,
      fetchError,
    },
  }
}

async function fetchData() {
  let fetchError = ''
  let jobs = []
  try {
    jobs = await (await resources.job.all()).data
  } catch (error) {
    fetchError = error.message
  }
  return { jobs, fetchError }
}

Jobs.getLayout = function getLayout(page) {
  return <MainLayout pageProps={page}>{page}</MainLayout>
}

export default Jobs
