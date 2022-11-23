import React, { useState } from 'react'
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

function SignIn() {
  const { t } = useTranslation()
  const router = useRouter()

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
    const res = await signIn('credentials', { redirect: false, username: values.username, password: values.password })
    console.log('🚀 ~ file: signin.jsx ~ line 43 ~ handleSubmit ~ values', values)
    console.log('🚀 ~ file: signin.jsx ~ line 43 ~ handleSubmit ~ res', res)
    if (res.error === '403') {
      return toast.error(t('no_active_error'))
    } else if (res.error === '404') {
      return toast.error(t('no_exist_error'))
    } else if (res.error === 'error_recaptcha_fail') {
      return toast.error(t('error_recaptcha_fail'))
    } else if (res.error === 'error_recaptcha_form') {
      return toast.error(t('error_recaptcha_form'))
    } else if (res.error) {
      return toast.error(t('login_error'))
    }
    toast.success(t('login_success'))
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
  return (
    <>
      <AppHeader title={t('pages.signin')} />
      <ToastContainer />
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className="Img mb-4">
          <img src="/logo.png" className="max-w-max h-20 md:h-24 hover:cursor-pointer" alt="..." />
        </div>
        <div className="Email mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-required"
            label="Email"
            sx={{
              width: '100%',
              borderColor: 'red'
            }}
            value={values.username}
            onChange={handleChange('username')}
          />
        </div>
        <div className="Password mb-4 w-11/12 md:w-1/3">
          <TextField
            required
            id="outlined-password-input"
            label="Password"
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
        <div className="Submit mb-4 w-11/12 md:w-1/3">
          <Button
            variant="contained"
            sx={{
              width: '100%',
              backgroundColor: '#15224b !important'
            }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </div>
        <div className="Links flex flex-row justify-between w-11/12 md:w-1/3">
          <Link href={'/'}>
            <p className='text-footer-background-100 font-bold underline hover:cursor-pointer hover:text-footer-background-200'>Go back</p>
          </Link>
          <div className='flex flex-col'>
            <Link href={'/auth/signup'}>
              <p className='text-footer-background-100 font-bold underline hover:cursor-pointer hover:text-footer-background-200'>Don&apos;t have an account?</p>
            </Link>
            <Link href={'/backend/password_reset'}>
              <p className='text-footer-background-100 font-bold underline hover:cursor-pointer hover:text-footer-background-200'>Forgot your password?</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
