import './App.css'
import HomePage from './pages/HomePage'
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'
import ChatPage from './pages/ChatPage'

function App() {

  return (
    <div className='scroll-smooth'>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path='chat' element={<ChatPage/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App
