import React, { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Radio, Checkbox } from '@material-ui/core'
import DataTable from 'react-data-table-component'
import IconButton from '@material-ui/core/IconButton'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import { Form } from './Form'

const editColmun = (edit, val, setRow) => ({
  button: true,
  cell: row => (
    <Button
      color='primary'
      onClick={() => {
        edit(!val)
        setRow(row)
      }}
    >
      {val ? <LibraryAddCheckIcon /> : <EditIcon />}
    </Button>
  )
})
const removeColmun = remove => ({
  button: true,
  cell: row => (
    <Button color='primary' onClick={() => remove(row.id)}>
      <DeleteIcon />
    </Button>
  )
})
const dateColumn = {
  name: 'تاریخ ثبت',
  cell: row => ((typeof row.regDate === 'string') ? (new Date(row.regDate)) : row.regDate).toLocaleDateString('fa')
}

export default function TableData ({
  title,
  initData,
  columns,
  actions,
  data,
  onSelect,
  preSelected,
  singleSelect,
  noDate
}) {
  const { add, remove, update } = actions
  const [openAddForm, setOpenAddForm] = useState(false)
  const [openEditForm, setOpenEditForm] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})
  const [selectedRows, setSelcetedRows] = useState(preSelected || [])
  !noDate && (columns = columns.concat([dateColumn]))
  columns = columns.concat([
    editColmun(setOpenEditForm, openEditForm, setSelectedRow),
    removeColmun(remove)
  ])
  return (
    <div>
      <DataTable
        subHeader
        subHeaderAlign='left'
        subHeaderComponent={
          <h1>
            {title}
            <IconButton color='primary' onClick={() => setOpenAddForm(true)}>
              <Fab size='medium' color='primary' aria-label='add'>
                <AddIcon />
              </Fab>
            </IconButton>
          </h1>
        }
        data={data}
        columns={columns}
        fixedHeader
        highlightOnHover
        responsive
        noDataComponent='لطفا آیتمی را اضافه کنید !!'
        contextMessage={{ singular: 'مورد', plural: 'مورد', message: 'انتخاب شد' }}
        selectableRows={!!onSelect}
        onSelectedRowsChange={({ selectedRows: rows }) => {
          if (singleSelect) {
            console.log(rows)
            const row0 = rows[0]
            const rs = row0 ? [row0] : []
            setSelcetedRows(rs)
            onSelect(rs)
          } else onSelect(rows)
        }}
        selectableRowSelected={(selectedRows.length > 0) && (row => selectedRows.some(({ id }) => id === row.id))}
        selectableRowsComponent={singleSelect ? Radio : Checkbox}
        selectableRowsNoSelectAll
      />
      <Dialog fullWidth maxWidth='md' onClose={() => setOpenAddForm(false)} open={openAddForm}>
        <DialogTitle divider>اضافه کردن آیتم جدید</DialogTitle>
        <DialogContent dividers>
          <Form
            initData={initData}
            submit={add}
            actionName='افزودن'
            cancel={() => setOpenAddForm(false)}
          />
        </DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth='md' onClose={() => setOpenEditForm(false)} open={openEditForm}>
        <DialogTitle>تغییر آیتم </DialogTitle>
        <DialogContent dividers>
          <Form
            initData={initData.map(d => ({ ...d, value: selectedRow[d.name] }))}
            submit={vals => update({ ...vals, id: selectedRow.id, regDate: selectedRow.regDate })}
            actionName='تغییر'
            cancel={() => setOpenEditForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
