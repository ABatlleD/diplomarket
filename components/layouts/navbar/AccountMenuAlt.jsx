import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PersonIcon from '@mui/icons-material/Person'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import GroupIcon from '@mui/icons-material/Group'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

function AccountMenu ({ totalFav }) {
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
        <div>
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
        </div>
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
        <div className="flex flex-col">
          <div className="flex flex-col pt-2 px-3 md:px-6 col-span-2">
            {status === 'unauthenticated' && (
              <>
                <Link href={'/auth/signin'}>
                  <div className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md w-full border border-transparent font-semibold bg-dm-red text-white hover:bg-dm-red/90 focus:outline-none focus:ring-2 focus:ring-dm-red/70 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    {t('layout.navbar.account.signin')}
                  </div>
                </Link>
                <p className="text-center mt-2 text-gray-600">
                  {t('layout.navbar.account.is_new_signup')}
                  <Link href={'/auth/signup'}>
                    <span className="text-dm-red hover:text-dm-red/80 decoration-2 hover:underline font-medium mx-1">
                      {t('layout.navbar.account.signup')}
                    </span>
                  </Link>
                </p>
              </>
            )}
            {status === 'authenticated' && (
              <div onClick={handleLogout} className="py-3 px-4 inline-flex justify-center items-center cursor-pointer gap-2 rounded-md w-full border border-transparent font-semibold bg-dm-red text-white hover:bg-dm-red/90 focus:outline-none focus:ring-2 focus:ring-dm-red/70 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                {t('layout.navbar.account.signout')}
                <LogoutIcon />
              </div>
            )}
          </div>
          <span className="flex flex-col py-2 px-3 md:px-6"></span>
        </div>
        <MenuItem onClick={handleCloseAccountMenu}>
          <ListItemText>
            <Link href={'/wishlist'}>
              <div className="flex flex-row justify-between w-full">
                <div className='flex flex-row'>
                  <span className='pr-2'>
                  <svg className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M7.085 3A1.5 1.5 0 0 1 8.5 2h3a1.5 1.5 0 0 1 1.415 1H14.5A1.5 1.5 0 0 1 16 4.5v4.503a3.86 3.86 0 0 0-1 .173V4.5a.5.5 0 0 0-.5-.5h-1.585A1.5 1.5 0 0 1 11.5 5h-3a1.5 1.5 0 0 1-1.415-1H5.5a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h5.055l1 1H5.5A1.5 1.5 0 0 1 4 16.5v-12A1.5 1.5 0 0 1 5.5 3h1.585ZM8.5 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm1.335 7.835a2.85 2.85 0 0 1 4.031 0l.136.136l.137-.136a2.85 2.85 0 0 1 4.031 4.031l-3.814 3.814a.5.5 0 0 1-.707 0l-3.814-3.814a2.85 2.85 0 0 1 0-4.031Z"/>
                  </svg>
                  </span>
                  <span>{t('layout.navbar.account.wishlist')}</span>
                </div>
              </div>
            </Link>
          </ListItemText>
          <Typography variant="body2" color="text.secondary">
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-dm-red rounded-full">
              {totalFav > 99 ? "+99" : totalFav}
            </span>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseAccountMenu}>
          <Link href={'/account/details'}>
            <div className='flex flex-row'>
              <span className='pr-2'>
                <PersonIcon />
              </span>
              <span>{t('layout.navbar.account.details')}</span>
            </div>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleCloseAccountMenu}>
          <Link href={'/account/recipients'}>
            <div className='flex flex-row'>
              <span className='pr-2'>
                <GroupIcon />
              </span>
              <span>{t('layout.navbar.account.recipients')}</span>
            </div>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleCloseAccountMenu}>
          <Link href={'/account/orders'}>
            <div className='flex flex-row'>
              <span className='pr-2'>
                <ListAltIcon />
              </span>
              <span>{t('layout.navbar.account.orders')}</span>
            </div>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleCloseAccountMenu}>
          <Link href={'/account/settings'}>
            <div className='flex flex-row'>
              <span className='pr-2'>
                <SettingsIcon />
              </span>
              <span>{t('layout.navbar.account.settings')}</span>
            </div>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AccountMenu
