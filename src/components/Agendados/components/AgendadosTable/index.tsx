import { Button } from '@mui/material'
import { useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { DialogForm } from '../DialogForm'

export function AgendadosTable(props: any) {
  const [open, setOpen] = useState(false)
  const buttonClickEdit = () => {
    setOpen(true)
  }
  return (
    <>
      <DialogForm
        polo={props.polo}
        id={props.id}
        name={props.name}
        data={props.data}
        horario={props.horario}
        open={open}
        setOpen={setOpen}
      />
      <tr key={props.id}>
        <td>{props.name}</td>
        <td>{props.cpf}</td>
        <td>{props.patente}</td>
        <td>{props.telefone}</td>
        <td>{props.modelo}</td>
        <td>{props.lotacao}</td>
        <td>{props.polo}</td>
        <td>{props.data}</td>
        <td>{props.horario}</td>
        <td className="items-center">
          <Button
            onClick={() => {
              buttonClickEdit()
            }}
            className="mr-3"
          >
            <FiSettings color="#282957" />
          </Button>
        </td>
      </tr>
    </>
  )
}
