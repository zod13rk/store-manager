import React from 'react'
import Tab from './component/Tab'

import StoresList from './features/lists/Stores'
import AccountsList from './features/lists/Accounts'
import StuffsList from './features/lists/Stuffs'
import CompaniesList from './features/lists/Companies'
import ShipmentsList from './features/lists/Shipments'
import PaymentsList from './features/lists/Payments'

import { mainNavs } from './app/navs'
import './App.css'

// import StuffsList from './features/lists/stuffs'
// import CompaniesList from './features/lists/companies'
// import ShipmentsList from './features/lists/shipments'
// import PaymentsList from './features/lists/payments'

const contents = [
  <StoresList key='0' />,
  <AccountsList key='1' />,
  <StuffsList key='2' />,
  <CompaniesList key='3' />,
  <ShipmentsList key='4' />,
  <PaymentsList key='5' />
]
export default function app () {
  return (
    <Tab labels={mainNavs} contents={contents} />
  )
}
// {mainNavs.map((nav, i) => <TabPanel value={value} index={i} dir={theme.direction} >{pages[i]()}</TabPanel>)}
