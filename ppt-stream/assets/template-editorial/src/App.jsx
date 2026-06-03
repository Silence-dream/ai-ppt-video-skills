import React, { useState, useEffect, useCallback } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import slides from './data/slides.json'
import PresentationView from './components/PresentationView'
import Teleprompter from './components/Teleprompter'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PresentationView slides={slides} />} />
      <Route path="/teleprompter" element={<Teleprompter slides={slides} />} />
    </Routes>
  )
}

export default App
