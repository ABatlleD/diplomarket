import React from 'react'
import { useTranslation } from 'react-i18next'

function BrandBar() {
  const { t } = useTranslation()

  return (
    <div className='flex flex-row px-2 justify-center text-center items-center bg-footer-background-200 text-background-100 font-semibold h-16 shadow-top'>
      {t('footer.bottom')}
    </div>
  )
}

export default BrandBar
