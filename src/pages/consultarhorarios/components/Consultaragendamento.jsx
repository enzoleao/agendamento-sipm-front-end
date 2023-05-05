import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
export default function Consultaragendamento() {
  const [busca, setBusca] = React.useState(1)
  const [cpf, setCpf] = React.useState('')
  const [nome, setNome] = React.useState('')
  const [lotacao, setLotacao] = React.useState('')
  const [cidade, setCidade] = React.useState('')
  const [data, setData] = React.useState('')
  const [horario, setHorario] = React.useState('')

  const [loading, setLoading] = React.useState(true)
  const consultarAgendamento = () => {
    setBusca(2)
    setLoading(true)
    Axios.post(
      'https://web-production-0ecd.up.railway.app/consultaragendamento',
      {
        cpf,
      },
    )
      .then((res) => {
        setNome(res.data.nome)
        setLotacao(res.data.lotacao)
        setData(res.data.data)
        setHorario(res.data.horario)
        setCidade(res.data.polo)
        setLoading(false)
      })
      .catch((err) => {
        setBusca(1)
        alert(err.response.data.message)
        setLoading(false)
      })
    setCpf('')
  }
  return (
    <div>
      {busca === 1 ? (
        <div className="flex space-x-2 items-center">
          <TextField
            id="cpf"
            label="INSIRA SEU CPF"
            type="number"
            value={cpf}
            variant="standard"
            onChange={(e) => setCpf(e.target.value)}
            sx={{ width: '200px' }}
          />
          {cpf === '' ? (
            <Button
              sx={{ height: 40, marginTop: 1 }}
              variant="outlined"
              disabled
            >
              Buscar
            </Button>
          ) : (
            <Button
              sx={{ height: 40, marginTop: 1 }}
              variant="outlined"
              onClick={consultarAgendamento}
            >
              Buscar
            </Button>
          )}
        </div>
      ) : (
        <div>
          {loading === true ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table size="medium" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center">DADOS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        NOME
                      </TableCell>
                      <TableCell component="th" scope="row">
                        |
                      </TableCell>
                      <TableCell align="center">{nome}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        LOTACAO
                      </TableCell>
                      <TableCell component="th" scope="row">
                        |
                      </TableCell>
                      <TableCell align="center">{lotacao}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Cidade de atendimento
                      </TableCell>
                      <TableCell component="th" scope="row">
                        |
                      </TableCell>
                      <TableCell align="center">{cidade}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        DATA
                      </TableCell>
                      <TableCell component="th" scope="row">
                        |
                      </TableCell>
                      <TableCell align="center">{data}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Horario
                      </TableCell>
                      <TableCell component="th" scope="row">
                        |
                      </TableCell>
                      <TableCell align="center">{horario}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="flex justify-end mt-5">
                <Button variant="outlined" onClick={() => setBusca(1)}>
                  Nova Consulta
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
