import React from 'react'
import { defGet, companies, selectCompanies } from './listsSlice'
import Table from '../../component/Table'
import { useDispatch, useSelector } from 'react-redux'
import { wrapDispatcher } from '../../app/utils'

const title = 'شرکت ها'

const columns = [
  { name: 'نام', selector: 'name', sortable: true },
  { name: 'شماره تلفن', selector: 'phoneNumber', sortable: true },
  { name: 'آدرس', selector: 'address', sortable: true },
  { name: 'ایمیل', selector: 'email', type: 'email', sortable: true },
  { name: 'آدرس وبسایت', selector: 'website', sortable: true },
  { name: 'Tel', selector: 'tel', sortable: true },
  { name: 'Fax', selector: 'fax', sortable: true }
]
const initData = columns.map(col => ({
  label: col.name,
  name: col.selector
}))

export default function AccountsList ({ onSelect, preSelected, singleSelect }) {
  const data = useSelector(selectCompanies)
  return (
    <Table
      title={title}
      columns={columns}
      initData={initData}
      data={defGet(data)}
      actions={wrapDispatcher(companies, useDispatch())}
      onSelect={onSelect}
      preSelected={preSelected}
      singleSelect={singleSelect}
    />
  )
}
