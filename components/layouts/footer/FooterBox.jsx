import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'
import InstagramIcon from '@mui/icons-material/Instagram'
import { useTranslation } from 'react-i18next'

function FooterBox() {
  const { t } = useTranslation()

  return (
    <div className='bg-footer-background-100 flex flex-col md:flex-row justify-around py-8 px-3'>
      <div className='flex flex-col md:w-3/12 mb-10 md:mb-0'>
        <img src="/logo.png" className="max-w-max h-20 rounded-md mb-4" alt="..." />
        <p className='text-text-200 text-justify italic font-semibold'>
          {t('footer.description')}
        </p>
        <div className='flex flex-row justify-between text-background-100 w-1/2 mt-4'>
          <FacebookIcon fontSize='large' />
          <TelegramIcon fontSize='large' />
          <TwitterIcon fontSize='large' />
          <InstagramIcon fontSize='large' />
        </div>
      </div>
      <div className='flex flex-row justify-between md:w-4/12'>
        <div className='flex flex-col md:w-5/12 text-text-200 font-semibold mb-6'>
          <h2 className='mb-3 font-bold text-background-100'>{t('footer.about.title')}</h2>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>{t('footer.about.aboutUs')}</p>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>{t('footer.about.privacyPolicy')}</p>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>{t('footer.about.terms')}</p>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>{t('footer.about.contact')}</p>
          <p className='transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>{t('footer.about.help')}</p>
        </div>
        <div className='flex flex-col md:w-5/12 text-text-200 font-semibold mb-6'>
          <h2 className='mb-3 font-bold text-background-100'>{t('footer.account.title')}</h2>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>{t('footer.account.signOut')}</p>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>{t('footer.account.cart')}</p>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>{t('footer.account.wishes')}</p>
          <p className='transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>{t('footer.account.orders')}</p>
        </div>
      </div>
      <div className='flex flex-col md:w-3/12 text-background-100'>
        <h2 className='mb-4 font-semibold'>{t('footer.app')}</h2>
        <img src="/assets/google-play.png" className="max-w-max h-14 rounded-md mb-2" alt="..." />
        <div className='flex flex-row justify-between w-2/3 mt-4'>
          <img src="/assets/payment/paypal/type-paypal.png" className="max-w-max h-14 rounded-md mb-2" alt="..." />
          <img src="/assets/payment/zelle/type-zelle.png" className="max-w-max h-14 rounded-md mb-2" alt="..." />
          <img src="/assets/payment/tropipay/type-tropipay.png" className="max-w-max h-14 rounded-md mb-2" alt="..." />
        </div>
      </div>
    </div>
  )
}

export default FooterBox
