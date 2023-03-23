import { useEffect, useState } from 'react'
import api from '../../services/api'
import { AgendadosTable } from './components/AgendadosTable'
import styles from './Agendados.module.scss'
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
            variant="outlined"
          >
            REMOVER AGENDAMENTOS POR DATA
          </Button>
        </header>
        <div className={styles.divTableWithOverflow}>
          <table className="w-full text-sm text-left  rounded-md">
            <thead className="text-xs uppercase bg-principal-color">
              <tr className="text-start">
                <th scope="col" className="px-6 py-3 text-red-300">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3">
                  CPF
                </th>
                <th scope="col" className="px-6 py-3">
                  Patente
                </th>
                <th scope="col" className="px-6 py-3">
                  Telefone
                </th>
                <th scope="col" className="px-6 py-3">
                  Modelo
                </th>
                <th scope="col" className="px-6 py-3">
                  Lotacao
                </th>
                <th scope="col" className="px-6 py-3">
                  Polo
                </th>
                <th scope="col" className="px-6 py-3">
                  Data
                </th>
                <th scope="col" className="px-6 py-3">
                  Horário
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
      </div>
      <footer>
        <p className={styles.countPagesResults}>
          Mostrando 1 - {itensPerPage} de {filterOption.length}
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
