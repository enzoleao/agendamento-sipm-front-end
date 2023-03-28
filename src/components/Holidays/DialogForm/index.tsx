import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import api from '../../../services/api'
import { useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { AiOutlineSave } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { DialogContentText } from '@mui/material'

export function DialogForm(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  const [feriado, setFeriado] = useState('')
  const [data, setData] = useState('')

  const handleCreateHoliday = () => {
    try {
      api.post('/cadastrarferiado', {
        feriado,
        data,
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          Cadastrar feriado
        </DialogTitle>
        <DialogContentText sx={{ textAlign: 'center' }}>
          Inserir data no formato DD/MM/YYYY
        </DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            value={feriado}
            onChange={(e) => setFeriado(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="data"
            label="Data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            type="tel"
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
            color="success"
            sx={{
              ':hover': {
                background: 'green',
                color: 'white',
              },
            }}
            variant="outlined"
            onClick={handleCreateHoliday}
            endIcon={<AiOutlineSave />}
          >
            CADASTRAR
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export function DialogFormEditItem(props: any) {
  const [feriado, setFeriado] = useState(props.feriado)
  const [data, setData] = useState(props.data)
  const handleClose = () => {
    props.setOpen(false)
  }
  const handleEditItem = () => {
    api
      .put(`/atualizarFeriado/${props.id}`, {
        feriado,
        data,
      })
      .then((res) => alert('Alterado com sucesso'))
  }
  const handleDeleteItem = () => {
    api
      .delete(`/deletarFeriado/${props.id}`)
      .then((res) => alert('Deletado com sucesso'))
  }
  return (
    <>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar feriado</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            value={feriado}
            onChange={(e) => setFeriado(e.target.value)}
            defaultValue={feriado}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="data"
            label="Data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            defaultValue={data}
            type="tel"
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
            color="error"
            sx={{
              ':hover': {
                background: 'red',
                color: 'white',
              },
            }}
            variant="outlined"
            endIcon={<BsTrash />}
            onClick={handleDeleteItem}
          >
            EXCLUIR
          </Button>
          <Button
            color="success"
            sx={{
              ':hover': {
                background: 'green',
                color: 'white',
              },
            }}
            variant="outlined"
            endIcon={<AiOutlineSave />}
            onClick={handleEditItem}
          >
            SALVAR
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
