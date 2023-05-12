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

export function DialogForm(props: any) {
  const [newCpf, setNewCpf] = useState('')
  const handleRegisterNewCpf = () => {
    try {
      api.post('/inserirrgnovo', {
        novoRg: newCpf,
      })
      window.location.replace('/dashboard')
      alert('Cadastrado com sucesso')
    } catch (err) {
      alert('Ocorreu algum erro')
    }
  }
  const handleClose = () => {
    props.setOpen(false)
  }

  return (
    <>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>CADASTRAR NOVO CPF</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="INSIRA CPF"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewCpf(e.target.value)}
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
            onClick={handleRegisterNewCpf}
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
