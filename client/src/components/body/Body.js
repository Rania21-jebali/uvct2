import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux'
import ForgotPassword from '../../pages/auth/forgotPassword/forgotPassword';
import ResetPassword from '../../pages/auth/ResetPassword/ResetPassword';
import Profile from '../../pages/profile/Profile';
import Home from '../../pages/home/Home';
import DevenirInstructeur from '../../pages/auth/devenirInstructeur/DevenirInstructeur';
import Inscrire from '../../pages/auth/inscrire/Inscrire';
import NotFound from '../utils/NotFound/NotFound'
import Candidature from '../../pages/candidature/Candidature';
import './Body.css'
import AcceptCandidat from '../../pages/candidature/AcceptCandidat';
import LeftList from '../../backOffice/components/leftList/LeftList';
import Profil from '../../backOffice/pages/profile/Profil';
import Formations from '../../backOffice/pages/formations/Formations';
import Evenements from '../../backOffice/pages/evenements/Evenements';
import Parametres from '../../backOffice/pages/parametres/Parametres';
import AjoutEvent from '../../backOffice/pages/evenements/ajoutEvent/AjoutEvent';
import Achats from '../../backOffice/pages/achats/Achats';
import NewFormation from '../../backOffice/pages/formations/NewFormation/NewFormation';
import Gains from '../../backOffice/pages/gains/Gains';
import Connexion from '../../pages/auth/connexion/Connexion';
import Favoris from '../../backOffice/pages/favoris/Favoris';
import Messages from '../../backOffice/pages/messages/Messages';
import Reclamations from '../../backOffice/pages/reclamations/Reclamations';
import Administrateur from '../../backOffice/pages/administrateur/Administrateur';
import Instructeurs from '../../backOffice/pages/instructeurs/Instructeurs';
import ApprenantList from '../../backOffice/pages/apprenants/ApprenantList';


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
            <Route path="/mes-achats" element={<Achats />} />
            <Route path="/mes-gains" element={<Gains />} />
            <Route path="/new-formation/:titre1" element={<NewFormation/>} />
            <Route path="/maFormation/:titre1" element={<NewFormation/>} />
            <Route path="/profil" element={isLogged ? <Profile /> : <NotFound />}/>
            <Route path="/apprenants" element={(isAdmin || isSuperAdmin) ?  <ApprenantList /> : <NotFound /> }/>
            <Route path="/candidature" element={(isAdmin || isSuperAdmin) ?  <Candidature /> : <NotFound /> } />
            <Route path="/instructeurs" element={(isAdmin || isSuperAdmin) ?  <Instructeurs /> : <NotFound /> } />
            <Route path="/administrateurs" element={(isAdmin || isSuperAdmin) ?  <Administrateur /> : <NotFound /> } />
            <Route path="/instructeur" element={(isAdmin || isSuperAdmin) ?  <Instructeurs /> : <NotFound /> } />

            <Route path="/mes-favoris" element={<Favoris /> } />
            <Route path="/messages" element={<Messages /> } />
            <Route path="/reclamations" element={<Reclamations /> } />
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
            <Route path="/connexion" element={isLogged ? <NotFound /> : <Connexion />} />
            <Route path="/inscrire" element={isLogged ? <NotFound /> : <Inscrire />}/>
            <Route path="/forgot_password" element={isLogged ? <NotFound /> : <ForgotPassword />}/>
            <Route path="/user/reset/:token" element={isLogged ? <NotFound /> : <ResetPassword />}/>
            <Route path="/user/reset/:token" element={isLogged ? <NotFound /> : <ResetPassword />}/>
              </Routes>
            )
            }

        </section>
    )
}

export default Body
//<Route path="/candidat/:id" element={isAdmin ?  <CandidatDetails /> : <NotFound /> }/>
