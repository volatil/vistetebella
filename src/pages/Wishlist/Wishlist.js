import { Helmet } from "react-helmet";
import { useEffect } from "react";

import { nomeabandones, traeData } from "../../Helpers/Helpers";
import { getDB } from "../../Helpers/Wishlist";

import { NOMBRETIENDA } from "../../assets/js/CONST";

import "./Wishlist.css";

function Wishlist() {
	const dataguardada = getDB();
	const arr = [dataguardada];
	// console.debug( arr );

	// console.debug( traeData() );

	const ela = [3, 2, 5, 23];
	// console.debug( typeof ela );
	localStorage.setItem("vistetebella", JSON.stringify(ela));
	console.debug( JSON.parse( localStorage.getItem("vistetebella") )[2] );

	useEffect(() => {
		nomeabandones();
	});

	return (
		<>
			<Helmet>
				<title>Wishlist || {NOMBRETIENDA}</title>
			</Helmet>
			<section id="wishlist">
				<h2>WISHLIST !</h2>
				<p>{ dataguardada.length <= 2 ? "No hay data almacenada" : <>IDs almacenada: <strong>{dataguardada}</strong></> }</p>
			</section>
		</>
	);
}
export default Wishlist;
