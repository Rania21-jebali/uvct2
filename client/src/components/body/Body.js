import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux'
import ForgotPassword from '../../pages/auth/forgotPassword/forgotPassword';
import ResetPassword from '../../pages/auth/ResetPassword/ResetPassword';
import Profile from '../../pages/profile/Profile';
import Home from '../../pages/home/Home';
import Inspecteur from '../../pages/inspecteur/Inspecteur';
import DevenirInstructeur from '../../pages/auth/devenirInstructeur/DevenirInstructeur';
import ConnexionFex from '../../pages/auth/connexion/ConnexionFex';
import InscrireFex from '../../pages/auth/inscrire/InscrireFex';
import NotFound from '../utils/NotFound/NotFound'
import Candidature from '../../pages/candidature/Candidature';
import './Body.css'
import LeftBar from '../leftBar/LeftBar';
import ListUsers from '../../pages/listUsers/ListUsers';
import CandidatDetails from '../../pages/candidature/CandidatDetails';

function Body() {
  
  const auth = useSelector(state => state.auth)
   const {isLogged, isAdmin} = auth
    return (
        <section className='body'>
            <Routes> 
            <Route path="/" element={<Home />}/>
            <Route path="/inspecteur" element={<Inspecteur />}/>
            <Route path="/left" element={<LeftBar />}/>
            <Route path="/forgot_password" element={isLogged ? <NotFound /> : <ForgotPassword />}/>
            <Route path="/user/reset/:token" element={isLogged ? <NotFound /> : <ResetPassword />}/>
            <Route path="/devenir-instructeur" element={<DevenirInstructeur />}/>
            <Route path="/profil" element={isLogged ? <Profile /> : <NotFound />}/>
            <Route path="/connexion" element={isLogged ? <NotFound /> : <ConnexionFex />} />
            <Route path="/inscrire" element={isLogged ? <NotFound /> : <InscrireFex />}/>
            <Route path="/candidature" element={isAdmin ?  <Candidature /> : <NotFound /> }/>
            <Route path="/users" element={isAdmin ?  <ListUsers /> : <NotFound /> }/>
            </Routes>
        </section>
    )
}

export default Body
//<Route path="/candidat/:id" element={isAdmin ?  <CandidatDetails /> : <NotFound /> }/>
