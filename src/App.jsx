import React from 'react'
import Admin from './pages/admin/Admin'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Clients from './pages/admin/clients/Clients'
import Gifts from './pages/admin/gifts/Gifts'
import Codes from './pages/admin/codes/Codes'

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Admin/>}>
           <Route path='dashboard' element={<Dashboard/>}/>
           <Route path='clients' element={<Clients/>}/>
           <Route path='gifts' element={<Gifts/>}/>
           <Route path='codes' element={<Codes/>}/>
        </Route>
      </Routes>
  )
}

export default App