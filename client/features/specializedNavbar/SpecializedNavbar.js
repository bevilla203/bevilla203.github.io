import React from "react";
import { Link } from "react-router-dom";

const SpecializedNavbar = () => {
	return (
		<div className="specializedNavbar">
			<Link
				to="/featured"
				className="specItem"
				style={{ textDecoration: "none", color: "white" }}>
				Featured
			</Link>
			<Link
				style={{ textDecoration: "none", color: "white" }}
				className="link"
				to="/products">
				All Products
			</Link>
		</div>
	);
};

export default SpecializedNavbar;
