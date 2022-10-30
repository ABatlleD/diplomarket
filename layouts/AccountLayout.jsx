import React from 'react'
import PropTypes from 'prop-types'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

function AccountLayout({ children }) {
  return (
    <>
      <div className='flex justify-center w-full'>
        <div className='flex flex-row self-center w-[95%] my-10'>
          <div className='flex flex-col w-2/12 mr-4 border border-text-100 text-footer-background-200'>
            <div className='flex flex-row p-2 border-b'>
              <div><PersonIcon fontSize='small' /></div>
              <div className='mt-[0.20rem] ml-1'> Mi Cuenta</div>
            </div>
            <div className='flex flex-row p-2 border-b'>
              <div><GroupIcon fontSize='small' /></div>
              <div className='mt-[0.20rem] ml-1'> Mis Destinatarios</div>
            </div>
            <div className='flex flex-row p-2 border'>
              <div><ListAltIcon fontSize='small' /></div>
              <div className='mt-[0.20rem] ml-1'> Mis Órdenes</div>
            </div>
            <div className='flex flex-row p-2 border'>
              <div><SettingsIcon fontSize='small' /></div>
              <div className='mt-[0.20rem] ml-1'> Opciones</div>
            </div>
            <div className='flex flex-row p-2 border'>
              <div><LogoutIcon fontSize='small' /></div>
              <div className='mt-[0.20rem] ml-1'> Salir</div>
            </div>
          </div>
          <div className='w-10/12 border'>{children}</div>
        </div>
      </div>
    </>
  )
}

AccountLayout.propTypes = {
  children: PropTypes.node
}

export default AccountLayout
