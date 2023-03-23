import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import api from '../../../../services/api'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export default function DialogForm(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    handleClose()
  }
  const handleDeleteItem = () => {
    api
      .delete(`/apagaragendamento/${editValues.id}`)
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
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDeleteItem} color="error" variant="outlined">
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
