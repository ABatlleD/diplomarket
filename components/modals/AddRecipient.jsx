import React, { useState } from 'react'
import { Button, Modal, Fade, FormControl, TextField } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { removeDuplicateObjects } from '../../libs/serialize'
import { useTranslation } from 'react-i18next'

function AddRecipient({
  openAddRecipient = false,
  setOpenAddRecipient = () => {},
  getAddressees,
  setAddressees = () => {}
}) {
  const { t } = useTranslation()
  const [address, setAddress] = useState('')
  const emptyAddress = {
    nombre_remitente: '',
    nombre_alternativo: '',
    apellido1: '',
    apellido2: '',
    ci: '',
    email: '',
    telefono: '',
    telefono_alternativo: '',
    ciudad: '',
    direccion: '',
    nota_entrega: '',
    activo: true
  }

  const activeAddressees = getAddressees.find(({ activo }) => activo === true)

  const handleSubmit = () => {
    if (address !== '') {
      if (activeAddressees) {
        activeAddressees.activo = false
        const addressees = removeDuplicateObjects([...getAddressees, activeAddressees], 'nombre')
        setAddressees(addressees)
      }
      const addressees = removeDuplicateObjects([...getAddressees, { nombre: address, ...emptyAddress }], 'nombre')
      setAddressees(addressees)
      setOpenAddRecipient(false)
    }
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddRecipient}
        onClose={() => setOpenAddRecipient(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
        sx={{ overflowY: 'scroll' }}
      >
        <Fade in={openAddRecipient}>
          <div className='flex flex-col shadow-2xl rounded-xl bg-background-100 w-11/12 md:w-2/5 md:mt-4 mx-auto p-2'>
            <div className='flex flex-row justify-end'>
              <HighlightOffIcon className='hover:cursor-pointer' onClick={() => setOpenAddRecipient(false)} />
            </div>
            <div className='flex flex-row justify-center mt-4'>
              <p className='font-bold text-lg text-footer-background-100'>{t('profile.recipients.modal.title')}</p>
            </div>
            <div className='flex flex-row justify-center mt-4 mx-12'>
              <p className='font-semibold text-footer-background-100 text-justify'>
              {t('profile.recipients.modal.subtitle')}
              </p>
            </div>
            <div className='flex flex-row justify-between mx-12 mt-8'>
              <div className='w-full'>
              <FormControl fullWidth>
                  <TextField
                    required
                    id="select-addresses"
                    name='addresses'
                    value={address}
                    label={t('profile.recipients.modal.name')}
                    fullWidth
                    onChange={(address) => {
                      setAddress(address.target.value)
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div className='mx-12 my-4'>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  backgroundColor: '#ff4a4a !important'
                }}
                onClick={handleSubmit}
              >
                {t('profile.recipients.modal.submit')}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default AddRecipient
