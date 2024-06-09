import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, Outlet } from 'react-router-dom';
import useStore from "./Store";
import "./navbar.css"


const Root = () => {
  const { likeCount } = useStore();
  return (
    <>
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Anasayfa</Nav.Link>
            <Nav.Link as={Link} to="/users">Kullanıcılar</Nav.Link>  
            <Nav.Link className="nav-bar" as={Link} to="/favorites">Favoriler <span className="state">{likeCount}</span></Nav.Link>         
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
      </>
  )
}

export default Root
