import { Routes } from 'react-router-dom'
import './App.css'
import { Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import AdminSignup from './pages/auth/AdminSignup'
import ResetPassword from './pages/auth/ResetPassword'
import Dashboard from './pages/dashboard/Dashboard'
import Books from './pages/books/Books'
import AddBook from './pages/books/AddBook'
import EditBook from './pages/books/EditBook'
import History from './pages/history/History'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import Home from './pages/home/Home'
import BookLanding from './pages/books/BookLanding'
import Signup from './pages/auth/Signup'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/books/:id' element={<BookLanding />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/reset-password' element={<ResetPassword />}></Route>

        {/* Private routes */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
        <Route path='/admin-signup' element={<PrivateRoute><AdminSignup /></PrivateRoute>}></Route>

        <Route path='/books' element={<PrivateRoute><Books /></PrivateRoute>}></Route>
        <Route path='/books/add' element={<PrivateRoute><AddBook /></PrivateRoute>}></Route>
        <Route path='/books/edit/:id' element={<PrivateRoute><EditBook /></PrivateRoute>}></Route>

        <Route path='/history' element={<PrivateRoute hasClientAccess={true}><History /></PrivateRoute>}></Route>
      </Routes>
    </>
  )
}

export default App
