import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import eljson from "../../assets/json/inventario.json";

import { precio, traeCategorias } from "../../Helpers/Helpers";

import { NOMBRETIENDA } from "../../Helpers/Const";

function ListaDeProductos( props ) {
	const {
		id,
		nombre,
		imagen,
		elprecio,
	} = props;
	return (
		<div style={{ width: "12%" }} key={id} data-id={id}>
			<img style={{ width: "100%" }} src={imagen} alt={nombre} />
			<p>$ {precio(elprecio)}</p>
		</div>
	);
}

function Dev() {
	console.debug( traeCategorias() );
	return (
		<>
			<Helmet>
				<title>DEV Area || {NOMBRETIENDA}</title>
			</Helmet>
			<h1 style={{ textAlign: "center", fontSize: "3em", letterSpacing: "0.05em" }}>DEEEV!</h1>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{/* {
					elproducto?.map((elpro) => {
						return (
							<ListaDeProductos
								id={elpro.id}
								nombre={elpro.nombre}
								elprecio={elpro.precio}
								imagen={elpro.imagen}
							/>
						);
					})
				} */}
			</div>
		</>
	);
}
export default Dev;
