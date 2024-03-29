import React, { useState } from 'react'
import { InputAdornment, IconButton, TextField, Button } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useTranslation } from 'react-i18next'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(() => import('../../layouts/MainLayout'))
const AccountLayout = dynamic(() => import('../../layouts/AccountLayout'))
const AppHeader = dynamic(() => import('../../components/layouts/AppHeader'))

function Settings() {
  const { t } = useTranslation()
  const { status } = useSession()
  const router = useRouter()

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
  }

  const [values, setValues] = useState({
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

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword
    })
  }

  const handleSubmit = async () => {
    if (!(values.password === '') && !(values.confirmPassword === '')) {
      if (values.password === values.confirmPassword) {
        toast.error('Las contraseñas son iguales')
      } else {
        const saveNewPassword = await axios.post('/api/setting', {
          setting: [values.password, values.confirmPassword]
        })
        toast.info(saveNewPassword.data.message ?? 'Contacte al administrator')
        if (saveNewPassword?.data?.status) {
          setTimeout(() => {
            signOut()
          }, 3000)
        }
      }
    } else {
      toast.error('Llene los dos campos')
    }
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <AppHeader title={t('pages.settings')} />
      <ToastContainer />
      <div className='flex flex-col'>
        <div className='flex flex-col items-center p-4 mb-8 border-2 border-button rounded-3xl'>
          <p className='font-semibold text-button text-2xl md:text-4xl mb-1 md:mb-8'>{t('profile.settings.premium_title')}</p>
          <p className='md:text-xl'>{t('profile.settings.premium_subtitle')}</p>
        </div>
        <div className='flex flex-col border items-center p-4 rounded-3xl'>
          <p className='font-bold text-2xl text-footer-background-200 mb-8'>{t('profile.settings.title')}</p>
          <div className='flex flex-col md:flex-row w-full'>
            <div className="Password md:mr-2 mb-4 w-full md:w-10/12">
              <TextField
                required
                id="outlined-password-input"
                label={t('profile.settings.old')}
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
            <div className="ConfirmPassword mb-4 md:ml-2 w-full md:w-10/12">
              <TextField
                required
                id="outlined-password-input"
                label={t('profile.settings.new')}
                type={values.showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                }}
                sx={{
                  width: '100%'
                }}
              />
            </div>
          </div>
          <div className="Submit w-11/12 md:w-1/3">
            <Button
              variant="contained"
              sx={{
                width: '100%',
                backgroundColor: '#15224b !important'
              }}
              onClick={handleSubmit}
            >
              {t('profile.settings.submit')}
            </Button>
        </div>
        </div>
      </div>
    </>
  )
}

Settings.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AccountLayout option={4}>
        {page}
      </AccountLayout>
    </MainLayout>
  )
}

export default Settings
