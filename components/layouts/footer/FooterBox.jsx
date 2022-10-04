import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'
import InstagramIcon from '@mui/icons-material/Instagram'

function FooterBox() {
  return (
    <div className='bg-footer-background-100 flex flex-col md:flex-row justify-around py-8 px-3'>
      <div className='flex flex-col md:w-3/12 mb-10 md:mb-0'>
        <img src="/logo.png" className="max-w-max h-20 rounded-md mb-4" alt="..." />
        <p className='text-text-200 text-justify italic font-semibold'>
          Diplomarket is an online store developed by CUSPINERA SURL, in order to satisfy your purchases and deliveries,
          both for you and dearest. We are pleased to bring you the BEST! .... ALWAYS!!!
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
          <h2 className='mb-3 font-bold text-background-100'>ABOUT</h2>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>About Us</p>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>Privacy Policy</p>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>Terms & Conditions</p>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>Contact Us</p>
          <p className='transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>Help</p>
        </div>
        <div className='flex flex-col md:w-5/12 text-text-200 font-semibold mb-6'>
          <h2 className='mb-3 font-bold text-background-100'>MY ACCOUNT</h2>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>Sign In</p>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>View Cart</p>
          <p className='mb-1 transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>My Wish List</p>
          <p className='transition ease-in-out delay-150 hover:text-button hover:translate-x-2 hover:cursor-pointer duration-500'>Track My Orders</p>
        </div>
      </div>
      <div className='flex flex-col md:w-3/12 text-background-100'>
        <h2 className='mb-4 font-semibold'>INSTALL APP</h2>
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
