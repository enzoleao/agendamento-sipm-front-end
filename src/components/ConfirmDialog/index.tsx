import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export function AlertDialog(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.titleDialogForm}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: 'center' }}
            id="alert-dialog-description"
          >
            {props.usuario}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            CANCELAR
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={props.onClick}
            autoFocus
          >
            APAGAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export function DialogConfirmToDeleteAll(props: any) {
  const handleClose = () => {
    props.setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`VOCÊ DESEJA MESMO APAGAR TODOS OS AGENDAMENTOS DE: ${props.datesToDelete}?`}
        </DialogTitle>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            CANCELAR
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={props.onClick}
            autoFocus
          >
            APAGAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
