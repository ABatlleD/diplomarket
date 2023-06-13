import React, { useRef } from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

function BtnSignIn({values, loading, setLoading}) {
  const { t } = useTranslation()
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter()
  const buttonRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      if (!executeRecaptcha) {
        return toast.error(t('signin.error_recaptcha_fail'));
      }
      const gReCaptchaToken = await executeRecaptcha("enquiryFormSubmit");
      const res = await signIn('credentials', { 
        redirect: false, 
        username: values.username,
        password: values.password,
        recaptcha: gReCaptchaToken,
      }).then((res) => {
        setLoading(false)
        return res
      })
      if (res.error === '403') {
        return toast.error(t('signin.no_active_error'))
      } else if (res.error === '404') {
        return toast.error(t('signin.no_exist_error'))
      } else if (res.error === 'error_recaptcha_fail') {
        return toast.error(t('signin.error_recaptcha_fail'))
      } else if (res.error === 'error_recaptcha_form') {
        return toast.error(t('signin.error_recaptcha_form'))
      } else if (res.error) {
        return toast.error(t('signin.login_error'))
      }
      toast.success(t('signin.login_success'))
      setTimeout(() => {
        router.push('/')
      }, 500)
    }
  }
  return (
    <>
      <div className={`Submit mb-4 w-11/12 md:w-1/3 xl:w-1/4 ${!loading && 'bg-footer-background-100 text-background-100'}`}>
        <Button
          ref={buttonRef}
          disabled={loading}
          variant="contained"
          sx={{
            width: '100%',
            '&:hover': {
              backgroundColor: '#111b2c'
            }
          }}
          onClick={handleSubmit}
        >
          <div className='flex flex-row'>{loading && <HourglassEmptyIcon fontSize='small' />} <div className='flex mt-[0.05rem]'>{t('auth.signin.submit')}</div></div>
        </Button>
      </div>
    </>
  )
}

export default BtnSignIn
