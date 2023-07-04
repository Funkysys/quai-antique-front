import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import Image from 'next/image';
import styles from "./Navbar.module.css";
import LoginOrRgister from '@/Components/LoginOrRegister/LoginOrRegister';

function NavigationBar() {
  return (
    <div className={styles.navBarContainer}>
      <Navbar bg="dark" variant="dark" fixed='top' expand="lg" >
        <div className={styles.logoToggle}>
          <div className={styles.toggleButton}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className='m-3' />
          </div>
          <Navbar.Brand href="/#home"><Image
                  alt=""
                  src="https://quai-antique.xyz/asset/images/logo/logo1.png"
                  width="90"
                  height="60"
                  className=" align-top"
                /></Navbar.Brand>
        </div>
        <div className={styles.nav}>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <div className={styles.subNav}>
                <Navbar.Brand href="/#home"><Image
                  alt=""
                  src="https://quai-antique.xyz/asset/images/logo/logo1.png"
                  width="90"
                  height="60"
                  className={styles.aHome}
                /></Navbar.Brand>
                <Nav.Link href="/#about">Notre Restaurant</Nav.Link>
                <Nav.Link eventKey="3" href="/#reservation"> Reservation</Nav.Link>
                <Nav.Link eventKey="4" href="/#Menu">Menu</Nav.Link>
                <Nav.Link href="/#contact">Contact</Nav.Link>
                <LoginOrRgister />
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar >
    </div >
  );
};

export default NavigationBar;
