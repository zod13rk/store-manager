import React from 'react'
import { defGet, payments, selectPayments } from './listsSlice'
import Table from '../../component/Table'
import { useDispatch, useSelector } from 'react-redux'
import { wrapDispatcher } from '../../app/utils'
import { List, ListItem } from '@material-ui/core'
import Stores from './Stores'

const title = 'پرداختی ها'
const list = (ar) => (
  <List>
    {ar.map((s, i) => (
      <ListItem key={i}>
        {s.fName} {s.lName}
      </ListItem>
    ))}
  </List>
)

const columns = [
  { name: 'از طرف', selector: 'from', cell: (row) => list(row.from) },
  { name: 'مبلغ', selector: 'money', sortable: true },
  { name: 'بانک', selector: 'bank', sortable: true },
  { name: 'شرح', selector: 'description', sortable: true }
]
const initData = columns.map((col) => ({
  label: col.name,
  name: col.selector,
  map: col.cell
}))

initData[0].value = [] // از
initData[0].table = (value, onChange) => (
  <Stores preSelected={value} onSelect={onChange} singleSelect />
)

export default function AccountsList ({ onSelect, preSelected, singleSelect }) {
  const data = useSelector(selectPayments)
  return (
    <Table
      title={title}
      columns={columns}
      initData={initData}
      data={defGet(data)}
      actions={wrapDispatcher(payments, useDispatch())}
      onSelect={onSelect}
      preSelected={preSelected}
      singleSelect={singleSelect}
    />
  )
}
