import { Button } from '@mui/material'
import { useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { DialogForm } from '../DialogForm'

export function TableContent(props: any) {
  const [open, setOpen] = useState(false)
  const buttonClickEdit = () => {
    setOpen(true)
  }
  return (
    <>
      <tr key={props.id}>
        <td className="w-[10%]">{props.usuarios}</td>
        <td className="w-[40%]">{props.admin === true ? 'Sim' : 'Nao'}</td>
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
      <DialogForm
        id={props.id}
        usuario={props.usuarios}
        open={open}
        admin={props.admin}
        setOpen={setOpen}
      />
    </>
  )
}
