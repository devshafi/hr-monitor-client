import React from "react"
import {  Container, Navbar } from "react-bootstrap"
import { FaBars } from "react-icons/fa";

export default function AppNavbar(props) {
  return (
    <Navbar variant="light" bg="light" className="shadow-sm">
      <Container fluid className="justify-content-start mx-2">
        <FaBars onClick={props.toggleActive} className="menu" />
        <Navbar.Brand className="mx-4" >HR Monitor Admin Panel</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
