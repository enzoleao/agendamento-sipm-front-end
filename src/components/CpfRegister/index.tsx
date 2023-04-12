import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import api from '../../services/api'
import { TableBase } from '../TableBase'
import { TableContent } from './TableContent'
import { useEffect, useState } from 'react'
import { RxMagnifyingGlass } from 'react-icons/rx'
import styles from './CpfRegister.module.scss'
import { DialogForm } from './DialogForm'
export function CpfRegister() {
  const [cpfs, setCpfs] = useState<any[]>([])
  const [searchInput, setSearchInput] = useState('')
  useEffect(() => {
    const getAllCpf = async () => {
      try {
        const response = await api.get('/getallcpf')
        setCpfs(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllCpf()
  }, [])
  const rowsHeader = [{ name: 'CPF' }]

  const filterOption = cpfs.filter((i) => {
    return i.cpf.startsWith(searchInput)
  })
  const itensPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const pages = Math.ceil(filterOption.length / itensPerPage)
  const currentItens = filterOption.slice(startIndex, endIndex)
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className={styles.cpfRegisterContainer}>
      <header>
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <InputLabel htmlFor="input-with-icon-adornment">Buscar...</InputLabel>
          <Input
            sx={{ width: '100%', maxWidth: '320px' }}
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
          sx={{
            height: '32px',
            color: '#282957',
            borderColor: '#282957',
            ':hover': {
              border: 'transparent',
              backgroundColor: '#292963',
              color: 'white',
            },
          }}
          onClick={() => setOpenModal(true)}
          variant="outlined"
        >
          CADASTRAR
        </Button>
      </header>
      <TableBase
        currentItens={currentItens}
        paginationActive={true}
        currentPage={currentPage}
        rowsHeader={rowsHeader}
        setCurrentPage={setCurrentPage}
        pages={pages}
        itensPerPage={itensPerPage}
      >
        {typeof cpfs !== 'undefined' &&
          currentItens.map((infos) => {
            return <TableContent key={infos.id} id={infos.id} cpf={infos.cpf} />
          })}
      </TableBase>
      <DialogForm open={openModal} setOpen={setOpenModal} />
    </div>
  )
}
