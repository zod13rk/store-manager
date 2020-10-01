import React from 'react'
import { defGet, stuffs, selectStuffs } from './listsSlice'
import Table from '../../component/Table'
import { useDispatch, useSelector } from 'react-redux'
import { wrapDispatcher } from '../../app/utils'
import Companies from './Companies'
import { List, ListItem } from '@material-ui/core'

const title = 'اجناس'

const columns = [
  { name: 'نام', selector: 'name', sortable: true },
  { name: 'فی خرید', selector: 'cost', sortable: true },
  { name: 'فی فروش', selector: 'price', sortable: true },
  {
    name: 'شرکت',
    selector: 'companies',
    cell: (row) => (
      <List>
        {row.companies.map((s, i) => (
          <ListItem key={i}>
            {s.fName} {s.lName}
          </ListItem>
        ))}
      </List>
    )
  },
  { name: 'تولید', selector: 'proDate', type: 'Date', sortable: true },
  { name: 'انقضا', selector: 'proDate', type: 'Date', sortable: true }
]

const initData = columns.map((col) => ({
  label: col.name,
  name: col.selector,
  map: col.cell
}))

initData[3].value = [] //  شرکت
initData[3].table = (value, onChange) => (
  <Companies preSelected={value} onSelect={onChange} singleSelect />
)

export default function AccountsList ({ onSelect, preSelected, singleSelect }) {
  const data = useSelector(selectStuffs)
  return (
    <Table
      title={title}
      columns={columns}
      initData={initData}
      data={defGet(data)}
      actions={wrapDispatcher(stuffs, useDispatch())}
      onSelect={onSelect}
      preSelected={preSelected}
      singleSelect={singleSelect}
    />
  )
}
