import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import api from '../../../../services/api'

export default function DialogForm(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  const [editValues, setEditValues] = useState({
    id: props.id,
    data: props.data,
    horario: props.horario,
    polo: props.polo,
  })
  const handleEditItem = () => {
    api
      .put('/atualizaragendamento', {
        id: editValues.id,
        data: editValues.data,
        horario: editValues.horario,
        polo: props.polo,
      })
      .then((res) => console.log(res))
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
          <TextField
            autoFocus
            margin="dense"
            id="horario"
            label="Horario"
            defaultValue={props.horario}
            onChange={handleChangeValues}
            type="tel"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="error" variant="outlined">
            Excluir
          </Button>
          <Button onClick={handleEditItem} color="success" variant="outlined">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
