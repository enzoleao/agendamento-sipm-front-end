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

export function DialogForm(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
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
            label="RG"
            disabled
            defaultValue={props.rg}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            id="name"
            defaultValue={props.name}
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
          titleDialogForm="Você deseja deseja deletar mesmo: "
          onClick={handleDeleteItem}
          usuario={props.name}
          setOpen={setOpenConfirmDialog}
          open={openConfirmDialog}
        />
      </Dialog>
    </>
  )
}
export function DialogFormToCreateNewRg(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }
  const [name, setName] = useState('')

  const handleCreateNewPort = () => {
    api
      .post('/gerarrg', {
        name,
      })
      .then((res) => alert('RG Cadastrado com sucesso'))
  }
  return (
    <>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>CADASTRAR NOVO PORTADOR DE RG</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            onChange={(e) => setName(e.target.value)}
            sx={{ minWidth: '380px' }}
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
            onClick={handleCreateNewPort}
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
