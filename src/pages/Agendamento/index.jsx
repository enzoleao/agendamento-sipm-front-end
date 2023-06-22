import { listCargos } from './cargos'
import { batalhoes } from './batalhoes'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Axios from 'axios'
import Brasao from '../../assets/brasao_dgp.png'
import 'dayjs/locale/pt-br'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './Agendamento.module.scss'
export function Agendamento() {
  const locale = 'pt-br'
  const [open, setOpen] = React.useState(false)
  const [erro, setErro] = React.useState(null)
  const [erroNome, setErroNome] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [avisos, setAvisos] = React.useState()
  const [header, setHeader] = React.useState()

  const isWeekend = (date) => {
    const day = date.day()

    return day === 0 || day === 6
  }
  const isWeekendItaituba = (date) => {
    const day = date.day()

    return day === 0 || day === 6 || day === 1 || day === 3 || day === 5
  }

  const [polo, setPolo] = React.useState()
  const [newOpen, setNewOpen] = React.useState(null)

  const handleClose = () => setNewOpen(false)
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const horariosIntegral = [
    { id: 1, horario: '9:15' },
    { id: 2, horario: '9:45' },
    { id: 3, horario: '10:15' },
    { id: 4, horario: '10:45' },
    { id: 5, horario: '11:15' },
    { id: 6, horario: '11:45' },
    { id: 7, horario: '12:15' },
    { id: 8, horario: '14:15' },
    { id: 9, horario: '14:45' },
    { id: 10, horario: '15:15' },
    { id: 11, horario: '15:45' },
  ]
  const horariosIntegralMaraba = [
    { id: 1, horario: '9:15' },
    { id: 2, horario: '9:45' },
    { id: 3, horario: '10:15' },
    { id: 4, horario: '10:45' },
    { id: 5, horario: '11:15' },
    { id: 6, horario: '11:45' },
    { id: 7, horario: '12:15' },
    { id: 8, horario: '12:45' },
    { id: 9, horario: '14:15' },
    { id: 10, horario: '14:45' },
    { id: 11, horario: '15:15' },
    { id: 12, horario: '15:45' },
    { id: 13, horario: '16:15' },
  ]
  const horariosMatutino = [
    { id: 1, horario: '9:15' },
    { id: 2, horario: '9:45' },
    { id: 3, horario: '10:15' },
    { id: 4, horario: '10:45' },
    { id: 5, horario: '11:15' },
    { id: 6, horario: '11:45' },
  ]
  const horariosRedencao = [
    { id: 1, horario: '9:15' },
    { id: 2, horario: '9:45' },
    { id: 3, horario: '10:15' },
    { id: 4, horario: '10:45' },
    { id: 5, horario: '11:15' },
    { id: 6, horario: '11:45' },
    { id: 7, horario: '12:15' },
  ]
  const [newData, setNewData] = React.useState(null)

  const [values, setValues] = React.useState({
    nome: '',
    rg: '',
    telefone: '',
    patente: '',
    lotacao: '',
    modelo: '',
    pa: '',
    data: '',
    horario: '',
    polo: '',
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  React.useEffect(() => {
    Axios.get('https://web-production-fff25.up.railway.app/getallpolos')
      .then((res) => {
        setPolo(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    Axios.get('https://web-production-fff25.up.railway.app/getavisos')
      .then((res) => {
        setNewOpen(res.data[0].ativado)
        setAvisos(res.data[0].aviso)
        setHeader(res.data[0].header)
      })
      .catch((err) => console.log(err))
    setLoading(false)
  }, [])
  const enviarAgend = () => {
    const value2 = newData
    const value = `${newData.$D < 10 ? '0' : ''}${newData.$D}/${
      newData.$M + 1 < 10 ? '0' : ''
    }${newData.$M + 1}/${newData.$y}`
    setNewData(null)
    setButtonLoading(true)
    Axios.post('https://web-production-fff25.up.railway.app/agend', {
      values,
      value,
    })
      .then((res) => {
        setErro(2)
        alert('AGENDADO COM SUCESSO')
        setOpen(true)
        setTimeout(() => {
          window.location.replace('/')
        }, 1000)
      })
      .catch((err) => {
        setButtonLoading(false)
        setNewData(value2)
        setErroNome(err.response.data.message)
        setErro(1)
        setOpen(true)
      })
  }
  const handleChangeVal = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <>
      {loading === true ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="h-screen min-h-full md:w-full flex flex-col  justify-between items-center">
          <img
            src={Brasao}
            style={{ width: '200px', height: '200px' }}
            alt="teste"
          ></img>
          <div className="flex flex-col gap-1 space-x-1 justify-center items-center font-sans">
            <h1 className="font-bold text-xl sm:text2-xl">
              Serviço de Identificação Policial Militar
            </h1>
            <h1 className="font-bold text-xl sm:text2-xl">SIPM</h1>
            <div className="flex ">
              <p className="font-sans">
                Deseja consultar datas com horários vagos?
              </p>
              <Link to="/consultarhorarios">
                <div className="font-sans hover:text-blue-300 hover:underline underline text-red-600">
                  Clique Aqui
                </div>
              </Link>
            </div>
            <div className="flex ">
              <p className="font-sans">
                Deseja consultar as documentações necessárias?
              </p>
              <Link to="https://docs.google.com/document/d/1cppX01uK4f3Po0IE_Y6V66LPKeU3uoqO/edit">
                <div className="font-sans hover:text-blue-300 hover:underline underline text-red-600">
                  Clique Aqui
                </div>
              </Link>
            </div>
          </div>
          <div>
            {erro === 1 ? (
              <Box sx={{ width: '100%', position: 'block' }}>
                <Collapse in={open}>
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false)
                        }}
                      >
                        x
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {erroNome}
                  </Alert>
                </Collapse>
              </Box>
            ) : (
              <div></div>
            )}
            {erro === 2 ? (
              <Box sx={{ width: '100%', display: 'block' }}>
                <Collapse in={open}>
                  <Alert
                    severity="success"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false)
                        }}
                      >
                        x
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Agendado com sucesso!
                  </Alert>
                </Collapse>
              </Box>
            ) : (
              <div></div>
            )}
          </div>
          <div className="flex flex-col w-full  md:w-[55rem] h-[44rem] space-y-4 items-center justify-center  rounded-md shadow-2xl min-h-[43rem]">
            <div className="flex flex-col flex-grow w-full items-center space-y-5 ">
              <div className="flex flex-col w-5/6 text-white mt-10">
                <TextField
                  id="nome"
                  label="Nome"
                  type="text"
                  variant="standard"
                  onChange={handleChangeVal('nome')}
                />
              </div>
              <div className="flex flex-col w-5/6 text-white">
                <TextField
                  id="rg"
                  label="CPF"
                  type="number"
                  variant="standard"
                  onChange={handleChangeVal('rg')}
                  sx={{ width: '140px' }}
                />
              </div>
              <div className="flex flex-col w-5/6 text-white">
                <TextField
                  id="telefone"
                  label="Telefone (DDD) + TEL"
                  type="number"
                  variant="standard"
                  onChange={handleChangeVal('telefone')}
                  sx={{ width: '170px' }}
                />
              </div>
              <div className="flex flex-col w-5/6 text-white">
                <FormControl variant="standard">
                  <InputLabel id="graduacao">Posto / Graduação</InputLabel>
                  <Select
                    labelId="graduacao"
                    id="graduacao"
                    value={values.patente}
                    onChange={handleChangeVal('patente')}
                    sx={{ width: '160px' }}
                  >
                    {listCargos.map((item, index) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col w-5/6 text-white">
                <FormControl variant="standard">
                  <InputLabel id="lotacao">Lotação</InputLabel>
                  <Select
                    labelId="lotacao"
                    id="lotacao"
                    value={values.lotacao}
                    onChange={handleChangeVal('lotacao')}
                    sx={{ width: '140px' }}
                  >
                    {batalhoes.map((item, index) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col w-5/6 text-white">
                <FormControl variant="standard">
                  <InputLabel id="modelo">Modelo</InputLabel>
                  <Select
                    labelId="modelo"
                    id="modelo"
                    value={values.modelo}
                    onChange={handleChangeVal('modelo')}
                    sx={{ width: '140px' }}
                  >
                    <MenuItem value="Antigo">Antigo</MenuItem>
                    <MenuItem value="Novo">Novo</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-row justify-between w-5/6 text-white">
                <FormControl variant="standard">
                  <InputLabel id="pa">Polo de Atendimento</InputLabel>
                  <Select
                    labelId="polo"
                    id="pa"
                    value={values.polo}
                    onChange={handleChangeVal('polo')}
                    sx={{ width: '170px' }}
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
                  </Select>
                </FormControl>
              </div>
              <div className="flex  w-5/6 text-white justify-between">
                <div className="flex flex-col">
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={locale}
                  >
                    {values.polo === 'Maraba' ? (
                      <DatePicker
                        disablePast
                        shouldDisableDate={isWeekendItaituba}
                        inputFormat="DD/MM/YYYY"
                        label="Escolha a Data"
                        value={newData}
                        sx={{ height: '100px' }}
                        onChange={(newValue) => {
                          setNewData(newValue)
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="standard"
                            sx={{ width: '180px', height: '13px' }}
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
                        sx={{ height: '12px' }}
                        value={newData}
                        onChange={(newValue) => {
                          setNewData(newValue)
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="standard"
                            sx={{ width: '180px', height: '13px' }}
                            {...params}
                          />
                        )}
                      />
                    )}
                  </LocalizationProvider>
                </div>
                <div className="flex flex-col">
                  <FormControl variant="standard">
                    <InputLabel id="horario">Horario</InputLabel>
                    <Select
                      labelId="horario"
                      id="horario"
                      value={values.horario}
                      onChange={handleChangeVal('horario')}
                      sx={{ width: '140px' }}
                    >
                      {values.polo === 'Belem'
                        ? typeof horariosIntegral !== 'undefined' &&
                          horariosIntegral.map((value) => {
                            return (
                              <MenuItem key={value.id} value={value.horario}>
                                {value.horario}
                              </MenuItem>
                            )
                          })
                        : false}
                      {values.polo === 'Santarem'
                        ? typeof horariosMatutino !== 'undefined' &&
                          horariosMatutino.map((value) => {
                            return (
                              <MenuItem key={value.id} value={value.horario}>
                                {value.horario}
                              </MenuItem>
                            )
                          })
                        : false}
                      {values.polo === 'Maraba'
                        ? typeof horariosIntegralMaraba !== 'undefined' &&
                          horariosIntegralMaraba.map((value) => {
                            return (
                              <MenuItem key={value.id} value={value.horario}>
                                {value.horario}
                              </MenuItem>
                            )
                          })
                        : false}
                      {values.polo === 'Altamira'
                        ? typeof horariosRedencao !== 'undefined' &&
                          horariosRedencao.map((value) => {
                            return (
                              <MenuItem key={value.id} value={value.horario}>
                                {value.horario}
                              </MenuItem>
                            )
                          })
                        : false}

                      {values.polo === 'Redencao'
                        ? typeof horariosRedencao !== 'undefined' &&
                          horariosRedencao.map((value) => {
                            return (
                              <MenuItem key={value.id} value={value.horario}>
                                {value.horario}
                              </MenuItem>
                            )
                          })
                        : false}
                      {values.polo === 'Itaituba'
                        ? typeof horariosMatutino !== 'undefined' &&
                          horariosMatutino.map((value) => {
                            return (
                              <MenuItem key={value.id} value={value.horario}>
                                {value.horario}
                              </MenuItem>
                            )
                          })
                        : false}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="flex pb-5 mb-10">
              {newData === null ? (
                <Button disabled sx={{ width: '150px' }}>
                  {buttonLoading === true ? <CircularProgress /> : 'AGENDAR'}
                </Button>
              ) : (
                <Button
                  color="success"
                  type="submit"
                  sx={{ width: '150px' }}
                  onClick={enviarAgend}
                  variant="outlined"
                >
                  Agendar
                </Button>
              )}
            </div>
          </div>
          <div className={`${styles.agendamentoFooterTeste} h-[4rem]`}>
            <h2 className="text-center">
              Subseção de Identificação da PMPA &copy; Todos os direitos
              reservados. Contato (91) 98516-2740
            </h2>
          </div>
        </div>
      )}
      <div>
        <Modal
          open={newOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="w-full flex  justify-center itens-center">
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, fontWeight: 900 }}
              >
                {header}
              </Typography>
            </div>
            <div className="w-full flex justify-center">
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {avisos}
              </Typography>
            </div>
            <div className="flex items-center justify-center mt-10">
              <Button
                variant="outlined"
                onClick={() => setNewOpen(false)}
                sx={{ width: '30px', height: '30px' }}
              >
                X
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
}
