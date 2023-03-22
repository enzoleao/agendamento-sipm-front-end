import { Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { TfiMenuAlt } from 'react-icons/tfi'
import { useContexts } from '../../contexts/useContexts'
import styles from './Header.module.scss'
export function Header() {
  const { setShowSideBar, showSideBar } = useContexts()
  const [locationModalUser, setLocationModalUser] = useState(null)
  const open = Boolean(locationModalUser)

  const handleUserSettings = (event: any) => {
    setLocationModalUser(event.currentTarget)
  }
  const handleClose = () => {
    setLocationModalUser(null)
  }
  return (
    <div className={styles.headerContainer}>
      <TfiMenuAlt
        onClick={() => setShowSideBar(!showSideBar)}
        className={styles.iconSideBar}
        color="#fff"
      />
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        sx={{
          width: '100px',
          background: 'transparent',
          color: 'white',
          height: '100%',
          ':hover': 'background:white',
        }}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleUserSettings}
        className={styles.rightBox}
      >
        CAP SERRA
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={locationModalUser}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
