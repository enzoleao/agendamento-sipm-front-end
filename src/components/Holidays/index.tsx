import { Button } from '@mui/material'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import { TableBase } from '../TableBase'
import { DialogForm } from './DialogForm'
import styles from './Holidays.module.scss'
import { TableContent } from './TableContent'
export function Holidays() {
  const [feriados, setFeriados] = useState<any[]>([])
  const [open, setOpen] = useState(false)
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
      <header>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            height: '32px',
            color: '#282957',
            borderColor: '#282957',
            ':hover': {
              border: 'none',
              backgroundColor: '#292963',
              color: 'white',
            },
          }}
          variant="outlined"
        >
          ADICIONAR FERIADO
        </Button>
      </header>
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
                id={infos.id}
                key={infos.id}
                feriado={infos.nome}
                data={infos.data}
              />
            )
          })}
      </TableBase>
      <DialogForm open={open} setOpen={setOpen} />
    </div>
  )
}
