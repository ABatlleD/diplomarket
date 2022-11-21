import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import GroupIcon from '@mui/icons-material/Group'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

function AccountMenu () {
  const [anchorElAccount, setAnchorElAccount] = useState(null)
  const { t } = useTranslation()
  const { status } = useSession()

  const handleOpenAccountMenu = (event) => {
    setAnchorElAccount(event.currentTarget)
  }

  const handleCloseAccountMenu = () => {
    setAnchorElAccount(null)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    await signOut({ redirect: false })
    setAnchorElAccount(null)
  }

  return (
    <div className='AccountMenu'>
      <Tooltip title='Select Account'>
        <IconButton onClick={handleOpenAccountMenu}>
          <div className='flex flex-row text-[#000000]'>
            { status === 'authenticated' && (
              <AccountCircleIcon fontSize='large' className='text-button' />
            )}
            { status === 'unauthenticated' && (
              <AccountCircleIcon fontSize='large' />
            )}
          </div>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '30px' }}
        id='Account-menu'
        anchorEl={anchorElAccount}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={Boolean(anchorElAccount)}
        onClose={handleCloseAccountMenu}
      >
        { status === 'unauthenticated' && (
          <MenuItem onClick={handleCloseAccountMenu}>
            <Link href={'/auth/signin'}>
                <div className='flex flex-row'>
                  <span className='pr-2'>
                    <PersonIcon />
                  </span>
                  <span>{t('layout.navbar.account.signin')}</span>
                </div>
            </Link>
          </MenuItem>
        )}
        { status === 'unauthenticated' && (
          <MenuItem onClick={handleCloseAccountMenu}>
            <Link href={'/auth/signup'}>
              <div className='flex flex-row'>
                <span className='pr-2'>
                  <PersonAddIcon />
                </span>
                <span>{t('layout.navbar.account.signup')}</span>
              </div>
            </Link>
          </MenuItem>
        )}
        { status === 'authenticated' && (
          <MenuItem onClick={handleCloseAccountMenu}>
            <Link href={'/account/details'}>
              <div className='flex flex-row'>
                <span className='pr-2'>
                  <PersonIcon />
                </span>
                <span>Mi Cuenta</span>
              </div>
            </Link>
          </MenuItem>
        )}
        { status === 'authenticated' && (
          <MenuItem onClick={handleCloseAccountMenu}>
            <Link href={'/account/recipients'}>
              <div className='flex flex-row'>
                <span className='pr-2'>
                  <GroupIcon />
                </span>
                <span>Mis Destinatarios</span>
              </div>
            </Link>
          </MenuItem>
        )}
        { status === 'authenticated' && (
          <MenuItem onClick={handleCloseAccountMenu}>
            <Link href={'/account/orders'}>
              <div className='flex flex-row'>
                <span className='pr-2'>
                  <ListAltIcon />
                </span>
                <span>Mis Órdenes</span>
              </div>
            </Link>
          </MenuItem>
        )}
        { status === 'authenticated' && (
          <MenuItem onClick={handleCloseAccountMenu}>
            <Link href={'/account/settings'}>
              <div className='flex flex-row'>
                <span className='pr-2'>
                  <SettingsIcon />
                </span>
                <span>Ajustes</span>
              </div>
            </Link>
          </MenuItem>
        )}
        { status === 'authenticated' && (
          <MenuItem onClick={handleLogout}>
            <div className='flex flex-row'>
              <span className='pr-2'>
                <LogoutIcon />
              </span>
              <span>Salir</span>
            </div>
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}

export default AccountMenu
