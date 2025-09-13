import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx';
import useAuthStore from './store/useAuthStore.js';
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  const { user, checkAuth }=useAuthStore();

  useEffect(()=>{
    checkAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={!user ? <LoginPage/> : <Navigate to='/dashboard'/>}></Route>
        <Route path='/dashboard' element={user ? <DashboardPage/> : <Navigate to='/'/>}></Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
