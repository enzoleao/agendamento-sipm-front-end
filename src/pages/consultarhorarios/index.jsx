import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Brasao from '../../assets/brasao_dgp.png'
import Consultarvagas from './components/Consultarvagas'
import Consultaragendamento from './components/Consultaragendamento'
import { Link } from 'react-router-dom'

export function ConsultarHorarios() {
  const [consulta, setConsulta] = React.useState(1)

  const handleChange = (event) => {
    setConsulta(event.target.value)
  }

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center">
      <img
        src={Brasao}
        style={{ width: '200px', height: '200px' }}
        alt="test"
      ></img>
      <FormControl>
        <FormLabel
          id="demo-controlled-radio-buttons-group"
          sx={{ textAlign: 'center' }}
        >
          Selecione
        </FormLabel>
        <div className="flex min-w-full justify-center items-center p-3 sm:p-0">
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={consulta}
            onChange={handleChange}
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Consultar vagas"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Consultar agendamento"
            />
          </RadioGroup>
        </div>
        <div className="w-full flex justify-center">
          <FormLabel
            id="demo-controlled-radio-buttons-group"
            sx={{ textAlign: 'center' }}
          >
            Deseja realizar seu agendamento?
          </FormLabel>
          <Link to="/">
            <h6 className="hover:underline hover:text-blue-300">
              Clique aqui!
            </h6>
          </Link>
        </div>
      </FormControl>
      <div className="min-w-full sm:min-w-[34rem] min-h-[37rem] flex justify-center items-center shadow shadow-xl mb-[3rem] rounded-md">
        {consulta === 1 ? <Consultarvagas /> : <Consultaragendamento />}
      </div>
    </div>
  )
}
