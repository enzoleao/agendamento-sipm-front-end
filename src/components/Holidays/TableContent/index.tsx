import { Button } from '@mui/material'
import { useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { DialogFormEditItem } from '../DialogForm'

export function TableContent(props: any) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <tr key={props.id}>
        <td>{props.feriado}</td>
        <td>{props.data}</td>
        <td className="items-center">
          <Button onClick={() => setOpen(true)} className="mr-3">
            <FiSettings color="#282957" />
          </Button>
        </td>
      </tr>
      <DialogFormEditItem
        id={props.id}
        feriado={props.feriado}
        data={props.data}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}
