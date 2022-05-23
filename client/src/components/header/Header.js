import React,{ useState } from 'react'
import { Navbar,Nav,Form,FormControl,Button,Modal} from 'react-bootstrap';
import Connexion from '../../pages/auth/connexion/Connexion';
import Inscrire from '../../pages/auth/inscrire/Inscrire';
import {useSelector} from 'react-redux'
import axios from 'axios'
import './Header.css'
import Avatar1 from '../Avatar/Avatar'
import Popover from '@material-ui/core/Popover';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SvgLogo from '../../logo';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';



function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);
    const open3 = Boolean(anchorEl3);
    const id3 = open3 ? 'simple-popover' : undefined;
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);
    const [show1, setShow1] = useState(false);
    const auth = useSelector(state => state.auth)
    const {isInstr,isSuperAdmin, isAdmin,user, isLogged} = auth

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
      <p className='titleLogo'><SvgLogo />Uvct-Training</p>
      </Navbar.Brand>
      <p aria-describedby={id3} variant="contained" color="primary" className="categorie-title" onClick={handleClick3}>Catégories</p>
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
      <div className='categorie-content'>
        <a href="/devloppement-web" className="categorie-lien">Développement web</a>
      </div>
      <div className='categorie-content'>
        <a href="/design" className="categorie-lien">Design</a>
      </div>
      <div className='categorie-content'>
        <a href="/business" className="categorie-lien">Business</a>
      </div>
      <div className='categorie-content'>
        <a href="/marketing" className="categorie-lien">Marketing</a>
      </div>
      <div className='categorie-content'>
        <a href="/developpement-personnel" className="categorie-lien">Développement personnel</a>
      </div>
      <div className='categorie-content'>
        <a href="/communication" className="categorie-lien">Communication</a>
      </div>
      <div className='categorie-content'>
        <a href="/photographie" className="categorie-lien">Photographie</a>
      </div>
      <div className='categorie-content'>
        <a href="/informatique" className="categorie-lien">Informatiques et logiciels</a>
      </div>
      <div className='categorie-content'>
        <a href="/mode-de-vie" className="categorie-lien">Mode de vie</a>
      </div>
      <div className='categorie-content'>
        <a href="/musique" className="categorie-lien">Musique</a>
      </div>
      </Popover>  
      <Form className="flex-auto ">
        <FormControl
          style={{
            boxShadow:'0px 0px 5px -3px black'
          }}
          type="search"
          placeholder="Rechercher"
          className="me-2 rounded-pill"
          aria-label="Search"
        />
      </Form>
      {
        (!isAdmin && !isSuperAdmin && !isInstr) && 
        <Nav.Link href="/devenir-instructeur" className="link-postuler-enseigner">Devenir instructeur</Nav.Link>
      }
      {
        (!isAdmin && !isSuperAdmin) && 
        <a href="/panier" className="shoppingIcon">
        <ShoppingCartIcon   href="/panier"/>
        </a>
      }
      {
                    isLogged
                    ? 
                    (<>
                    { (!isInstr && !isAdmin && !isSuperAdmin ) && (
                      <div>
                      <FavoriteBorderIcon className='header-icon'/>
                      </div>
                      )}
       <NotificationsNoneIcon />
      <p aria-describedby={id} variant="contained" color="primary" onClick={handleClick2}>
      <Avatar1 src={user.avatar} />
      </p>
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
      <div className='categorie-content'>
        <a href="/profil" className="categorie-lien">Profil</a>
      </div>
      <div className='categorie-content'>
        <p onClick={handleLogout} className="categorie-lien">Se déconnecter</p>
      </div>
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
