import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Image from 'next/image';
import styles from "./Navbar.module.css"
import Login from '@/Components/Login/Login'

function NavigationBar() {
  return (
    <div className={styles.navBarContainer}>
      <Navbar bg="dark" variant="dark" fixed='top' expand="md" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='m-3' />
        <div className={styles.nav}>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <div className={styles.subNav}>
                <Navbar.Brand href="#home"><Image
                  alt=""
                  src="https://quai-antique.xyz/asset/images/logo/logo1.png"
                  width="90"
                  height="60"
                  className=" align-top"
                /></Navbar.Brand>
                <Nav.Link href="#about">Notre Restaurant</Nav.Link>
                <Nav.Link eventKey="3" href="#reservation"> Reservation </Nav.Link>
                <NavDropdown title="Menu" id="nav-dropdown" menuVariant="dark">
                  <NavDropdown.Item eventKey="4.4">Toutes nos Formules</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.1">Formules Déjeuner</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Formules Diné</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.3">La carte</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#contact">Contact</Nav.Link>
                <NavDropdown title="Login" id="nav-dropdown" menuVariant="dark">
                  <Login />
                </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
    </div>
      </Navbar >
    </div >
  );
}

export default NavigationBar;
