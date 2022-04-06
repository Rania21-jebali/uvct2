import React,{ useState } from 'react'
import { Navbar,Nav,Form,FormControl,Button,Modal,NavDropdown} from 'react-bootstrap';
import { BiCartAlt } from 'react-icons/bi';
import Connexion from '../../pages/auth/connexion/Connexion';
import Inscrire from '../../pages/auth/inscrire/Inscrire';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Header.css'
function Header() {
  const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);
    const [show1, setShow1] = useState(false);

    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth
    const handleLogout = async () => {
      try {
          await axios.get('/user/logout')
          localStorage.removeItem('firstLogin')
          window.location.href = "/";
      } catch (err) {
          window.location.href = "/";
      }
  }
  return (
    <div className='header'>
    <Navbar className='row2' >
      <Navbar.Brand href="#home">
        <img
          alt=""
          src=""
          width="160"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
      <NavDropdown title="Catégories" id="basic-nav-dropdown " className='nav-dropdown-title'>
          <NavDropdown.Item href="#action/3.1">Développement web</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Design</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Business</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Marketing</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Développement personnel</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Communication</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Photographie</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Informatiques et logiciels</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Mode de vie</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Musique</NavDropdown.Item>
      </NavDropdown>
      <Form className="flex-auto">
        <FormControl
          type="search"
          placeholder="Rechercher"
          className="me-2 rounded-pill border-dark"
          aria-label="Search"
        />
      </Form>
      <Nav.Link href="/enseigner-sur-uvct" className="link-postuler-enseigner">Enseigner sur Uvct</Nav.Link>
     <Nav.Link><BiCartAlt size="2em" color="black" href="#"/></Nav.Link>
      {
                    isLogged
                    ? 
                    (<>
      
      <Button className="button-inscription"  variant="light"
      onClick={handleLogout}
      >Déconnecté</Button>
      <Link  className="button-inscription" to='/profil' >
        {user.name} 
      </Link>

</>)
                    :
        (   
          <>
      <Button  className="button-connexion" onClick={handleShow} variant="light">Connexion</Button>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Connectez-vous à votre compte UVCT!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Connexion />
        </Modal.Body>
      </Modal>
      <Button className="button-inscription" onClick={handleShow1} variant="light">S'inscrire</Button>
      <Modal show={show1} onHide={handleClose1} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Inscrivez-vous et commencez à apprendre!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Inscrire />
        </Modal.Body>
      </Modal>
      </>
        )}
  </Navbar>
 
</div>
  )
}

export default Header