import api from '../../services/api'
import styles from './Users.module.scss'
import { useEffect, useState } from 'react'
import { TableBase } from '../TableBase'
import { TableContent } from './TableContent'
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import { RxMagnifyingGlass } from 'react-icons/rx'

export function Users() {
  const rowsHeader = [{ name: 'Usuario' }, { name: 'Admin' }]
  const [users, setUsers] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await api.get('/getallusuarios')
        setUsers(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllUsers()
  }, [])
  const filterOption = users.filter((i) => {
    return i.usuario.startsWith(searchInput)
  })
  const itensPerPage = 8
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const pages = Math.ceil(filterOption.length / itensPerPage)
  const currentItens = filterOption.slice(startIndex, endIndex)
  return (
    <div className={styles.tableContainer}>
      <section>
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <InputLabel htmlFor="input-with-icon-adornment">Buscar...</InputLabel>
          <Input
            sx={{ width: '100%', maxWidth: '420px' }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            endAdornment={
              <InputAdornment position="start">
                <RxMagnifyingGlass color="#282957" />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button>CADASTRAR</Button>
      </section>
      <div className={styles.tableSection}>
        <TableBase rowsHeader={rowsHeader}>
          {typeof currentItens !== 'undefined' &&
            currentItens.map((infos) => {
              return (
                <TableContent
                  key={infos.id}
                  usuarios={infos.usuario}
                  admin={infos.admin}
                />
              )
            })}
        </TableBase>
      </div>
      <footer>
        <p className={styles.countPagesResults}>
          Mostrando 1 - {itensPerPage} de {users.length}
        </p>
        <div className={styles.buttonSectionFooter}>
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {'<'}
          </button>
          <p>{currentPage + 1}</p>
          <button
            disabled={currentPage + 1 === pages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {'>'}
          </button>
        </div>
      </footer>
    </div>
  )
}
