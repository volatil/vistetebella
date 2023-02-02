import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import { DB, NOMBRETIENDA } from "../../assets/js/CONST";
import Loading from "../../components/Loading/Loading";

import "./Detalle.css";

import { armonizarURL, precioMeli } from "../../assets/js/Functions";

function Detalle() {
	const [detalle, setDetalle] = useState(null);
	const id = useLocation().pathname.split("/")[2];

	armonizarURL();

	useEffect(() => {
		fetch( DB ).then( (x) => x.json() ).then( (x) => {
			const resumen = x.values[id];
			const todo = [];

			if ( typeof resumen === "undefined" ) {
				window.location.href = "/";
			}

			const p = {
				id: resumen[0],
				nombre: resumen[1].replaceAll("SHEIN ", ""),
				precio: () => {
					return precioMeli( resumen[2] );
				},
				fechaentrega: resumen[3],
				imagen: resumen[4].split(",//")[0],
				botoncomprar: () => {
					if ( p.id === "15" ) {
						const botonHTML = <a rel="noreferrer" href="https://mpago.la/1rmdXJe" target="_blank">COMPRAR</a>;
						return botonHTML;
					}
					return null;
				},
			};

			todo.push({
				id: p.id, nombre: p.nombre, precio: p.precio(), fechaentrega: p.fechaentrega, imagen: p.imagen, botoncomprar: p.botoncomprar(),
			});
			setDetalle( todo );
		});
	}, [id]);

	if ( detalle ) {
		return (
			<>
				<Helmet>
					<title>{detalle[0].nombre} || { NOMBRETIENDA }</title>
					<meta property="og:image" content={detalle[0].imagen} />
					<meta property="twitter:image" content={detalle[0].imagen} />
				</Helmet>
				<section key={detalle[0].id} id="detalle">
					<h2>{detalle[0].nombre}</h2>
					<img src={detalle[0].imagen} alt={detalle[0].nombre} />
					<p className="precio">$ {detalle[0].precio}</p>
					{ detalle[0].botoncomprar }
				</section>
			</>
		);
	}
	return (<Loading />);
}
export default Detalle;
