import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
	return (
		<div className="main-footer">
			<img
				style={{ margin: "auto", display: "block", width: "200px" }}
				src="/logo-nobckgrnd.png"
			/>
			<Row className="main">
				<Col>
					<h1>About Us</h1>
					<ul className="list-unstyled">
						<li href="#">Vision</li>
						<li href="#">Reviews</li>
					</ul>
				</Col>
				<Col className="optional">
					<h1>Categories</h1>
					<ul className="list-unstyled">
						<li href="#">Playstation</li>
						<li href="#">Microsoft</li>
						<li href="#">Nintendo</li>
					</ul>
				</Col>
				<Col>
					<h1>Contact Us</h1>
					<ul className="list-unstyled">
						<li>support@gameshare.com</li>
						<li>555 Fake St. New York, NY 10011</li>
						<li>555-555-5555</li>
					</ul>
				</Col>
				<Col className="optional">
					<h1>Social Media</h1>
					<ul className="list-unstyled">
						<li href="#">
							<i className="fab fa-instagram">
								<span style={{ marginLeft: "10px" }}>Instagram</span>
							</i>
						</li>
						<li href="#">
							<i className="fab fa-twitter">
								<span style={{ marginLeft: "10px" }}>Twitter</span>
							</i>
						</li>
						<li href="#">
							<i className="fab fa-youtube">
								<span style={{ marginLeft: "10px" }}>Youtube</span>
							</i>
						</li>
					</ul>
				</Col>
			</Row>
			<hr />
			<Row>
				<p style={{ textAlign: "center" }} className="col-sm">
					&copy;{new Date().getFullYear()} GAMESHARE INC | All Rights Reserved |
					Terms of Service | Privacy
				</p>
			</Row>
		</div>
	);
};
export default Footer;
