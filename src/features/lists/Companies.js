import React from 'react'
import MaterialTable from 'material-table'
import { accounts, selectAccounts } from './listsSlice'
import { useSelector } from 'react-redux'
import { wrapDispatcher } from '../../app/utils'

const title = 'شرکت ها'

const columns = [
  { title: 'نام', field: 'name' },
  { title: 'شماره تلفن', field: 'phoneNumber' },
  { title: 'آدرس', field: 'address' },
  { title: 'ایمیل', field: 'email', type: 'email' },
  { title: 'آدرس وبسایت', field: 'website' },
  { title: 'Tel', field: 'tel' },
  { title: 'Fax', field: 'fax' }
]
export default function CompaniesList () {
  const data = useSelector(selectAccounts)
  const { add, remove, update } = wrapDispatcher(accounts)
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) => add(newData),
        onRowUpdate: (newData, oldData) => update({ data: newData, id: oldData.id }),
        onRowDelete: (oldData) => remove(oldData.id)
      }}
    />
  )
}
