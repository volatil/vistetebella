import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import eljson from "../../assets/json/inventario.json";

import { precio } from "../../Helpers/Helpers";

import { NOMBRETIENDA } from "../../assets/js/CONST";

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
	let categoria = useLocation();
	categoria = categoria.pathname.split("/")[2];

	const [elproducto, setElproducto] = useState();

	useEffect(() => {
		const data = [];
		console.table( eljson.values[0] );
		for ( let count = 1; count <= eljson.values.length - 1; count++ ) {
			const resumen = eljson.values[count];
			const p = {
				id: resumen[0],
				nombre: resumen[1],
				precio: resumen[2],
				imagen: resumen[4].split(",//")[0],
			};
			data.push( p );
		}
		setElproducto(data);
	}, []);

	return (
		<>
			<Helmet>
				<title>DEV Area || {NOMBRETIENDA}</title>
			</Helmet>
			<h1 style={{ textAlign: "center", fontSize: "3em", letterSpacing: "0.05em" }}>DEEEV!</h1>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{
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
				}
			</div>
		</>
	);
}
export default Dev;
