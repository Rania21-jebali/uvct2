import React from 'react'
import {Route, Routes} from 'react-router-dom';
import {useSelector} from 'react-redux'
import ForgotPassword from '../../pages/auth/forgotPassword/forgotPassword';
import ResetPassword from '../../pages/auth/ResetPassword/ResetPassword';
import Home from '../../pages/home/Home';
import DevenirInstructeur from '../../pages/auth/devenirInstructeur/DevenirInstructeur';
import Inscrire from '../../pages/auth/inscrire/Inscrire';
import NotFound from '../utils/NotFound/NotFound'
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
import Instructeurs from '../../backOffice/pages/instructeurs/Instructeurs';
import ApprenantList from '../../backOffice/pages/apprenants/ApprenantList';
import CandidatAccepted from '../../backOffice/pages/instructeurs/candidatList/CandidatAccepted';
import Categories from '../../backOffice/pages/categories/Categories';
import './Body.css'
import AddAdmin from '../../backOffice/pages/administrateur/AddAdmin';
import AddCategorie from '../../backOffice/pages/categories/AddCategorie';
import FormationList from '../../backOffice/pages/formations/ListFormation/FormationList';
import AdministrateurList from '../../backOffice/pages/administrateur/AdministrateurList';
import Administrateur from '../../backOffice/pages/administrateur/Admin/Administrateur';
import ApprenantAdd from '../../backOffice/pages/apprenants/ApprenantAdd';
import InstructeurAdd from '../../backOffice/pages/instructeurs/InstructeurAdd';
import Apprenant from '../../backOffice/pages/apprenants/Apprenant/Apprenant';
import EditUser from '../../backOffice/pages/user/EditUser';
import Instructeur from '../../backOffice/pages/instructeurs/instructeur/Instructeur';
import AddFormation from '../../backOffice/pages/AddFormation/AddFormation';
import {AllEvents} from "../../pages/events/all-events/all-events";
import {EventDetails} from "../../pages/events/event-details/event-details";
import Footer from "../footer/footer";
import PartnerPage from "../../pages/partner/partner-page";

function Body() {
   const auth = useSelector(state => state.auth)
   const {isLogged, isAdmin ,isInstr, isSuperAdmin} = auth

    return (
        <section className={`${isLogged ? "body":"" } ${isAdmin ? "body":"" }`}>
            { isLogged ?
            (<LeftList >
            <Routes>
            <Route path="/" element={isAdmin ? <NotFound /> : <Home />}/>
            <Route path="/profile"  element={isLogged ? <Profil /> : <NotFound />} />
            <Route path="/mes-formations" element={<Formations />} />
            <Route path="/mes-evenements" element={<Evenements />} />
            <Route path="/ajout-evenement" element={<AjoutEvent />} />
            <Route path="/parametres" element={<Parametres />} />
            <Route path="/mes-achats" element={<Achats />} />
            <Route path="/mes-gains" element={isInstr ? <Gains /> : <NotFound />} />
            <Route path="/new-formation/:titre1" element={<NewFormation/>} />
            <Route path="/maFormation/:titre1" element={<NewFormation/>} />
            <Route path="/apprenants" element={(isAdmin || isSuperAdmin) ?  <ApprenantList /> : <NotFound /> }/>
            <Route path="/apprenant/:id" element={(isAdmin || isSuperAdmin) ? <Apprenant /> : <NotFound /> }/>
            <Route path="/user/:id" element={(isAdmin || isSuperAdmin) ?  <EditUser /> : <NotFound /> }/>
            <Route path="/admin/:id" element={(isAdmin || isSuperAdmin) ?  <Administrateur /> : <NotFound /> }/>
            <Route path="/ajout-apprenant" element={(isAdmin || isSuperAdmin) ?  <ApprenantAdd /> : <NotFound /> }/>
            <Route path="/formations" element={(isAdmin || isSuperAdmin) ?  <FormationList /> : <NotFound /> }/>
            <Route path="/instructeurs" element={(isAdmin || isSuperAdmin) ?  <Instructeurs /> : <NotFound /> } />
            <Route path="/administrateurs" element={isSuperAdmin ?  <AdministrateurList /> : <NotFound /> } />
            <Route path="/addAdmin" element={isSuperAdmin ?  <AddAdmin /> : <NotFound /> } />
            <Route path="/instructeur" element={(isAdmin || isSuperAdmin) ?  <Instructeurs /> : <NotFound /> } />
            <Route path="/instructeur/:id" element={(isAdmin || isSuperAdmin) ?  <Instructeur /> : <NotFound /> } />
            <Route path="/ajouter-instructeur" element={(isAdmin || isSuperAdmin) ?  <InstructeurAdd /> : <NotFound /> } />
            <Route path="/categories" element={isSuperAdmin ?  <Categories /> : <NotFound /> } />
            <Route path="/addcategorie" element={isSuperAdmin ?  <AddCategorie /> : <NotFound /> } />
            <Route path="/mes-favoris" element={<Favoris /> } />
            <Route path="/messages" element={<Messages /> } />
            <Route path="/reclamations" element={<Reclamations /> } />
            <Route path="/user/reset/:token" element={isLogged ? <NotFound /> : <ResetPassword />}/>
            <Route path="/devenir-instructeur" element={<DevenirInstructeur />}/>
            <Route path="/user/acceptInstr/:token" element={<CandidatAccepted />} />
            <Route path="/test/:titre1" element={<AddFormation/>} />

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
            <Route path="/events" element={<AllEvents />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/partner" element={<PartnerPage />} />
                </Routes>
            )
            }
            <Footer/>
        </section>
    )
}

export default Body
//<Route path="/candidat/:id" element={isAdmin ?  <CandidatDetails /> : <NotFound /> }/>
