import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { DB, COMETA } from "../../assets/js/CONST";
import Loading from "../../components/Loading/Loading";

import "./Detalle.css";

function Detalle() {
	const [detalle, setDetalle] = useState(null);
	const location = useLocation();
	let lugar = useLocation().pathname.split("/")[2];
	lugar = lugar.replaceAll("%20", " ").replaceAll("%C3", "").replaceAll("%B3", "o").replaceAll("%A9", "e");

	const fixURL = function () {
		let fixurl = location.pathname.split("/")[3];
		fixurl = decodeURIComponent(fixurl);
		fixurl = fixurl.replaceAll(" ", "-");
		fixurl = fixurl.toLowerCase();
		window.history.pushState(null, null, fixurl);
	};
	fixURL();

	useEffect(() => {
		fetch( DB ).then( (x) => x.json() ).then( (x) => {
			const resumen = x.values[lugar];
			const todo = [];

			if ( typeof resumen === "undefined" ) {
				window.location.href = "/";
			}
			const p = {
				id: resumen[0],
				nombre: resumen[1].replaceAll("SHEIN ", ""),
				precio: (Number(resumen[2]) + COMETA).toLocaleString("es-CL"),
				fechaentrega: resumen[3],
				imagen: resumen[4].split(",//")[0],
			};

			todo.push({
				id: p.id, nombre: p.nombre, precio: p.precio, fechaentrega: p.fechaentrega, imagen: p.imagen,
			});
			setDetalle( todo );
		});
	}, [lugar]);

	if ( detalle ) {
		return (
			<section key={detalle[0].id} id="detalle">
				<h2>{detalle[0].nombre}</h2>
				<img src={detalle[0].imagen} alt={detalle[0].nombre} />
				<p className="precio">$ {detalle[0].precio}</p>
			</section>
		);
	}
	return (<Loading />);
}
export default Detalle;
