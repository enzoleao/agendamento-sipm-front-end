import { Button } from '@mui/material'
import { useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { DialogForm } from '../DialogForm'

export function TableContent(props: any) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <tr
        key={props.id}
        className="bg-white font-medium  text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 pointer"
      >
        <td className="p-2 w-[10%]">{props.polo}</td>
        <td className="p-2 w-[40%]">{props.vagas}</td>
        <td className="p-2 ">{props.ativado}</td>
        <td className="p-2 items-center">
          <Button onClick={() => setOpen(true)} className="mr-3">
            <FiSettings color="#282957" />
          </Button>
        </td>
      </tr>
      <DialogForm
        vagas={props.vagas}
        ativado={props.ativado}
        polo={props.polo}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}
