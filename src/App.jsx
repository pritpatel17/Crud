import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Users from './Users'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Users/>}></Route>
            <Route path='/create' element={<CreateUser/>}></Route>
            <Route path='/update/:id' element={<UpdateUser/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
