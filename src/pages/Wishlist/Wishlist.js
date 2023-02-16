import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

import Producto from "../../components/Producto/Producto";

import { nomeabandones, traeData } from "../../Helpers/Helpers";
import { getWishlist } from "../../Helpers/Wishlist";

import { NOMBRETIENDA } from "../../Helpers/Const";

import "./Wishlist.css";

function NoHayWishlist() {
	return (
		<div style={{ width: "100%", textAlign: "center" }}>
			<p>No haz agregado ningun producto a tu <strong>wishlist</strong></p>
			<p>Da una vuelta por nuestra tienda a ver si te gusta algo.</p>
		</div>
	);
}

function Wishlist() {
	const [losid, setLosid] = useState();

	useEffect(() => {
		const algo = JSON.parse( getWishlist() );
		setLosid(algo);
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
						losid
							? losid.map((jeje) => {
								const prod = {
									id: traeData()[jeje].id,
									nombre: traeData()[jeje].nombre,
									precio: traeData()[jeje].precio,
									color: traeData()[jeje].color(),
									imagen: traeData()[jeje].imagen.principal,
								};

								return (
									<Producto
										key={prod.id}
										id={prod.id}
										nombre={prod.nombre}
										precio={prod.precio}
										color={prod.color}
										imagen={prod.imagen}
									/>
								);
							})
							: <NoHayWishlist />
					}
				</section>
			</section>
		</>
	);
}
export default Wishlist;
