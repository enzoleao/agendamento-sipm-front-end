import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import styles from './Sidebar.module.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { useContexts } from '../../contexts/useContexts'

export function Sidebar() {
  const {
    showSideBar,
    setShowSideBar,
    componentToShowHome,
    setComponentToShowHome,
  } = useContexts()

  const handleChangeComponentToShow = (event: any, newValue: any) => {
    setComponentToShowHome(newValue)
  }
  return (
    <div
      onClick={() => console.log(componentToShowHome)}
      className={
        showSideBar ? styles.sideBarContainerActive : styles.sideBarContainer
      }
    >
      <Box sx={{ width: '100%', marginTop: '40px' }}>
        <Tabs
          orientation="vertical"
          value={componentToShowHome}
          onChange={handleChangeComponentToShow}
          aria-label="wrapped label tabs example"
          className={styles.ulItensSidebar}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#1850c9',
              width: '3px',
            },
          }}
        >
          <Tab
            sx={{
              color: 'white',
              width: '100%',
            }}
            value="one"
            label="HOME"
            wrapped
          />
          <Tab
            sx={{
              width: '100%',
              color: 'white',
            }}
            value="two"
            label="GESTÃO DE RG"
          />
          <Tab
            sx={{
              width: '100%',
              color: 'white',
            }}
            value="three"
            label="GESTÃO DE FERIADOS"
          />
          <Tab
            sx={{
              width: '100%',
              color: 'white',
            }}
            value="four"
            label="GERENCIAMENTO DE POLOS"
          />
          <Tab
            sx={{
              width: '100%',
              color: 'white',
            }}
            value="five"
            label="GERENCIAMENTO DE USUARIOS"
          />
          <Tab
            sx={{
              width: '100%',
              color: 'white',
            }}
            value="six"
            label="GERENCIAMENTO DE AVISOS"
          />
        </Tabs>
      </Box>
      <AiOutlineClose
        onClick={() => setShowSideBar(!showSideBar)}
        className={styles.buttonCloseSidebar}
        color="#fff"
      />
    </div>
  )
}
