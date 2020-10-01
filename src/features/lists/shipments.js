import React from 'react'
import { shipments, selectShipments, selectStuffs } from './listsSlice'
import Table from '../../component/Table'
import Stores from './Stores'
import { useSelector, useDispatch } from 'react-redux'
import { wrapDispatcher, genId } from '../../app/utils'
import ShipmentsTable from './ShipmentsTable'
import { List, ListItem } from '@material-ui/core'

const title = 'انتقالات'
const columns = [
  {
    name: 'به',
    selector: 'to',
    cell: row => (
      <List>
        {row.to.map((s, i) => (
          <ListItem key={i}>
            {s.name} {s.amount}
          </ListItem>
        ))}
      </List>
    )
  },
  {
    name: 'اجناس',
    selector: 'stuffs',
    cell: row => (
      <List>
        {row.stuffs.slice(0, 3).map((s, i) => (
          <ListItem key={i}>
            {s.name} {s.amount}
          </ListItem>
        ))}
      </List>
    )
  },
  { name: 'شرح', selector: 'description', sortable: true }
]
const initData = columns.map((col) => ({
  label: col.name,
  name: col.selector,
  map: col.cell
}))
initData[0].value = [] // فروشگاه
initData[0].table = (value, onChange) => (
  <Stores preSelected={value} onSelect={onChange} singleSelect />
)
initData[1] = {
  ...initData[1],
  value: [],
  inputTable: (value, onChange) => (
    <ShipmentsTable data={value} onChange={onChange} />
  )
}
function convert (data, stuffs) {
  return Object.keys(data).map(id => ({
    ...data[id],
    stuffs: data[id].stuffs.reduce((r, { id, amount }) => {
      const st = stuffs[id]
      if (st) {
        const { name, cost, price } = st
        const profit = price / cost - 1
        r.push({
          name,
          cost,
          price,
          amount,
          profit,
          tCost: amount * cost,
          tPrice: amount * price,
          tProfit: profit * 100,
          id: genId(),
          stuffId: id
        })
      }
      return r
    }, [])
  }))
}
export default function StoresList ({ onSelect, preSelected, singleSelect }) {
  const data = useSelector(selectShipments)
  const stuffs = useSelector(selectStuffs)
  return (
    <Table
      title={title}
      columns={columns}
      initData={initData}
      data={convert(data, stuffs)}
      actions={wrapDispatcher(shipments, useDispatch())}
      onSelect={onSelect}
      preSelected={preSelected}
      singleSelect={singleSelect}
    />
  )
}
