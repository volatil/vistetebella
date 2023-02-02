import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import { DB, NOMBRETIENDA } from "../../assets/js/CONST";
import Loading from "../../components/Loading/Loading";

import "./Detalle.css";

import { armonizarURL, precioMeli } from "../../Helpers/Helpers";

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

			/*
			${p.nombre}
			${p.precio}
			${p.entrega}
			${p.imagenes()}
			${p.descripcion()}
			${p.tallas()}
			${p.url}
			${p.valoracion}
			${p.categoria}
			${p.comentario.cantidad()}
			${p.comentario.comentarios()}
			*/

			const p = {
				id: resumen[0],
				nombre: resumen[1].replaceAll("SHEIN ", ""),
				precio: () => {
					// return precioMeli( resumen[2] );
					return (Number(resumen[2])).toLocaleString("es-CL");
				},
				fechaentrega: resumen[3],
				imagen: {
					principal: resumen[4].split(",//")[0],
					todas: () => {
						const arrtodas = [];
						const todas = resumen[4];
						for ( let count = 0; count <= todas.split(",//").length - 2; count++ ) {
							// imagen.split("_thumbnail")[0].split("/")[imagen.split("_thumbnail")[0].split("/").length - 1]
							const laimagen = todas.split(",//")[count].replaceAll("//", "");
							const elid = laimagen.split("_thumbnail")[0].split("/")[laimagen.split("_thumbnail")[0].split("/").length - 1];
							arrtodas.push({ laid: elid, imagen: `https://${laimagen}` });
						}
						return arrtodas;
					},
				},
				descripcion: resumen[5],
			};

			todo.push({
				id: p.id, nombre: p.nombre, precio: p.precio(), fechaentrega: p.fechaentrega, imagenprincipal: p.imagen.principal, imagenes: p.imagen.todas(), descripcion: p.descripcion,
			});
			setDetalle( todo );
		});
	}, [id]);

	if ( detalle ) {
		const res = detalle[0];
		return (
			<>
				<Helmet>
					<title>{res.nombre} || { NOMBRETIENDA }</title>
					<meta property="og:image" content={res.imagenprincipal} />
					<meta property="twitter:image" content={res.imagenprincipal} />
				</Helmet>
				<section key={res.id} id="detalle">
					<h2>{res.nombre}</h2>
					<img src={res.imagenprincipal} alt={res.nombre} />
					<p className="precio">$ {res.precio}</p>
					<p>{res.fechaentrega}</p>
					<div className="imagenes">
						{ res.imagenes?.map(({ laid, imagen }) => {
							return (<img key={laid} src={imagen} alt={res.nombre} />);
						}) }
					</div>
					<div className="descripcion">
						<strong>DESCRIPCION:</strong>
						<ul>
							{
								JSON.parse(res.descripcion)?.map((algo) => {
									return (<li key={algo.key}><strong>{algo.key}</strong> <span>{algo.val}</span></li>);
								})
							}
						</ul>
					</div>
				</section>
			</>
		);
	}
	return (<Loading />);
}
export default Detalle;
