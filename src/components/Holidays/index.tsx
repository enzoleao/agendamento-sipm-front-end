import { useState, useEffect } from 'react'
import api from '../../services/api'
import { TableBase } from '../TableBase'
import styles from './Holidays.module.scss'
import { TableContent } from './TableContent'
export function Holidays() {
  const [feriados, setFeriados] = useState<any[]>([])
  useEffect(() => {
    const getAllFeriados = async () => {
      try {
        const response = await api.get('/getallferiados')
        setFeriados(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllFeriados()
  }, [])
  const [currentPage, setCurrentPage] = useState(0)
  const rowsHeader = [{ name: 'Feriado' }, { name: 'Data' }]
  const itensPerPage = 8
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const pages = Math.ceil(feriados.length / itensPerPage)
  const currentItens = feriados.slice(startIndex, endIndex)
  return (
    <div className={styles.holidayTableContainer}>
      <TableBase
        itensPerPage={itensPerPage}
        currentItens={currentItens}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
        totalItens={feriados}
        paginationActive={true}
        rowsHeader={rowsHeader}
      >
        {typeof currentItens !== 'undefined' &&
          currentItens.map((infos) => {
            return (
              <TableContent
                key={infos.id}
                feriado={infos.nome}
                data={infos.data}
              />
            )
          })}
      </TableBase>
    </div>
  )
}
