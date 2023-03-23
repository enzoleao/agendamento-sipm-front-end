import { Button } from '@mui/material'
import { useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import DialogForm from '../DialogForm'

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
      <tr
        key={props.id}
        className="bg-white font-medium  text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 pointer"
      >
        <td className="p-2 ">{props.name}</td>
        <td className="p-2 ">{props.cpf}</td>
        <td className="p-2 ">{props.patente}</td>
        <td className="p-2 ">{props.telefone}</td>
        <td className="p-2 ">{props.modelo}</td>
        <td className="p-2 ">{props.lotacao}</td>
        <td className="p-2 ">{props.polo}</td>
        <td className="p-2">{props.data}</td>
        <td className="p-2">{props.horario}</td>
        <td className="p-2 items-center">
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
