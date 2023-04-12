import axios from 'axios'
import { TableBase } from '../TableBase'
import { TableContent } from './TableContent'
import { useEffect, useState } from 'react'
export function CpfRegister() {
  const [cpfs, setCpfs] = useState<any[]>([])
  useEffect(() => {
    const getAllCpf = async () => {
        try {
            api.get('/getallcpf')
        }catch(err)
    }
  }, [])
  const rowsHeader = [{ name: 'CPF' }]
  return (
    <TableBase paginationActive={false} rowsHeader={rowsHeader}>
      <TableContent />
    </TableBase>
  )
}
