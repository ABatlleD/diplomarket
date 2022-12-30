import React, { useRef, useState } from 'react'
import { TextField, Button, InputAdornment, IconButton } from '@mui/material'
import Link from 'next/link'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AppHeader from '../../components/layouts/AppHeader'
import { useTranslation } from 'react-i18next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
const googleSiteKey = process.env.NEXT_PUBLIC_CLIENT_RECAPTCHA

function SignIn() {
  const { t } = useTranslation()
  const router = useRouter()
  const buttonRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    username: '',
    confirmPassword: '',
    password: '',
    showConfirmPassword: false,
    showPassword: false
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      const res = await signIn('credentials', { redirect: false, username: values.username, password: values.password })
        .then((res) => {
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
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }
  return (
    <>
      <AppHeader title={t('pages.signin')} />
      <GoogleReCaptchaProvider
        reCaptchaKey={googleSiteKey}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined
        }}
      >
        <ToastContainer />
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className="Img mb-4">
            <img src="/logo.png" className="max-w-max h-20 md:h-24 hover:cursor-pointer" alt="..." />
          </div>
          <div className="Email mb-4 w-11/12 md:w-1/3 xl:w-1/4">
            <TextField
              required
              id="outlined-required"
              label={t('auth.signin.email')}
              sx={{
                width: '100%',
                borderColor: 'red'
              }}
              value={values.username}
              onChange={handleChange('username')}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="Password mb-4 w-11/12 md:w-1/3 xl:w-1/4">
            <TextField
              required
              id="outlined-password-input"
              label={t('auth.signin.password')}
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              onKeyDown={handleKeyPress}
              autoComplete="current-password"
              InputProps={{
                endAdornment: <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
              }}
              sx={{
                width: '100%'
              }}
            />
          </div>
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
          <div className="Links flex flex-row justify-between w-11/12 md:w-1/3 xl:w-1/4">
            <Link href={'/'}>
              <p className='text-footer-background-100 font-bold underline hover:cursor-pointer hover:text-footer-background-200'>{t('auth.signin.back')}</p>
            </Link>
            <div className='flex flex-col'>
              <Link href={'/auth/signup'}>
                <p className='text-footer-background-100 font-bold underline hover:cursor-pointer hover:text-footer-background-200'>{t('auth.signin.register')}</p>
              </Link>
              <Link href={'/backend/password_reset'}>
                <p className='text-footer-background-100 font-bold underline hover:cursor-pointer hover:text-footer-background-200'>{t('auth.signin.forgot')}</p>
              </Link>
            </div>
          </div>
        </div>
      </GoogleReCaptchaProvider>
    </>
  )
}

export default SignIn
