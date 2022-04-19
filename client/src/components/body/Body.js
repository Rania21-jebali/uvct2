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
import Users from '../../pages/Apprenant/users/users';
import AcceptCandidat from '../../pages/candidature/AcceptCandidat';
import Instructeurs from '../../pages/Instructeur/Instructeurs/Instructeurs';
import LeftList from '../../backOffice/components/leftList/LeftList';
import Profil from '../../backOffice/pages/profile/Profil';
import Formations from '../../backOffice/pages/formations/Formations';
import Evenements from '../../backOffice/pages/evenements/Evenements';
import Parametres from '../../backOffice/pages/parametres/Parametres';
import AjoutEvent from '../../backOffice/pages/evenements/ajoutEvent/AjoutEvent';

function Body() {
  
  const auth = useSelector(state => state.auth)
   const {isLogged, isAdmin ,isInstr, isSuperAdmin} = auth
    return (
        <section className={`${isLogged ? "body":"" } ${isAdmin ? "body":"" }`}>
            { isLogged ?  
            (<LeftList >
            <Routes>
            <Route path="/" element={isAdmin ? <NotFound /> : <Home />}/>
            <Route path="/profile" element={<Profil />} />
            <Route path="/mes-formations" element={<Formations />} />
            <Route path="/mes-evenements" element={<Evenements />} />
            <Route path="/ajout-evenement" element={<AjoutEvent />} />
            <Route path="/parametres" element={<Parametres />} />


            <Route path="/connexion" element={isLogged ? <NotFound /> : <ConnexionFex />} />
            <Route path="/inscrire" element={isLogged ? <NotFound /> : <InscrireFex />}/>
            <Route path="/forgot_password" element={isLogged ? <NotFound /> : <ForgotPassword />}/>
            <Route path="/user/reset/:token" element={isLogged ? <NotFound /> : <ResetPassword />}/>
            <Route path="/profil" element={isLogged ? <Profile /> : <NotFound />}/>
            <Route path="/apprenants" element={isAdmin ?  <Users /> : <NotFound /> }/>
            <Route path="/candidature" element={isAdmin ?  <Candidature /> : <NotFound /> } />
            <Route path="/instructeurs" element={isAdmin ?  <Instructeurs /> : <NotFound /> } />
            <Route path="/user/reset/:token" element={isLogged ? <NotFound /> : <ResetPassword />}/>
            <Route path="/devenir-instructeur" element={<DevenirInstructeur />}/>
            <Route path="/user/acceptInstr/:token" element={<AcceptCandidat />} />
            </Routes>
            </LeftList>
            ) :
            (
                <Routes>
            <Route path="/" element={isAdmin ? <NotFound /> : <Home />}/>
            <Route path="/devenir-instructeur" element={<DevenirInstructeur />}/>
            </Routes>
            )
            }

        </section>
    )
}

export default Body
//<Route path="/candidat/:id" element={isAdmin ?  <CandidatDetails /> : <NotFound /> }/>
