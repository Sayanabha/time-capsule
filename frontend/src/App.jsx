import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BusinessPage from './pages/BusinessPage'
import Archive from './pages/Archive'

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business/:id" element={<BusinessPage />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </div>
  )
}