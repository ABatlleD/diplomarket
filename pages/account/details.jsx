import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout.jsx'
import AccountLayout from '../../layouts/AccountLayout.jsx'
import { TextField, Checkbox, Button } from '@mui/material'
import AppHeader from '../../components/layouts/AppHeader.jsx'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import resources from '../../restapi/resources.js'
import { useRouter } from 'next/router'

function Details() {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [rss, setRss] = useState('')

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
  }

  useEffect(() => {
    resources.users.get(session?.user?.email)
      .then((res) => {
        console.log('🚀 ~ file: details.jsx ~ line 25 ~ .then ~ res', res)
        setEmail(res?.email)
        setName(res?.name)
        setAddress(res?.direccion)
        setState(res?.estado)
        setCity(res?.ciudad)
        setZip(res?.codigo_postal)
        setRss(res?.rss)
      })
  }, [session])

  return (
    <>
      <AppHeader title={t('pages.details')} />
      <div className='flex flex-col border items-center rounded-3xl'>
        <p className='font-bold text-footer-background-200 text-2xl my-4'>Editar mis datos</p>
        <div className='flex flex-row w-11/12 mb-4'>
          <div className='w-10/12 mr-2'>
            <TextField
              id="standard-basic"
              label="Nombre y Apellidos"
              variant="standard"
              value={name}
              sx={{
                width: '100%'
              }}
            />
          </div>
          <div className='flex flex-col w-10/12 ml-2'>
            <div className='font-bold'>Email:</div>
            <div>{ email }</div>
          </div>
        </div>
        <div className='w-11/12 mb-8'>
          <TextField
            id="standard-textarea"
            label="Dirección*"
            multiline
            variant="standard"
            value={address}
            sx={{
              width: '100%'
            }}
          />
        </div>
        <div className='flex flex-row w-11/12 mb-4'>
          <div className='w-10/12 mr-2'>
            <TextField
              required
              id="outlined-required"
              label="Phone"
              sx={{
                width: '100%',
                borderColor: 'red'
              }}
            />
          </div>
          <div className='w-10/12 ml-2'>
            <TextField
              required
              id="outlined-required"
              label="Country"
              sx={{
                width: '100%',
                borderColor: 'red'
              }}
            />
          </div>
        </div>
        <div className='flex flex-row w-11/12 mb-4'>
          <div className='w-10/12 mr-2'>
            <TextField
              id="standard-basic"
              label="Estado"
              variant="standard"
              value={state}
              sx={{
                width: '100%'
              }}
            />
          </div>
          <div className='w-10/12 ml-2'>
            <TextField
              id="standard-basic"
              label="Ciudad"
              variant="standard"
              value={city}
              sx={{
                width: '100%'
              }}
            />
          </div>
        </div>
        <div className='flex flex-row w-11/12 mb-12'>
          <div className='w-[49%] mr-2'>
            <TextField
              id="standard-basic"
              label="Código Postal"
              variant="standard"
              value={zip}
              sx={{
                width: '100%'
              }}
            />
          </div>
        </div>
        <div className='flex flex-row justify-end w-11/12 mb-8'>
          <div className='w-10/12 mr-2 flex flex-row'>
            <Checkbox label='' checked={rss} value={!rss} />
            <p className='text-justify text-footer-background-100 font-semibold ml-1 mt-2'>
              Recibir notificaciones de la tienda.
            </p>
          </div>
          <div className='flex flex-row justify-end w-10/12 ml-2'>
            <Button
              variant="contained"
              sx={{
                width: '50%',
                backgroundColor: '#15224b !important'
              }}
            >
              Guardar Cambios
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
