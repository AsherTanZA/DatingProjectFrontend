import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListAttendeeComponent from './components/ListAttendeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AttendeeComponent from './components/AttendeeComponent'
import RegisterComponent from './components/RegisterComponent'
import WelcomeComponent from './components/WelcomeComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'
import { ReactNode } from 'react';

function App() {
  
  function AuthenticatedRoute({children}: { children: ReactNode }){

    const isAuth = isUserLoggedIn();

    if(isAuth){
      return children;
    }

    return <Navigate to="/login" />
  }

  return (
    <>
    <BrowserRouter>
       <HeaderComponent />
        <Routes>
            {/*// http://localhost:5173 */}
            <Route path="/"  element = {<WelcomeComponent />}></Route>
            {/*// http://localhost:5173/attendees */}
            <Route path='/attendees' element = {<AuthenticatedRoute><ListAttendeeComponent /></AuthenticatedRoute>}></Route>
            <Route path='/add-attendee' element = {<AuthenticatedRoute><AttendeeComponent /></AuthenticatedRoute>}></Route>
            <Route path='/edit-attendee/:id' element = {<AuthenticatedRoute><AttendeeComponent/></AuthenticatedRoute>}></Route>
            <Route path='/register' element = {<RegisterComponent />}></Route>
            <Route path='/login' element = {<LoginComponent/>}></Route>
        </Routes>
       <FooterComponent />
     </BrowserRouter>
    </>
  )
}

export default App
