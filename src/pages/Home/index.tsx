import { Agendados } from '../../components/Agendados'
import { Header } from '../../components/Header'
import { Holidays } from '../../components/Holidays'
import { ManagementRg } from '../../components/ManagementRg'
import { Notices } from '../../components/Notices'
import { Polos } from '../../components/Polos'
import { Sidebar } from '../../components/Sidebar'
import { Users } from '../../components/Users'
import { useContexts } from '../../contexts/useContexts'
import styles from './Home.module.scss'

export function Home() {
  const { componentToShowHome } = useContexts()
  return (
    <div className={styles.homeWrapper}>
      <Header />
      <Sidebar />
      <div className={styles.homeContainer}>
        <div className={styles.content}>
          <h1>.</h1>
          {(() => {
            switch (componentToShowHome) {
              case 'one':
                return <Agendados />
              case 'two':
                return <ManagementRg />
              case 'three':
                return <Holidays />
              case 'four':
                return <Polos />
              case 'five':
                return <Users />
              case 'six':
                return <Notices />
              default:
                return <Agendados />
            }
          })()}
        </div>
      </div>
    </div>
  )
}
