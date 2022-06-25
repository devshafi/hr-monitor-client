import { Container, Navbar as NavbarBs } from "react-bootstrap"
import { FaBars } from "react-icons/fa";

export default function AppNavbar(props) {
  return (
    <NavbarBs variant="light" bg="light" className="shadow-sm">
      <Container fluid className="justify-content-start mx-2">
        <FaBars className="menu" onClick={props.toggleActive} />
        <NavbarBs.Brand className="mx-4" >HR Monitor Admin Panel</NavbarBs.Brand>
      </Container>
    </NavbarBs>
  )
}
