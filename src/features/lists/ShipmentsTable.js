import React, { useState } from 'react'
import Table from '../../component/Table'
import Stuffs from './Stuffs'
import { genId } from '../../app/utils'
import { List, ListItem } from '@material-ui/core'

const title = 'انتقالات'
const columns = [
  { name: 'نام کالا', selector: 'name', sortable: true },
  { name: 'تعداد', selector: 'amount', sortable: true },
  { name: 'فی خرید', selector: 'cost', sortable: true },
  { name: 'جمع خرید', selector: 'tCost', sortable: true },
  { name: 'فی فروش', selector: 'price', sortable: true },
  { name: 'جمع فروش', selector: 'tPrice', sortable: true },
  { name: 'سود', selector: 'profit', sortable: true },
  { name: 'درصد سود', selector: 'tProfit', sortable: true }
]
const initData = [
  { label: 'کالا', name: 'stuff' },
  { label: 'تعداد', name: 'amount' }
]
initData[0].value = [] // کالا
initData[0].map = row => (
  <List>
    {row.stuff.map((s, i) => (
      <ListItem key={i}>
        {s.name} {s.amount}
      </ListItem>
    ))}
  </List>
)
initData[0].table = (value, onChange) => <Stuffs preSelected={value} onSelect={onChange} singleSelect />

export default function StoresList ({
  data,
  onChange
}) {
  const [rdata, setRdata] = useState(data || [])
  return (
    <Table
      title={title}
      columns={columns}
      initData={initData}
      data={rdata}
      actions={{
        add ({ stuff: [{ name, cost, price, id: stuffId }], amount }) {
          const profit = price / cost - 1
          const newRows = [
            ...rdata,
            {
              name,
              cost,
              price,
              amount,
              profit,
              tCost: amount * cost,
              tPrice: amount * price,
              tProfit: profit * 100,
              id: genId(),
              stuffId
            }
          ]
          onChange(newRows)
          setRdata(newRows)
        },
        remove (id) {
          const removedRowIndex = rdata.findIndex(row => row.id === id)
          rdata.splice(removedRowIndex, 1)
          onChange(rdata)
          setRdata(rdata)
        },
        update ({ id, stuff: { name, cost, price, id: stuffId }, amount }) {
          const rowIndex = rdata.findIndex(row => row.id === id)
          const profit = price / cost - 1
          rdata[rowIndex] = {
            name,
            cost,
            price,
            amount,
            profit,
            tCost: amount * cost,
            tPrice: amount * price,
            tProfit: profit * 100,
            id,
            stuffId
          }
          onChange(rdata)
          setRdata(rdata)
        }
      }}
      noDate
    />
  )
}
