import React from 'react'
import MainLayout from '../../layouts/MainLayout.jsx'
import AccountLayout from '../../layouts/AccountLayout.jsx'

function Settings() {
  return (
    <>Settings</>
  )
}

Settings.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AccountLayout>
        {page}
      </AccountLayout>
    </MainLayout>
  )
}

export default Settings
