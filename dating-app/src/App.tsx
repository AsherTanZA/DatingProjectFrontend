import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListAttendeeComponent from './components/ListAttendeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AttendeeComponent from './components/AttendeeComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
       <HeaderComponent />
        <Routes>
            {/*// http://localhost:5173 */}
            <Route path="/"  element = {<ListAttendeeComponent />}></Route>
            {/*// http://localhost:5173/attendees */}
            <Route path='/attendees' element = {<ListAttendeeComponent />}></Route>
            <Route path='/add-attendee' element = {<AttendeeComponent />}></Route>
            <Route path='/edit-attendee/:id' element = {<AttendeeComponent/>}></Route>
        </Routes>
       <FooterComponent />
     </BrowserRouter>
    </>
  )
}

export default App
