import React, { useEffect, useState } from 'react'
import { TextField, Checkbox, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSession, signOut } from 'next-auth/react'
import resources from '../../restapi/resources.js'
import { useRouter } from 'next/router'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(() => import('../../layouts/MainLayout'))
const AccountLayout = dynamic(() => import('../../layouts/AccountLayout'))
const AppHeader = dynamic(() => import('../../components/layouts/AppHeader'))

function Details() {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [id, setId] = useState(0)
  const [isu, setIsu] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [rss, setRss] = useState('')
  const [loading, setLoading] = useState(false)

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
  }

  useEffect(() => {
    if (session?.user?.email)
      resources.users.get(session?.user?.email)
        .then((res) => {
          setId(res?.id)
          setIsu(res?.is_superuser)
          setEmail(res?.email)
          setName(res?.name)
          setAddress(res?.direccion)
          setPhone(res?.telefono)
          setCountry(res?.pais)
          setState(res?.estado)
          setCity(res?.ciudad)
          setZip(res?.codigo_postal)
          setRss(res?.rss)
        })
  }, [session])

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      if (
        email === '' ||
        name === '' ||
        address === '' ||
        city === '' ||
        state === '' ||
        zip === '' ||
        phone === ''
      ) {
        return toast.error('Rellene todos los campos')
      }
      const activeAccount = {
        id,
        email,
        name,
        is_superuser: isu,
        direccion: address,
        pais: country,
        ciudad: city,
        estado: state,
        codigo_postal: zip,
        telefono: phone,
        rss
      }
      try {
        await axios.post('/api/details', {
          account: [activeAccount]
        }).then((res) => {
          toast.info(res.data.message)
          signOut()
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
      <AppHeader title={t('pages.details')} />
      <ToastContainer />
      <div className='flex flex-col border items-center rounded-3xl'>
        <p className='font-bold text-footer-background-200 text-2xl my-4'>{t('profile.details.title')}</p>
        <div className='flex flex-col md:flex-row w-11/12 mb-4'>
          <div className='md:w-10/12 md:mr-2 mb-4 md:mb-0'>
            <TextField
              id="standard-basic"
              label={t('profile.details.fullname')}
              variant="standard"
              value={name}
              sx={{
                width: '100%'
              }}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-col md:w-10/12 md:ml-2'>
            <div className='font-bold'>{t('profile.details.email')}:</div>
            <div>{ email }</div>
          </div>
        </div>
        <div className='w-11/12 mb-8'>
          <TextField
            id="standard-textarea"
            label={t('profile.details.address').concat('*')}
            multiline
            variant="standard"
            value={address}
            sx={{
              width: '100%'
            }}
          />
        </div>
        <div className='flex flex-col md:flex-row w-11/12 mb-4'>
          <div className='md:w-10/12 md:mr-2 mb-4 md:mb-0'>
            <PhoneInput
              country={'us'}
              specialLabel={`${t('profile.details.phone')}`}
              value={phone ?? '1'}
              inputStyle={{ width: '100%', height: '100%' }}
              onChange={(value) => setPhone(value)}
            />
          </div>
          <div className='md:w-10/12 md:ml-2'>
          <TextField
            required
            id="countries"
            name="pais"
            label={t('profile.details.country')}
            value={country ?? ''}
            fullWidth
            autoComplete="shipping countries"
            onChange={(e) => setCountry(e.target.value)}
          />
          </div>
        </div>
        <div className='flex flex-col md:flex-row w-11/12 mb-4'>
          <div className='md:w-10/12 md:mr-2 mb-4 md:mb-0'>
            <TextField
              id="standard-basic"
              label={t('profile.details.state')}
              variant="standard"
              value={state}
              sx={{
                width: '100%'
              }}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className='md:w-10/12 md:ml-2'>
            <TextField
              id="standard-basic"
              label={t('profile.details.city')}
              variant="standard"
              value={city}
              sx={{
                width: '100%'
              }}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-row w-11/12 md:mb-12 mb-4'>
          <div className='w-full md:w-[49%] md:mr-2'>
            <TextField
              id="standard-basic"
              label={t('profile.details.zip')}
              variant="standard"
              value={zip}
              sx={{
                width: '100%'
              }}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-end w-11/12 mb-8'>
          <div className='w-10/12 mr-2 flex flex-row mb-4 md:mb-0'>
            <Checkbox label='' checked={rss} value={!rss} onChange={() => setRss(!rss)} />
            <p className='text-justify text-footer-background-100 font-semibold text-sm md:text-base ml-1 md:mt-2 mt-[0.7rem]'>
            {t('profile.details.rss')}
            </p>
          </div>
          <div className='flex flex-row md:justify-end w-10/12 ml-2'>
              <Button
                disabled={loading}
                variant="contained"
                sx={loading
                  ? {
                      height: '2.1rem'
                    }
                  : {
                      height: '2.1rem',
                      color: '#ffffff',
                      backgroundColor: '#111b2c !important'
                    }
                }
                onClick={handleSubmit}
              >
                {t('profile.details.submit')}
              </Button>
          </div>
        </div>
      </div>
    </>
  )
}

Details.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      <AccountLayout option={1}>
        {page}
      </AccountLayout>
    </MainLayout>
  )
}

export default Details
