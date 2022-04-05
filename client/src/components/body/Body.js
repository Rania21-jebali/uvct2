import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux'
import ForgotPassword from '../../pages/auth/forgotPassword/forgotPassword';
import ResetPassword from '../../pages/auth/ResetPassword/ResetPassword';
import Profile from '../../pages/profile/Profile';
import Home from '../../pages/home/Home';


function Body() {
  
  const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Routes> 
            <Route path="/" element={<Home />}/>
            <Route path="/forgot_password" element={<ForgotPassword />}/>
            <Route path="/user/reset/:token" element={<ResetPassword />}/>
            <Route path="/profil" element={<Profile />}/>
            </Routes>
        </section>
    )
}

export default Body