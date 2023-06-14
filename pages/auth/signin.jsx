import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import Link from 'next/link'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import dynamic from 'next/dynamic'
import BtnSignIn from './BtnSignIn'

const AppHeader = dynamic(() => import('../../components/layouts/AppHeader'))

const googleSiteKey = process.env.NEXT_PUBLIC_CLIENT_RECAPTCHA

function SignIn() {
  const { t } = useTranslation()
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
          <BtnSignIn loading={loading} setLoading={setLoading} values={values} />
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
