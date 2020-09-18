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
  { name: 'مدیر', selector: 'manager', sortable: true },
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
  name: col.selector
}))
initData[2].form = (value, onChange) => <Accounts preSelected={value} onSelect={onChange} /> // فروشندگان
initData[2].value = [] // فروشندگان

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
export default function StoresList () {
  const data = useSelector(selectStores)
  const accounts = useSelector(selectAccounts)
  console.log(data)
  return (
    <Table
      title={title}
      columns={columns}
      initData={initData}
      actions={wrapDispatcher(stores, useDispatch())}
      data={convert(data, accounts)}
    />
  )
}
