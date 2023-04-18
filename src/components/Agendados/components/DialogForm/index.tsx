import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import api from '../../../../services/api'
import { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { BsTrash } from 'react-icons/bs'
import { AiOutlineSave, AiOutlineDownload } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { AlertDialog, DialogConfirmToDeleteAll } from '../../../ConfirmDialog'

export function DialogForm(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [horarioPoloChange, setHorarioPoloChange] = useState('')
  const [editValues, setEditValues] = useState({
    id: props.id,
    data: props.data,
    horario: horarioPoloChange,
    polo: props.polo,
  })
  const handleEditItem = () => {
    api
      .put('/atualizaragendamento', {
        id: editValues.id,
        data: editValues.data,
        horario: horarioPoloChange,
        polo: props.polo,
      })
      .then((res) => {
        alert('Atualizado com sucesso')
        window.location.replace('/dashboard')
      })
      .catch((err) => console.log(err.response.data.message))

    handleClose()
  }
  const handleDeleteItem = () => {
    api
      .delete(`/apagaragendamento/${editValues.id}`)
      .then((res) => {
        window.location.replace('/dashboard')
        alert('Deletado com sucesso')
      })
      .catch((err) => console.log(err))

    handleClose()
  }
  const handleChangeValues = (value: any) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [value.target.id]: value.target.value,
    }))
  }

  return (
    <>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            autoFocus
            margin="dense"
            label="Nome"
            defaultValue={props.name}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="data"
            label="Data"
            defaultValue={props.data}
            onChange={handleChangeValues}
            type="tel"
            fullWidth
            variant="standard"
          />

          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Horário
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="horario"
              value={horarioPoloChange}
              onChange={(e) => setHorarioPoloChange(e.target.value)}
              defaultValue={props.horario}
              label="Horario"
            >
              <MenuItem value="9:15:00">9:15</MenuItem>
              <MenuItem value="9:45:00">9:45</MenuItem>
              <MenuItem value="10:15:00">10:15</MenuItem>
              <MenuItem value="10:45:00">10:45</MenuItem>
              <MenuItem value="11:15:00">11:15</MenuItem>
              <MenuItem value="11:45:00">11:45</MenuItem>
              <MenuItem value="12:15:00">12:15</MenuItem>
              <MenuItem value="12:45:00">12:45</MenuItem>
              <MenuItem value="14:15:00">14:15</MenuItem>
              <MenuItem value="14:45:00">14:45</MenuItem>
              <MenuItem value="15:15:00">15:15</MenuItem>
              <MenuItem value="15:45:00">15:45</MenuItem>
              <MenuItem value="16:15:00">16:15</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              ':hover': {
                background: '#1B75D0',
                color: 'white',
              },
            }}
            endIcon={<IoMdClose />}
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setOpenConfirmDialog(true)}
            color="error"
            variant="outlined"
            sx={{
              ':hover': {
                background: 'red',
                color: 'white',
              },
            }}
            endIcon={<BsTrash />}
          >
            Excluir
          </Button>
          <Button
            onClick={handleEditItem}
            color="success"
            sx={{
              ':hover': {
                background: 'green',
                color: 'white',
              },
            }}
            variant="outlined"
            endIcon={<AiOutlineSave />}
          >
            Salvar
          </Button>
        </DialogActions>
        <AlertDialog
          titleDialogForm="Você deseja deletar o agendamento de: "
          onClick={handleDeleteItem}
          usuario={props.name}
          setOpen={setOpenConfirmDialog}
          open={openConfirmDialog}
        />
      </Dialog>
    </>
  )
}

export function DialogFormToDeleteAll(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [dateToRemove, setDateToRemove] = useState('')

  const handleDeleteAllDates = () => {
    api
      .post(`/deleteallagendamentos`, {
        dateToRemove,
      })
      .then((res) => {
        window.location.replace('/dashboard')
        alert('Datas deletadas com sucesso')
      })
  }
  return (
    <>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>INSIRA A DATA (DD/MM/YYYY)</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Data"
            value={dateToRemove}
            onChange={(e) => setDateToRemove(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              ':hover': {
                background: '#1B75D0',
                color: 'white',
              },
            }}
            endIcon={<IoMdClose />}
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setOpenConfirmDialog(true)}
            color="error"
            variant="outlined"
            disabled={dateToRemove === ''}
            sx={{
              ':hover': {
                background: 'red',
                color: 'white',
              },
            }}
            endIcon={<BsTrash />}
          >
            Excluir
          </Button>
        </DialogActions>
        <DialogConfirmToDeleteAll
          onClick={handleDeleteAllDates}
          setOpen={setOpenConfirmDialog}
          datesToDelete={dateToRemove}
          open={openConfirmDialog}
        />
      </Dialog>
    </>
  )
}

export function DialogFormToCreateRelatorio(props: any) {
  const [qrCode, setQrCode] = useState('')
  const handleClose = () => {
    props.setOpen(false)
  }
  const [dateToFind, setDateToFind] = useState('')

  const gerarPdf = async () => {
    const newDate = dateToFind.replace(/[/]/g, '-')

    await api
      .get(`/gerarpdf/${newDate}`)
      .then(
        async () =>
          await api
            .get(`/downloadpdf/${newDate}`)
            .then((res) => setQrCode(res.data)),
      )
  }
  const downloadPdf = () => {
    const linkSource = `data:application/pdf;base64,${qrCode}`
    const downloadLink = document.createElement('a')
    const fileName = `agendados(${dateToFind}).pdf`
    downloadLink.href = linkSource
    downloadLink.download = fileName
    downloadLink.click()
  }
  return (
    <>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>INSIRA A DATA (DD/MM/YYYY)</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Data"
            value={dateToFind}
            onChange={(e) => setDateToFind(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              ':hover': {
                background: '#1B75D0',
                color: 'white',
              },
            }}
            endIcon={<IoMdClose />}
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={gerarPdf}
            color="success"
            variant="outlined"
            disabled={dateToFind === ''}
            sx={{
              ':hover': {
                background: 'green',
                color: 'white',
              },
            }}
            endIcon={<BsTrash />}
          >
            GERAR
          </Button>
          <Button
            onClick={downloadPdf}
            color="secondary"
            variant="outlined"
            disabled={qrCode === ''}
            sx={{
              ':hover': {
                background: 'purple',
                color: 'white',
              },
            }}
            endIcon={<AiOutlineDownload />}
          >
            DOWNLOAD
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
