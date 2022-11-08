import React from 'react'
import { useTranslation } from 'react-i18next'
import MainLayout from '../layouts/MainLayout'
import AppHeader from '../components/layouts/AppHeader'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { TextField, Button } from '@mui/material'
import resources from '../restapi/resources'
import PropTypes from 'prop-types'

function Contact({ contact, fetchError }) {
  const { t } = useTranslation()

  return (
    <>
     <AppHeader title={t('pages.contact')}/>
     <div className='flex flex-row justify-center text-footer-background-200'>
      <div className='flex flex-row mt-10 mb-20 rounded-3xl w-5/6 p-8 bg-background-300 shadow-2xl'>
        <div className='flex flex-col w-1/2 mr-4'>
          <p className='text-3xl font-semibold mb-4'>Contáctenos</p>
          <p className='text-justify mb-2'>
            Debido al alto volumen de clientes que nos
            contactan y porque deseamos escribirle en tiempo real,
            preferimos que nos escriba a los teléfonos siguientes y
            según la categoría del tema por el que nos contacta:
          </p>
          <p className='font-semibold text-xl mb-1'>Teléfonos:</p>
          <div className='flex flex-row hover:cursor-pointer mb-2'>
            <WhatsAppIcon
              sx={{
                color: '#49c95a',
                fontSize: 25
              }}
            />
            <a href='https://api.whatsapp.com/send?phone=+13053377539&text=Hola,%20Diplomarket%E2%84%A2' className='ml-1'>+1 305 337 7539 Sobre preguntas generales</a>
          </div>
          <p className='font-semibold text-xl mb-2'>Correos:</p>
          {mails.map((mail) => (
            <p key={mail.mail} className='mb-2'><span><MailOutlineIcon /></span> {mail.label} {mail.mail}</p>
          ))}
          <p className='font-semibold text-xl mb-1'>Dirección:</p>
          <p className='mb-1'>Oficina en Miami:</p>
          <p className='hover:cursor-pointer mb-2'>
            <span><LocationOnOutlinedIcon /></span>
            <a href="https://www.google.com/maps/place/7921+NW+68th+St,+Miami,+FL+33166,+EE.+UU./@25.8356389,-80.3263555,21z/data=!4m5!3m4!1s0x88d9bbca216cdb17:0x4b7d68b0b193c9c9!8m2!3d25.8356956!4d-80.3262457">
              7921 NW 68 Street Miami, FL 33166, Estados Unidos ,para que usted
              se sienta atendido o responda a sus necesidades, con presencia física.
              Esta oficina no atiende asuntos para confirmar compras, solo para
              alamacenamiento de cargas
            </a>
          </p>
          <p className='font-semibold text-xl mb-1'>Servicio chat en línea:</p>
          <p>9am - 6pm. Para atender cualquier tipo de duda o problema.</p>
        </div>
        <div className='flex flex-col w-1/2 ml-4'>
          <div className='mt-16 mb-4'>
            <TextField
              id="outlined-required"
              label="Correo"
              sx={{
                width: '100%',
                borderColor: 'red'
              }}
            />
          </div>
          <div className='mb-4'>
            <TextField
              id="outlined-multiline-static"
              label="Mensaje"
              multiline
              rows={4}
              defaultValue=""
              sx={{
                width: '100%',
                borderColor: 'red'
              }}
            />
          </div>
          <div className=''>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                backgroundColor: '#15224b !important'
              }}
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}

const mails = [
  {
    label: 'ÓRDENES DE COMPRA:',
    mail: 'ordenes@diplomarket.com'
  },
  {
    label: 'ENTREGAS A DOMICILIO:',
    mail: 'entregas@diplomarket.com'
  },
  {
    label: 'COMERCIALIZAR SUS PRODUCTOS CON NOSOTROS:',
    mail: 'comercial@diplomarket.com'
  },
  {
    label: 'DETALLES TÉCNICOS DE LA WEB:',
    mail: 'soporte@diplomarket.com'
  }
]

export async function getServerSideProps() {
  const { contact, fetchError } = await fetchData()

  return {
    props: {
      contact,
      fetchError
    }
  }
}

async function fetchData() {
  let fetchError = ''
  let contact = []
  try {
    contact = await (await resources.contact.get()).data
  } catch (error) {
    fetchError = error.message
  }
  console.log('🚀 ~ file: contact.jsx ~ line 133 ~ fetchData ~ contact', contact)
  return { contact, fetchError }
}

Contact.propTypes = {
  contact: PropTypes.object,
  fetchError: PropTypes.string
}

Contact.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Contact
