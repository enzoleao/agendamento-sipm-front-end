import { Button } from '@mui/material'
import { FiSettings } from 'react-icons/fi'

export function TableContent(props: any) {
  return (
    <tr
      key={props.id}
      className="bg-white font-medium  text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 pointer"
    >
      <td className="p-2 ">{props.feriado}</td>
      <td className="p-2 ">{props.data}</td>
      <td className="p-2 items-center">
        <Button className="mr-3">
          <FiSettings color="#282957" />
        </Button>
      </td>
    </tr>
  )
}
