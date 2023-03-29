import { Button } from '@mui/material'
import { useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { DialogForm } from '../DialogForm'

export function TableContent(props: any) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <tr key={props.id}>
        <td className="w-[10%]">{props.polo}</td>
        <td className="w-[40%]">{props.vagas}</td>
        <td>{props.ativado === false ? 'Sim' : 'Nao'}</td>
        <td className="items-center">
          <Button onClick={() => setOpen(true)} className="mr-3">
            <FiSettings color="#282957" />
          </Button>
        </td>
      </tr>
      <DialogForm
        id={props.id}
        vagas={props.vagas}
        ativado={props.ativado}
        polo={props.polo}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}
