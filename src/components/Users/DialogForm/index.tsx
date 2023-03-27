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
import { AlertDialog } from '../../ConfirmDialog'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export function DialogForm(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [admin, setAdmin] = useState(props.admin)
  const [editValues, setEditValues] = useState({
    name: props.name,
  })
  const handleEditItem = () => {
    api
      .put('/atualizarportador', {
        id: props.id,
        name: editValues.name,
      })
      .then((res) => alert('Atualizado com sucesso'))
      .catch((err) => console.log(err.response.data.message))

    handleClose()
  }
  const handleDeleteItem = () => {
    api
      .delete(`/deletarrggerado/${props.id}`)
      .then((res) => {
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
            autoFocus
            margin="dense"
            label="USUARIO"
            disabled
            defaultValue={props.usuario}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Ativado
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id=""
              value={admin}
              onChange={(e) => setAdmin(e.target.value)}
              label="Ativado"
              defaultValue={admin}
            >
              <MenuItem value={true}>Sim</MenuItem>
              <MenuItem value={false}>Falso</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Redefinir senha"
            id="name"
            onChange={handleChangeValues}
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
          onClick={handleDeleteItem}
          name={props.name}
          setOpen={setOpenConfirmDialog}
          open={openConfirmDialog}
        />
      </Dialog>
    </>
  )
}
export function DialogFormToCreateNewUser(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  const [admin, setAdmin] = useState(props.admin)
  const [editValues, setEditValues] = useState({
    name: props.name,
  })

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
            autoFocus
            margin="dense"
            label="Nome do Usuário"
            defaultValue={props.usuario}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Ativado
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id=""
              value={admin}
              onChange={(e) => setAdmin(e.target.value)}
              label="Ativado"
              defaultValue={admin}
            >
              <MenuItem value={true}>Sim</MenuItem>
              <MenuItem value={false}>Falso</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Redefinir senha"
            id="name"
            onChange={handleChangeValues}
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
            CADASTRAR
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
