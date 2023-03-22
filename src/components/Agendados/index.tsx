import { useEffect, useState } from 'react'
import api from '../../services/api'
import { AgendadosTable } from './components/AgendadosTable'
import styles from './Agendados.module.scss'
export function Agendados() {
  useEffect(() => {
    const getAllCpf = async () => {
      try {
        const response = await api.get('/getinfo')
        setAgendados(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllCpf()
  }, [])
  const [agendados, setAgendados] = useState<any[]>([])
  const itensPerPage = 8
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const pages = Math.ceil(agendados.length / itensPerPage)

  const currentItens = agendados.slice(startIndex, endIndex)

  return (
    <div className={styles.agendadosContent}>
      <div className={styles.tableSection}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Patente</th>
              <th>Telefone</th>
              <th>Modelo</th>
              <th>Lotacao</th>
              <th>Polo</th>
              <th>Data</th>
              <th>Horário</th>
            </tr>
          </thead>
          <tbody>
            {typeof currentItens !== 'undefined' &&
              currentItens.map((users) => {
                console.log(users)
                return (
                  <AgendadosTable
                    key={users.id}
                    name={users.nome}
                    cpf={users.rg}
                    patente={users.patente}
                    telefone={users.telefone}
                    modelo={users.modelo}
                    lotacao={users.lotacao}
                    polo={users.polo}
                    data={users.data}
                    horario={users.horario}
                  />
                )
              })}
          </tbody>
        </table>
      </div>

      <footer>
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {'<'}
        </button>
        <p>{currentPage + 1}</p>
        <button
          disabled={currentPage + 1 === pages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {'>'}
        </button>
      </footer>
    </div>
  )
}
