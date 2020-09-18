import { createSlice } from '@reduxjs/toolkit'
import { genId } from '../../app/utils'

const listNames = [
  'stores',
  'accounts',
  'stuffs',
  'companies',
  'shipments',
  'payments'
]
const normalize = {
  stores (value) {
    return { ...value, staffs: value.staffs.map(staff => staff.id) }
  }
}
export const lists = createSlice({
  name: 'lists',
  initialState: listNames.reduce((p, listName) => {
    p[listName] = {}
    return p
  }, {}),
  reducers: {
    add (state, action) {
      const { listName, value } = action.payload
      value.id = genId()
      const set = normalize[listName]
      state[listName][value.id] = (set && set(value)) || value
    },
    update (state, action) {
      const { listName, value } = action.payload
      const set = normalize[listName]
      state[listName][value.id] = (set && set(value)) || value
    },
    remove (state, action) {
      const { listName, value } = action.payload
      delete state[listName][value]
    }
  }
})
const actions = {}
listNames.map(
  listName =>
    (actions[listName] = Object.keys(lists.actions).reduce((p, type) => {
      p[type] = value => lists.actions[type]({ value, listName })
      return p
    }, {}))
)
export const {
  stores,
  accounts,
  stuffs,
  companies,
  shipments,
  payments
} = actions

export function defGet (data) {
  return Object.keys(data).map(id => data[id])
}
export const selectAccounts = state => state.lists.accounts
export const selectStores = state => state.lists.stores
export const selectStuffs = state => state.lists.stuffs
export const selectCompanies = state => state.lists.companies
export const selectShipments = state => state.lists.shipments
export const selectPayments = state => state.lists.payments

export default lists.reducer
