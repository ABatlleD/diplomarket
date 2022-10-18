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

function AccountMenu () {
  const [anchorElAccount, setAnchorElAccount] = useState(null)
  const { t } = useTranslation()

  const handleOpenAccountMenu = (event) => {
    setAnchorElAccount(event.currentTarget)
  }

  const handleCloseAccountMenu = () => {
    setAnchorElAccount(null)
  }

  return (
    <div className='AccountMenu'>
      <Tooltip title='Select Account'>
        <IconButton onClick={handleOpenAccountMenu}>
          <div className='flex flex-row text-[#000000]'>
            <AccountCircleIcon fontSize='large' />
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
      </Menu>
    </div>
  )
}

export default AccountMenu
