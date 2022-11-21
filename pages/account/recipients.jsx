import React from 'react'
import MainLayout from '../../layouts/MainLayout.jsx'
import AccountLayout from '../../layouts/AccountLayout.jsx'
import AppHeader from '../../components/layouts/AppHeader.jsx'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Recipients() {
  const { t } = useTranslation()
  const { status } = useSession()
  const router = useRouter()

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
  }

  return (
    <>
      <AppHeader title={t('pages.recipients')} />
      <div className='flex flex-col items-center border rounded-3xl p-8'>
        <p className='font-bold text-footer-background-200 text-4xl my-32'>RECIPIENTS VIEW</p>
      </div>
    </>
  )
}

Recipients.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      <AccountLayout option={2}>
        {page}
      </AccountLayout>
    </MainLayout>
  )
}

export default Recipients
