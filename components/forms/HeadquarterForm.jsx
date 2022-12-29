import React from 'react'
import { useTranslation } from 'react-i18next'

// Alternative Contact

function HeadquarterForm({ recipient }) {
  const { t } = useTranslation()

  return (
    <>
      <h1 className='mb-2 font-bold mt-4'>
        {t('profile.recipients.pickup')}
      </h1>
      <p className='mb-2'>{t('profile.recipients.address')}: {recipient?.direccion}</p>
      <div className='flex flex-row justify-between mb-4' dangerouslySetInnerHTML={{ __html: recipient?.iframe }}/>
    </>
  )
}

export default HeadquarterForm
