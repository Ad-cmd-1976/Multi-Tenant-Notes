import './App.css'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/dashboard' element={<DashboardPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
