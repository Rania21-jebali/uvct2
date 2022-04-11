import React,{ useState } from 'react'
import { Navbar,Nav,Form,FormControl,Button,Modal,NavDropdown} from 'react-bootstrap';
import { BiCartAlt } from 'react-icons/bi';
import {BsList} from 'react-icons/bs';
import Connexion from '../../pages/auth/connexion/Connexion';
import Inscrire from '../../pages/auth/inscrire/Inscrire';
import {useSelector} from 'react-redux'
import axios from 'axios'
import './Header.css'
import Avatar1 from '../Avatar/Avatar'
import Popover from '@material-ui/core/Popover';
import Drawer from '@material-ui/core/Drawer';



function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
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

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  

  return (
    <div className='header'>
    <Navbar className='row2' >
    <div className='mobile-sect'>
    <BsList onClick={toggleDrawer('left', true)} className="iconResp" size= "2em"/>
          <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
          hello
          </Drawer>
    </div>
    
    
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="./images/logo.png"
          width="200"
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
      <Nav.Link href="/devenir-instructeur" className="link-postuler-enseigner">Devenir instructeur</Nav.Link>
     <Nav.Link><BiCartAlt size="2em" color="black" href="#"/></Nav.Link>
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