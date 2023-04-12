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
import { DialogFormToCreateNewUser } from './DialogForm'

export function Users() {
  const rowsHeader = [{ name: 'Usuario' }, { name: 'Admin' }]
  const [users, setUsers] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [openModalToCreateNewUser, setOpenModalToCreateNewUser] =
    useState(false)
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
        <Button
          variant="outlined"
          sx={{
            height: '32px',
            color: '#282957',
            borderColor: '#282957',
            ':hover': {
              borderColor: 'white',
              backgroundColor: '#292963',
              color: 'white',
            },
          }}
          onClick={() => setOpenModalToCreateNewUser(true)}
        >
          CADASTRAR
        </Button>
      </section>
      <div className={styles.tableSection}>
        <TableBase
          currentItens={currentItens}
          totalItens={filterOption}
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itensPerPage={itensPerPage}
          paginationActive={true}
          rowsHeader={rowsHeader}
        >
          {typeof currentItens !== 'undefined' &&
            currentItens.map((infos) => {
              return (
                <TableContent
                  id={infos.id}
                  key={infos.id}
                  usuarios={infos.usuario}
                  admin={infos.admin}
                />
              )
            })}
        </TableBase>
      </div>
      <DialogFormToCreateNewUser
        open={openModalToCreateNewUser}
        setOpen={setOpenModalToCreateNewUser}
      />
    </div>
  )
}
