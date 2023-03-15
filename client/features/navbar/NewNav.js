import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { addSearchQuery } from "../../app/reducers/searchSlice";

const NewNav = () => {
	return (
		<div>
			<Navbar bg="#1b0b54" variant="dark" className="newNav">
				<Container>
					<Navbar.Brand href="/home" className="align-left">
						<img src="/logo.png" className="logo navLogo align-left" />
					</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</div>
	);
};

export default NewNav;
