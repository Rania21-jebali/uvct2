import React,{ useState } from 'react'
import { Navbar,Nav,Form,FormControl,Button,Modal} from 'react-bootstrap';
import { BiCartAlt } from 'react-icons/bi';
import Connexion from '../../pages/auth/connexion/Connexion';
import Inscrire from '../../pages/auth/inscrire/Inscrire';
import {useSelector} from 'react-redux'
import axios from 'axios'
import './Header.css'
import Avatar1 from '../Avatar/Avatar'
import Popover from '@material-ui/core/Popover';



function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const open3 = Boolean(anchorEl3);
  const id3 = open3 ? 'simple-popover' : undefined;

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);
    const [show1, setShow1] = useState(false);

    const auth = useSelector(state => state.auth)

    const {user, isAdmin, isLogged} = auth

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
      <Navbar.Brand href="/">
        <img
          alt=""
          src="./images/logo.png"
          width="160"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
      {
        !isAdmin  &&
        <>
      <Button aria-describedby={id3} variant="contained" color="primary" onClick={handleClick3}>
      <p>Catégories</p>
      </Button>
      <Popover
        id={id3}
        open={open3}
        anchorEl={anchorEl3}
        onClose={handleClose3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
      <Nav.Link href="/profil" >Développement web</Nav.Link>
      <Nav.Link href="/profil" >Design</Nav.Link>
      <Nav.Link href="/profil" >Business</Nav.Link>
      <Nav.Link href="/profil" >Marketing</Nav.Link>
      <Nav.Link href="/profil" >Développement personnel</Nav.Link>
      <Nav.Link href="/profil" >Communication</Nav.Link>
      <Nav.Link href="/profil" >Photographie</Nav.Link>
      <Nav.Link href="/profil" >Informatiques et logiciels</Nav.Link>
      <Nav.Link href="/profil" >Mode de vie</Nav.Link>
      <Nav.Link href="/profil" >Musique</Nav.Link>
      </Popover>  
      </>
      }
      <Form className="flex-auto ">
        <FormControl
          type="search"
          placeholder="Rechercher"
          className="me-2 rounded-pill border-dark"
          aria-label="Search"
        />
      </Form>
      {
        !isAdmin && 
        <Nav.Link href="/devenir-instructeur" className="link-postuler-enseigner">Devenir instructeur</Nav.Link>
      }
      {
        !isAdmin && 
        <Nav.Link><BiCartAlt size="2em" color="black" href="#" /></Nav.Link>
      }
      {
                    isLogged
                    ? 
                    (<>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick2}>
      <Avatar1 src={user.avatar} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
      <Nav.Link href="/profil" >Profil</Nav.Link>
      <Nav.Link onClick={handleLogout}>Se déconnecter</Nav.Link>
      </Popover>       

</>)
                    :
        (   
          <>
      <Button  className="button-connexion" onClick={handleShow} variant="light">Se connecter</Button>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>
          <h2 className='title-inscri'>Bienvenue</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Connexion />
        </Modal.Body>
      </Modal>
      <Button className="button-inscription" onClick={handleShow1} variant="light">S'inscrire</Button>
      <Modal show={show1} onHide={handleClose1} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>
          <h2 className='title-inscri'>S'inscrire</h2>
          <p className="sous-title-inscri">Passez votre temps libre à étudier avec les meilleurs instructeurs.</p>
          </Modal.Title>
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