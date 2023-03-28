import { useEffect, useState } from 'react'
import api from '../../services/api'
import { TableBase } from '../TableBase'
import { TableContent } from './TableContent'
import styles from './Polos.module.scss'
export function Polos() {
  const [polos, setPolos] = useState<any[]>([])
  const rowsHeader = [
    { name: 'Polo' },
    { name: 'Vagas por horário' },
    { name: 'Ativado' },
  ]
  useEffect(() => {
    const getAllPolos = () => {
      api.get('/getallpolos').then((res) => setPolos(res.data))
    }
    getAllPolos()
  }, [])
  return (
    <div className={styles.ContainerTable}>
      <TableBase paginationActive={false} rowsHeader={rowsHeader}>
        {typeof polos !== 'undefined' &&
          polos.map((infos) => {
            return (
              <TableContent
                id={infos.id}
                key={infos.id}
                polo={infos.polo}
                vagas={infos.vagas}
                ativado={infos.ativado}
              />
            )
          })}
      </TableBase>
    </div>
  )
}
