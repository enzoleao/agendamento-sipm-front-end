import styles from './TableBase.module.scss'

interface TableBaseProps {
  children: any
  rowsHeader: any
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
    </div>
  )
}
