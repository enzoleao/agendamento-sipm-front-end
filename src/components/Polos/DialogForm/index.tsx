import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import api from '../../../services/api'
import { useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export function DialogForm(props: any) {
  const [vagas, setVagas] = useState(props.vagas)
  const [ativado, setAtivado] = useState(props.ativado)
  const handleEditItem = () => {
    api
      .put(`/atualizarPolo/${props.id}`, {
        vagas,
        ativado: !!ativado,
      })
      .then((res) => alert('Atualizado com sucesso'))
      .catch((err) => console.log(err.response.data.message))

    handleClose()
  }
  const handleClose = () => {
    props.setOpen(false)
  }

  return (
    <>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="POLO"
            disabled
            defaultValue={props.polo}
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Vagas por horário
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="vagas"
              value={vagas}
              onChange={(e) => setVagas(e.target.value)}
              defaultValue={vagas}
              label="Vagas"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Ativado
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id=""
              value={+ativado}
              onChange={(e) => setAtivado(e.target.value)}
              label="Ativado"
              defaultValue={ativado}
            >
              <MenuItem value={0}>Sim</MenuItem>
              <MenuItem value={1}>Falso</MenuItem>
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
      </Dialog>
    </>
  )
}
