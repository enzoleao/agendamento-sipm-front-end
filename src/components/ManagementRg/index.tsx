import api from '../../services/api'
import { useEffect, useState } from 'react'
import { TableBase } from '../TableBase'
import styles from './ManagementRg.module.scss'
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
import { TableContet } from './TableContent'
import { DialogFormToCreateNewRg } from './DialogForm'
export function ManagementRg() {
  const [rgsGerados, setRgsGerados] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [filterType, setFilterType] = useState('rg')
  const [dialogFormToCreateNewRg, setDialogFormToCreateNewRg] = useState(false)
  const rowsHeader = [
    { name: 'RG' },
    { name: 'PORTADOR' },
    { name: 'GERADO POR' },
    { name: 'Ultima Alteracao' },
  ]
  /* ---- FILTER ---- */
  // eslint-disable-next-line array-callback-return
  const filterOption = rgsGerados.filter((i) => {
    if (filterType === 'rg') {
      return i.rg.startsWith(searchInput)
    }
    if (filterType === 'portador') {
      return i.portador.startsWith(searchInput)
    }
  })
  /* ---- PAGINATION ---- */
  const itensPerPage = 8
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const pages = Math.ceil(filterOption.length / itensPerPage)
  const currentItens = filterOption.slice(startIndex, endIndex)
  useEffect(() => {
    const getAllRgCreated = async () => {
      try {
        const response = await api.get('/getallrgscriados')
        setRgsGerados(response.data)
      } catch (err) {
        return console.log(err)
      }
    }
    getAllRgCreated()
  }, [])
  return (
    <div className={styles.containerFooter}>
      <section className={styles.headerFilterSection}>
        <section>
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
              <MenuItem value="rg">RG</MenuItem>
              <MenuItem value="portador">PORTADOR</MenuItem>
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
        <section className={styles.rightSectionHeader}>
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
            onClick={() => setDialogFormToCreateNewRg(true)}
            variant="outlined"
          >
            GERAR NOVO RG
          </Button>
        </section>
      </section>
      <TableBase
        itensPerPage={itensPerPage}
        currentItens={currentItens}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
        totalItens={filterOption}
        rowsHeader={rowsHeader}
        paginationActive={true}
      >
        {typeof currentItens !== 'undefined' &&
          currentItens.map((infos) => {
            return (
              <TableContet
                id={infos.id}
                key={infos.id}
                rg={infos.rg}
                portador={infos.portador}
                gerador={infos.createdBy}
                alteradoBy={infos.atualizadoBy}
              />
            )
          })}
      </TableBase>
      <DialogFormToCreateNewRg
        open={dialogFormToCreateNewRg}
        setOpen={setDialogFormToCreateNewRg}
      />
    </div>
  )
}
