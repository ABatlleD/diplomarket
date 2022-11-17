import React from 'react'
import MainLayout from '../../layouts/MainLayout.jsx'
import AccountLayout from '../../layouts/AccountLayout.jsx'
import AppHeader from '../../components/layouts/AppHeader.jsx'
import { useTranslation } from 'react-i18next'

function Orders() {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('pages.orders')} />
      <div className='flex flex-col items-center border rounded-3xl p-8'>
        <p className='font-bold text-footer-background-200 text-4xl my-32'>MY ORDERS VIEW</p>
      </div>
    </>
  )
}

Orders.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      <AccountLayout option={3}>
        {page}
      </AccountLayout>
    </MainLayout>
  )
}

export default Orders
