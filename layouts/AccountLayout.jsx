import React from 'react'
import PropTypes from 'prop-types'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import Link from 'next/link'

function AccountLayout({ children, option }) {
  return (
    <>
      <div className='flex justify-center w-full'>
        <div className='flex flex-row self-center w-[95%] my-10'>
          <div className='hidden md:flex flex-col w-2/12 mr-4 text-footer-background-200 rounded-3xl'>
            <Link href={'/account/details'}>
              <div className={`flex flex-row p-2 border rounded-t-3xl hover:cursor-pointer ${option === 1 ? 'bg-button text-text-200' : ''}`}>
                <div><PersonIcon fontSize='small' /></div>
                <div className='mt-[0.20rem] ml-1'> Mi Cuenta</div>
              </div>
            </Link>
            <Link href={'/account/recipients'}>
              <div className={`flex flex-row p-2 border hover:cursor-pointer ${option === 2 ? 'bg-button text-text-200' : ''}`}>
                <div><GroupIcon fontSize='small' /></div>
                <div className='mt-[0.20rem] ml-1'> Mis Destinatarios</div>
              </div>
            </Link>
            <Link href={'/account/orders'}>
              <div className={`flex flex-row p-2 border hover:cursor-pointer ${option === 3 ? 'bg-button text-text-200' : ''}`}>
                <div><ListAltIcon fontSize='small' /></div>
                <div className='mt-[0.20rem] ml-1'> Mis Órdenes</div>
              </div>
            </Link>
            <Link href={'/account/settings'}>
              <div className={`flex flex-row p-2 border hover:cursor-pointer rounded-b-3xl ${option === 4 ? 'bg-button text-text-200' : ''}`}>
                <div><SettingsIcon fontSize='small' /></div>
                <div className='mt-[0.20rem] ml-1'> Opciones</div>
              </div>
            </Link>
          </div>
          <div className='w-full md:w-10/12'>{children}</div>
        </div>
      </div>
    </>
  )
}

AccountLayout.propTypes = {
  children: PropTypes.node,
  option: PropTypes.number
}

export default AccountLayout
