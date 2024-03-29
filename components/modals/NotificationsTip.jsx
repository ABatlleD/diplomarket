import React, { useState } from 'react'
import { Modal, Fade, TextField } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from 'next/router'
import localFont from '@next/font/local'

const arial = localFont({ src: '../../public/assets/font/arial/Arial.ttf' })

function NotificationsTip({
  openNotificationsTip = false,
  setOpenNotificationsTip = () => {},
}) {
  const { data } = useSession()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      const activeAccount = {
        id: data?.id,
        email: data?.user?.email,
        name: data.user.name,
        ...data,
        rss: true,
      }
      try {
        await axios
          .post('/api/details', {
            account: [activeAccount],
          })
          .then((res) => {
            toast.info(res.data.message)
            Router.push('/auth/signin')
            setLoading(false)
          })
      } catch (error) {
        setLoading(false)
        toast.error('Contacte al administrador')
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openNotificationsTip}
        onClose={() => setOpenNotificationsTip(false)}
        closeAfterTransition
        sx={{ overflowY: 'scroll' }}
      >
        <Fade in={openNotificationsTip}>
          <main className={arial.className}>
            <div className="flex z-50 flex-row space-x-2 rounded-xl shadow-2xl bg-background-100 w-11/12 md:4/5 xl:w-2/5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <div className="sm:flex flex-row hidden overflow-hidden items-center justify-center shadow-lg w-1/3">
                <div className="Img mb-4">
                  <img
                    src="/favicon.png"
                    className="max-w-max h-20 md:h-36 hover:cursor-pointer"
                    alt="..."
                  />
                </div>
              </div>
              <div className="flex flex-col md:w-[65%] ml-2 mr-2">
                <div className="flex flex-row justify-between mb-6">
                  <div className="font-bold text-footer-background-300 text-lg ml-2">
                    {t('notifications-tip.title')}
                  </div>
                  <HighlightOffIcon
                    className="hover:cursor-pointer text-footer-background-300"
                    onClick={() => setOpenNotificationsTip(false)}
                  />
                </div>
                <div className="flex ml-2 mb-4 mr-4">
                  <p className="text-justify text-lg text-footer-background-300">
                    {t('notifications-tip.subtitle')}
                  </p>
                </div>
                <div className=" mx-2 mb-4">
                  <TextField
                    id="outlined-basic"
                    defaultValue={data?.user?.email}
                    fullWidth
                    label="Email"
                    disabled
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="flex flex-row justify-center mb-4">
                  <div
                    onClick={handleSubmit}
                    className={`${
                      loading
                        ? 'text-text-100 bg-background-300 hover:cursor-not-allowed'
                        : 'bg-footer-background-300 text-background-100 hover:cursor-pointer'
                    } text-center py-1 px-3 rounded-md text-lg`}
                  >
                    {t('notifications-tip.activate')}
                  </div>
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
