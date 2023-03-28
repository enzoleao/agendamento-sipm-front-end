import styles from './TableBase.module.scss'

interface TableBaseProps {
  children?: any
  rowsHeader?: any
  itensPerPage?: any
  currentItens?: any
  currentPage?: any
  setCurrentPage?: any
  pages?: any
  totalItens?: any
  paginationActive: boolean
}

export function TableBase(props: TableBaseProps) {
  const headerInfo = props.rowsHeader
  return (
    <div className={styles.divTableWithOverflow}>
      <table className="w-full text-sm text-left  rounded-md">
        <thead className="text-xs uppercase bg-principal-color ">
          <tr className="text-start ">
            {typeof headerInfo !== 'undefined' &&
              headerInfo.map((infos: any) => {
                return (
                  <th
                    key={infos.name}
                    scope="col"
                    className="px-6 py-3 text-white "
                  >
                    {infos.name}
                  </th>
                )
              })}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
      {props.paginationActive ? (
        <footer>
          <p className={styles.countPagesResults}>
            Mostrando 1 - {props.itensPerPage} de {props.totalItens?.length}
          </p>
          <div className={styles.buttonSectionFooter}>
            <button
              className={`${
                props.currentPage === 0 ? 'cursor-not-allowed' : false
              }`}
              disabled={props.currentPage === 0}
              onClick={() => props.setCurrentPage(props.currentPage - 1)}
            >
              {'<'}
            </button>
            <p>{props.currentPage + 1}</p>
            <button
              className={`${
                props.currentPage + 1 === props.pages
                  ? 'cursor-not-allowed'
                  : false
              }`}
              disabled={props.currentPage + 1 === props.pages}
              onClick={() => props.setCurrentPage(props.currentPage + 1)}
            >
              {'>'}
            </button>
          </div>
        </footer>
      ) : (
        false
      )}
    </div>
  )
}
