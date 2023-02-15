import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

import Producto from "../../components/Producto/Producto";

import { nomeabandones, traeData } from "../../Helpers/Helpers";
import { getWishlist } from "../../Helpers/Wishlist";

import { NOMBRETIENDA } from "../../Helpers/Const";

import "./Wishlist.css";

function Wishlist() {
	const [losid, setLosid] = useState();
	console.debug( traeData()[1] );

	useEffect(() => {
		const algo = JSON.parse( getWishlist() );
		setLosid( algo );
	}, []);

	return (
		<>
			<Helmet>
				<title>Wishlist || {NOMBRETIENDA}</title>
				{ nomeabandones( `Wishlist || ${NOMBRETIENDA}` ) }
			</Helmet>
			<section id="wishlist">
				<h2>WISHLIST !</h2>
				<section id="grilla">
					{
						losid?.map((elid) => {
							const idfinal = Number(elid) - 1;
							const p = {
								id: traeData()[idfinal].id,
								nombre: traeData()[idfinal].nombre,
								principal: traeData()[idfinal].imagen.principal,
								color: traeData()[idfinal].color(),
								precio: traeData()[idfinal].precio,
							};

							return (
								<Producto
									key={p.id}
									id={p.id}
									nombre={p.nombre}
									imagen={p.principal}
									precio={p.precio}
								/>
							);
						})
					}
				</section>
			</section>
		</>
	);
}
export default Wishlist;
