import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import 'dayjs/locale/pt-br'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
export default function Consultarvagas() {
  const locale = 'pt-br'
  const [newData, setNewData] = React.useState(null)
  const [acao, setAcao] = React.useState(1)
  const [polo, setPolo] = React.useState()
  const [dataShow, setDataShow] = React.useState()
  const [poloEscolhido, setPoloEscolhido] = React.useState('')
  const [datasOcupadas, setDatasOcupadas] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    Axios.get('https://web-production-fff25.up.railway.app/getallpolos')
      .then((res) => {
        setPolo(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const isWeekend = (date) => {
    const day = date.day()

    return day === 0 || day === 6
  }
  const isWeekendItaituba = (date) => {
    const day = date.day()

    return day === 0 || day === 6 || day === 1 || day === 3 || day === 5
  }

  const realizarConsulta = async () => {
    setLoading(true)
    const value = `${newData.$D < 10 ? '0' : ''}${newData.$D}/${
      newData.$M + 1 < 10 ? '0' : ''
    }${newData.$M + 1}/${newData.$y}`
    setDataShow(value)
    setAcao(2)
    await Axios.post(
      'https://web-production-fff25.up.railway.app/consultarhorarios',
      {
        value,
        poloEscolhido,
      },
    )
      .then((res) => {
        setDatasOcupadas(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    setLoading(false)
  }
  function createData(horario, vagas) {
    return { horario, vagas }
  }

  const rows = [
    datasOcupadas.map((value) => {
      return createData(value.horario, value.vagas)
    }),
  ]

  return (
    <div className="flex flex-col space-y-10 h-full  ">
      {acao === 1 ? (
        <div className=" flex flex-col h-full justify-center items-center space-y-5">
          <div className="flex mb-10">
            <FormLabel
              id="demo-controlled-radio-buttons-group"
              sx={{ textAlign: 'center' }}
            >
              Selecione uma data para verificar HORARIOS / VAGAS
            </FormLabel>
          </div>
          <div className="flex flex-row justify-between  text-white">
            <FormControl variant="standard">
              <InputLabel id="pa">Polo de Atendimento</InputLabel>
              <Select
                labelId="polo"
                id="pa"
                value={poloEscolhido}
                onChange={(e) => setPoloEscolhido(e.target.value)}
                sx={{ width: '180px' }}
              >
                {typeof polo !== 'undefined' &&
                  polo.map((value) => {
                    return (
                      <MenuItem
                        key={value.id}
                        disabled={value.ativado}
                        value={value.polo}
                      >
                        {value.polo}
                      </MenuItem>
                    )
                  })}

                {/* <MenuItem disabled={poloBelem == true ? true : false} value="BELEM - QCG">BELEM - QCG</MenuItem>
                              <MenuItem value="ALTAMIRA">ALTAMIRA</MenuItem>
                              <MenuItem value="MARABA">MARABA</MenuItem>
                              <MenuItem value="Redençao">REDENÇÃO</MenuItem>
                    <MenuItem value="SANTAREM">SANTARÉM</MenuItem> */}
              </Select>
            </FormControl>
          </div>
          <div className=" flex  justify-center items-center  mt-5">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={locale}
            >
              {poloEscolhido === 'Maraba' ? (
                <DatePicker
                  disablePast
                  shouldDisableDate={isWeekendItaituba}
                  inputFormat="DD/MM/YYYY"
                  label="Escolha a Data"
                  value={newData}
                  onChange={(newValue) => {
                    setNewData(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      sx={{ width: '180px' }}
                      {...params}
                    />
                  )}
                />
              ) : (
                <DatePicker
                  disablePast
                  shouldDisableDate={isWeekend}
                  inputFormat="DD/MM/YYYY"
                  label="Escolha a Data"
                  value={newData}
                  onChange={(newValue) => {
                    setNewData(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      sx={{ width: '180px' }}
                      {...params}
                    />
                  )}
                />
              )}
            </LocalizationProvider>
          </div>
          {newData === null ? (
            <Button disabled variant="outlined">
              CONSULTAR
            </Button>
          ) : (
            <Button variant="outlined" onClick={realizarConsulta}>
              Consultar
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full space-y-4 p-2">
          {loading === true ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <div className="flex flex-col">
                <h1 className="font-sans">POLO: {poloEscolhido}</h1>
                <h1 className="font-sans">DATA : {dataShow}</h1>
              </div>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 350 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Horarios</TableCell>
                      <TableCell align="center">Vagas</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows[0].map((row) => (
                      <TableRow
                        key={row.horario}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.horario}
                        </TableCell>
                        <TableCell align="center">{row.vagas}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button variant="outlined" onClick={() => setAcao(1)}>
                NOVA CONSULTA
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
