import React from 'react'
import MainLayout from '../../layouts/MainLayout.jsx'
import AccountLayout from '../../layouts/AccountLayout.jsx'

function Recipients() {
  return (
    <div className='flex flex-col items-center border rounded-3xl p-8'>
      <p className='font-bold text-footer-background-200 text-4xl my-32'>RECIPIENTS VIEW</p>
    </div>
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
