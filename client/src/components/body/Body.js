import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux'
import ForgotPassword from '../../pages/auth/forgotPassword/forgotPassword';
import ResetPassword from '../../pages/auth/ResetPassword/ResetPassword';
import Profile from '../../pages/profile/Profile';
import Home from '../../pages/home/Home';
import DevenirInstructeur from '../../pages/auth/devenirInstructeur/DevenirInstructeur';
import ConnexionFex from '../../pages/auth/connexion/ConnexionFex';
import InscrireFex from '../../pages/auth/inscrire/InscrireFex';
import NotFound from '../utils/NotFound/NotFound'
import Candidature from '../../pages/candidature/Candidature';
import './Body.css'
import LeftBar from '../leftBar/LeftBar';
import LeftBarAdmin from '../leftBar/LeftBarAdmin';
import Users from '../../pages/Apprenant/users/users';
import AcceptCandidat from '../../pages/candidature/AcceptCandidat';

function Body() {
  
  const auth = useSelector(state => state.auth)
   const {isLogged, isAdmin} = auth
    return (
        <section className='body'>
        {  (isLogged && !isAdmin) &&   <LeftBar />}
        { isAdmin   &&   <LeftBarAdmin />}

            <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/left" element={<LeftBar />}/>
            <Route path="/connexion" element={isLogged ? <NotFound /> : <ConnexionFex />} />
            <Route path="/inscrire" element={isLogged ? <NotFound /> : <InscrireFex />}/>
            <Route path="/forgot_password" element={isLogged ? <NotFound /> : <ForgotPassword />}/>
            <Route path="/user/reset/:token" element={isLogged ? <NotFound /> : <ResetPassword />}/>
            <Route path="/profil" element={isLogged ? <Profile /> : <NotFound />}/>
            <Route path="/users" element={isAdmin ?  <Users /> : <NotFound /> }/>
            <Route path="/candidature" element={isAdmin ?  <Candidature /> : <NotFound /> }/>
            <Route path="/user/reset/:token" element={isLogged ? <NotFound /> : <ResetPassword />}/>
            <Route path="/devenir-instructeur" element={<DevenirInstructeur />}/>
            <Route path="/user/acceptInstr/:activation_token" element={<AcceptCandidat />} />

            </Routes>
            
        </section>
    )
}

export default Body
//<Route path="/candidat/:id" element={isAdmin ?  <CandidatDetails /> : <NotFound /> }/>
