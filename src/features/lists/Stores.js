import React from 'react'
import { stores, selectStores, selectAccounts } from './listsSlice'
import Table from '../../component/Table'
import { List, ListItem } from '@material-ui/core'
import Accounts from './Accounts'
import { useSelector, useDispatch } from 'react-redux'
import { wrapDispatcher } from '../../app/utils'

const title = 'فروشگاه ها'
const columns = [
  { name: 'نام', selector: 'name', sortable: true },
  {
    name: 'مدیر',
    selector: 'manager',
    cell: row => (
      <List>
        {row.manager.map((s, i) => (
          <ListItem key={i}>
            {s.fName} {s.lName}
          </ListItem>
        ))}
      </List>
    )
  },
  {
    name: 'فروشندگان',
    selector: 'staffs',
    cell: row => (
      <List>
        {row.staffs.map((s, i) => (
          <ListItem key={i}>
            {s.fName} {s.lName}
          </ListItem>
        ))}
      </List>
    )
  },
  { name: 'آدرس', selector: 'address', sortable: true }
]
const initData = columns.map(col => ({
  label: col.name,
  name: col.selector,
  map: col.cell
}))
initData[1].value = [] // مدیر
initData[1].table = (value, onChange) => <Accounts preSelected={value} onSelect={onChange} singleSelect />

initData[2].value = [] // فروشندگان
initData[2].table = (value, onChange) => <Accounts preSelected={value} onSelect={onChange} /> // فروشندگان

function convert (data, accounts) {
  return Object.keys(data).map(id => ({
    ...data[id],
    staffs: data[id].staffs.reduce((r, id) => {
      const ac = accounts[id]
      if (ac) r.push(ac)
      return r
    }, [])
  }))
}
export default function StoresList ({ onSelect, preSelected, singleSelect }) {
  const data = useSelector(selectStores)
  const accounts = useSelector(selectAccounts)
  return (
    <Table
      title={title}
      columns={columns}
      initData={initData}
      actions={wrapDispatcher(stores, useDispatch())}
      data={convert(data, accounts)}
      onSelect={onSelect}
      preSelected={preSelected}
      singleSelect={singleSelect}
    />
  )
}
