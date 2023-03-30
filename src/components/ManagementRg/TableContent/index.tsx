import { Button } from '@mui/material'
import { useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { DialogForm } from '../DialogForm'

export function TableContet(props: any) {
  const [open, setOpen] = useState(false)
  const buttonClickEdit = () => {
    setOpen(true)
  }
  return (
    <>
      <tr key={props.id}>
        <td className="w-[10%]">{props.rg}</td>
        <td className="w-[40%]">{props.portador}</td>
        <td>{props.gerador}</td>
        <td>{props.alteradoBy}</td>
        <td>
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
        rg={props.rg}
        setOpen={setOpen}
        id={props.id}
        name={props.portador}
        open={open}
      />
    </>
  )
}
