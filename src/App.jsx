import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Mainleout from './leyout/Mainleyout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Error from './pages/Error'


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
    else {
      if (!location.pathname.includes('/register')) {
        navigate('/login')
      }
    }
  }, [navigate])

  function Peoportiy({ aser, children }) {
    if (!aser) {
      navigate('/')
    }
    return children
  } 

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <Peoportiy aser={!!token}>
              <Mainleout>
                <Home />
              </Mainleout>
            </Peoportiy>
          }
        />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
