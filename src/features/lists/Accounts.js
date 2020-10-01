import React from 'react'
import { defGet, accounts, selectAccounts } from './listsSlice'
import Table from '../../component/Table'
import { useDispatch, useSelector } from 'react-redux'
import { wrapDispatcher } from '../../app/utils'

const title = 'اکانت ها'

const columns = [
  { name: 'نام', selector: 'fName', sortable: true },
  { name: 'نام خانوادگی', selector: 'lName', sortable: true },
  { name: 'شماره تلفن', selector: 'phoneNumber', sortable: true },
  { name: 'آدرس', selector: 'address', sortable: true },
  { name: 'ایمیل', selector: 'email', sortable: true }
]
const initData = columns.map(col => ({
  label: col.name,
  name: col.selector
}))

export default function AccountsList ({ onSelect, preSelected, singleSelect }) {
  const data = useSelector(selectAccounts)
  return (
    <Table
      title={title}
      columns={columns}
      initData={initData}
      data={defGet(data)}
      actions={wrapDispatcher(accounts, useDispatch())}
      onSelect={onSelect}
      preSelected={preSelected}
      singleSelect={singleSelect}
    />
  )
}
