/* eslint-disable  */
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import styles from './Notices.module.scss'

export function Notices() {
  const [header, setHeader] = useState('')
  const [aviso, setAviso] = useState('')
  const [ativacaoAviso, setAtivacaoAviso] = useState(false)
  useEffect(() => {
    const getAllFeriados = async () => {
      try {
        const response = await api.get('/getavisos')
        setHeader(response.data[0].header)
        setAviso(response.data[0].aviso)
        setAtivacaoAviso(response.data[0].ativado)
      } catch (err) {
        console.log(err)
      }
    }
    getAllFeriados()
  }, [])
  const handlEditAlert = () => {
    api
      .put('/cadastraraviso', {
        value: !!aviso,
        header: aviso,
        ativado: ativacaoAviso,
      })
      .then(() => alert('Atualizado com sucesso'))
  }
  return (
    <div className={styles.noticesContainer}>
      <form action="">
        <TextField
          id="filled-helperText"
          label="Titulo do aviso"
          value={header}
          required
          onChange={(e) => setHeader(e.target.value)}
          variant="filled"
          sx={{
            width: '100%',
            maxWidth: '420px',
            height: '44px',
          }}
        />
        <TextField
          id="filled-textarea"
          label="Aviso"
          placeholder="Insira o aviso"
          multiline
          required
          value={aviso}
          onChange={(e) => setAviso(e.target.value)}
          variant="filled"
          sx={{ width: '100%', maxWidth: '420px' }}
        />

        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 120, width: '100%', maxWidth: '420px' }}
        >
          <InputLabel id="demo-simple-select-filled-label">
            Aviso ativado
          </InputLabel>

          <Select
            required
            labelId="demo-simple-select-filled-label"
            value={+ativacaoAviso}
            onChange={(e: any) => setAtivacaoAviso(e.target.value)}
          >
            {/* eslint-disable */}
            <MenuItem value={1}>Sim</MenuItem>
            <MenuItem value={0}>Não</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handlEditAlert}
          sx={{
            width: '100%',
            maxWidth: '420px',
            height: '42px',
            color: '#282957',
            borderColor: '#282957',
            ':hover': {
              border: 'none',
              backgroundColor: '#292963',
              color: 'white',
            },
          }}
          variant="outlined"
        >
          SALVAR
        </Button>
      </form>
    </div>
  )
}
