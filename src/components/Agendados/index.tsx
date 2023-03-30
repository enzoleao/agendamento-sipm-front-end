import api from '../../services/api'
import styles from './Agendados.module.scss'
import { useEffect, useState } from 'react'
import { AgendadosTable } from './components/AgendadosTable'
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { RxMagnifyingGlass } from 'react-icons/rx'
import {
  DialogFormToCreateRelatorio,
  DialogFormToDeleteAll,
} from './components/DialogForm'
import { TableBase } from '../TableBase'

export function Agendados() {
  useEffect(() => {
    const getAllCpf = async () => {
      try {
        const response = await api.get('/getinfo')
        setAgendados(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllCpf()
  }, [])

  const [agendados, setAgendados] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [filterType, setFilterType] = useState('cpf')
  const [openModalToCreate, setOpenModalToCreate] = useState(false)
  const [openModalToDeleteDates, setOpenModalToDeleteDates] = useState(false)
  /* ---- FILTER ---- */
  // eslint-disable-next-line array-callback-return
  const filterOption = agendados.filter((i) => {
    if (filterType === 'cpf') {
      return i.rg.startsWith(searchInput)
    }
    if (filterType === 'nome') {
      return i.nome.startsWith(searchInput)
    }
    if (filterType === 'data') {
      return i.data.startsWith(searchInput)
    }
    if (filterType === 'polo') {
      return i.polo.startsWith(searchInput)
    }
  })

  /* ---- PAGINATION ---- */
  const itensPerPage = 8
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const pages = Math.ceil(filterOption.length / itensPerPage)
  const currentItens = filterOption.slice(startIndex, endIndex)

  /* ---- HEADER INFORMATIONS --- */

  const headerInfos = [
    { name: 'nome' },
    { name: 'cpf' },
    { name: 'patente' },
    { name: 'telefone' },
    { name: 'modelo' },
    { name: 'lotacao' },
    { name: 'polo' },
    { name: 'data' },
    { name: 'horario' },
  ]
  return (
    <div className={styles.agendadosContent}>
      <div className={styles.tableSection}>
        <header className={styles.settingsHeader}>
          <section className={styles.headerFilterSection}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Selecione filtro
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Age"
              >
                <MenuItem value="cpf">CPF</MenuItem>
                <MenuItem value="nome">NOME</MenuItem>
                <MenuItem value="data">DATA</MenuItem>
                <MenuItem value="polo">POLO</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Buscar...
              </InputLabel>
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
          </section>
          <Button
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
            onClick={() => setOpenModalToCreate(true)}
            variant="outlined"
          >
            RELÁTORIO
          </Button>
          <Button
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
            onClick={() => setOpenModalToDeleteDates(true)}
            variant="outlined"
          >
            REMOVER AGENDAMENTOS POR DATA
          </Button>
        </header>
        <TableBase
          currentItens={currentItens}
          itensPerPage={itensPerPage}
          rowsHeader={headerInfos}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          totalItens={filterOption}
          paginationActive={true}
        >
          {typeof currentItens !== 'undefined' &&
            currentItens.map((users) => {
              return (
                <AgendadosTable
                  id={users.id}
                  key={users.id}
                  name={users.nome}
                  cpf={users.rg}
                  patente={users.patente}
                  telefone={users.telefone}
                  modelo={users.modelo}
                  lotacao={users.lotacao}
                  polo={users.polo}
                  data={users.data}
                  horario={users.horario}
                />
              )
            })}
        </TableBase>
      </div>
      <DialogFormToDeleteAll
        setOpen={setOpenModalToDeleteDates}
        open={openModalToDeleteDates}
      />
      <DialogFormToCreateRelatorio
        open={openModalToCreate}
        setOpen={setOpenModalToCreate}
      />
    </div>
  )
}
