import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import AppHeader from '../../components/layouts/AppHeader'
import { useTranslation } from 'react-i18next'
import resources from '../../restapi/resources'
import ListProviders from '../../components/providers/ListProviders'

function AllProviders({ providers }) {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.providers')} />
      <div className="flex justify-center my-14">
        <div className="flex w-[95] md:w-3/4">
          <ListProviders providers={providers} />
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ req, res }, context) {
  const { providers, providersError } = await fetchProviders()

  return {
    props: {
      providers,
      providersError,
    },
    revalidate: 10,
  }
}

async function fetchProviders() {
  let providersError = ''
  let providers = []
  try {
    providers = await (await resources.suppliers.all()).data
  } catch (error) {
    providersError = error.message
  }
  return { providers, providersError }
}

AllProviders.getLayout = function getLayout(page) {
  return <MainLayout pageProps={page}>{page}</MainLayout>
}

export default AllProviders
