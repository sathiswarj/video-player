import React from 'react'
import Add from './Components/Add'
import View from './Components/View'
import { Routes, Route } from 'react-router-dom'
import Player from './Components/Player'
function App() {
  return (
     <>
        <Routes>
          <Route path='/' element={<Player />} />
          <Route path='/view' element={<View />} />
          <Route path='/add' element={<Add />} />
        </Routes>
      </>
  )
}

export default App