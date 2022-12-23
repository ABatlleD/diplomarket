import React from 'react'
import { Modal, Fade, TextField } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Josefin_Sans } from '@next/font/google'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

const js = Josefin_Sans({
  weight: '400',
  subsets: ['latin']
})

function NotificationsTip({ openNotificationsTip = false, setOpenNotificationsTip = () => {} }) {
  const { data } = useSession()
  const { t } = useTranslation()

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openNotificationsTip}
        onClose={() => setOpenNotificationsTip(false)}
        closeAfterTransition
        sx={{ overflowY: 'scroll' }}
      >
        <Fade in={openNotificationsTip}>
          <main className={js.className}>
            <div className='flex z-50 flex-row space-x-2 rounded-xl shadow-2xl bg-background-100 w-full md:4/5 xl:w-1/3 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
              <div className='flex flex-row items-center justify-center shadow-lg w-1/3'>
                <div className="Img mb-4">
                  <img src="/favicon.png" className="max-w-max h-20 md:h-36 hover:cursor-pointer" alt="..." />
                </div>
              </div>
              <div className='flex flex-col w-[65%] my-2 mr-2'>
                <div className='flex flex-row justify-between mb-6'>
                  <div className='font-bold text-footer-background-300 text-lg ml-2'>{t('notifications-tip.title')}</div>
                  <HighlightOffIcon className='hover:cursor-pointer text-footer-background-300' onClick={() => setOpenNotificationsTip(false)} />
                </div>
                <div className='flex mx-2 mb-4'>
                  <p className='text-justify text-lg text-footer-background-300'>
                  {t('notifications-tip.subtitle')}
                  </p>
                </div>
                <div className=' mx-2 mb-4'>
                  <TextField id="outlined-basic" defaultValue={data?.user?.email} fullWidth label="Email" disabled variant="outlined" size='small' />
                </div>
                <div className='flex flex-row justify-center mb-4'>
                  <div className='bg-footer-background-100 text-center py-1 px-3 rounded-md text-lg text-background-100'>{t('notifications-tip.activate')}</div>
                </div>
              </div>
            </div>
          </main>
        </Fade>
      </Modal>
    </>
  )
}

export default NotificationsTip
