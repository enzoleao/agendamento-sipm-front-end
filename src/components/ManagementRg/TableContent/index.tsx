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
      <tr
        key={props.id}
        className="bg-white font-medium  text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 pointer"
      >
        <td className="p-2 w-[10%]">{props.rg}</td>
        <td className="p-2 w-[40%]">{props.portador}</td>
        <td className="p-2 ">{props.gerador}</td>
        <td className="p-2 ">{props.alteradoBy}</td>
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
