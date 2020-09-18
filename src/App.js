import React from 'react'
import Tab from './component/Tab'
import AccountsList from './features/lists/Accounts'
import StoresList from './features/lists/Stores'

import { mainNavs } from './app/navs'
import './App.css'

// import StuffsList from './features/lists/stuffs'
// import CompaniesList from './features/lists/companies'
// import ShipmentsList from './features/lists/shipments'
// import PaymentsList from './features/lists/payments'

const contents = [
  <StoresList key='0' />,
  <AccountsList key='1' />
  // StuffsList,
  // CompaniesList,
  // ShipmentsList,
  // PaymentsList,
]
export default function app () {
  return (
    <Tab labels={mainNavs} contents={contents} />
  )
}
// {mainNavs.map((nav, i) => <TabPanel value={value} index={i} dir={theme.direction} >{pages[i]()}</TabPanel>)}
