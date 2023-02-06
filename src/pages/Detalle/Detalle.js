import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import { DB, NOMBRETIENDA } from "../../assets/js/CONST";
import Loading from "../../components/Loading/Loading";

import "./Detalle.css";

import {
	armonizarURL,
	devuelveAlHome,
	precio,
	cambiarThumb,
	lafechaEntrega,
} from "../../Helpers/Helpers";

function FechaEntrega() {
	return (
		<div>
			{
				lafechaEntrega().map((lafecha) => {
					// return (<p key={lafecha.minima}>{lafecha.minima}</p>);
					return (<p key={lafecha.minima}>Si lo compras <strong>HOY</strong> lo recibiras entre el <strong>{lafecha.minima}</strong> al <strong>{lafecha.maxima}</strong>.</p>);
				})
			}
		</div>
	);
}

function Thumbnails({ data, nombre }) {
	return (
		<div className="imagenes">
			{ data.todas()?.map(({ laid, imagen }) => {
				return (
					<img key={laid} alt={nombre} src={imagen} />
				);
			}) }
		</div>
	);
}

function Descripcion({ descripcion }) {
	return (
		<div className="descripcion">
			<strong>DESCRIPCION:</strong>
			<ul>
				{
					JSON.parse(descripcion)?.map((algo) => {
						return (<li key={algo.key}><strong>{algo.key}</strong> <span>{algo.val}</span></li>);
					})
				}
			</ul>
		</div>
	);
}

function Tallas({ data }) {
	return (
		<div className="tallas">
			<select>
				<option value="vacio">Seleccione una talla</option>
				{
					data.map((talla) => {
						return (
							<option key={talla} value={talla}>{talla}</option>
						);
					})
				}
			</select>
		</div>
	);
}

function Comentarios({ data }) {
	return (
		<div className="comentarios">
			<h5>COMENTARIOS</h5>
			<div className="bloques">
				{
					JSON.parse(data)?.map((user) => {
						return (
							<div key={user.nombre} className="bloque">
								<strong className="nombre">{user.nombre} </strong>
								<span className="comentario">{user.comentario} </span>
								<span className="imagenes">
									{
										user.foto.map((img) => { return (<img key={img} src={img} alt="imagen" />); })
									}
								</span>
							</div>
						);
					})
				}
			</div>
		</div>
	);
}

function BarraComprar({ clase }) {
	return (
		<nav className={`barracomprar ${clase}`}>
			<a href="#asdasd" title="Comprar">comprar</a>
		</nav>
	);
}

function Detalle() {
	const [detalle, setDetalle] = useState(null);
	const id = useLocation().pathname.split("/")[2];

	armonizarURL();
	lafechaEntrega();

	useEffect(() => {
		fetch( DB ).then( (x) => x.json() ).then( (x) => {
			const resumen = x.values[id];
			const todo = [];

			// console.table( resumen );

			devuelveAlHome( resumen );

			const p = {
				id: resumen[0],
				nombre: resumen[1].replaceAll("SHEIN ", "").toLowerCase(),
				precio: () => {
					return precio( resumen[2] );
				},
				fechaentrega: lafechaEntrega(),
				imagen: {
					principal: resumen[4].split(",//")[0],
					todas: () => {
						const arrtodas = [];
						const todas = resumen[4];
						for ( let count = 0; count <= todas.split(",//").length - 2; count++ ) {
							const laimagen = todas.split(",//")[count].replaceAll("//", "");
							const elid = laimagen.split("_thumbnail")[0].split("/")[laimagen.split("_thumbnail")[0].split("/").length - 1];
							arrtodas.push({ laid: elid, imagen: `https://${laimagen}` });
						}
						return arrtodas;
					},
				},
				descripcion: resumen[5],
				tallas: () => {
					const arrtallas = [];
					const tallas = resumen[6];
					for ( let count = 0; count <= tallas.split(",").length - 1; count++ ) {
						arrtallas.push( tallas.split(",")[count] );
					}
					return arrtallas;
				},
				valoracion: resumen[8],
				categoria: resumen[9],
				comentarios: {
					comentario: resumen[10],
				},
				color: () => {
					let color = resumen[11];
					if ( !color ) {
						color = "No especificado";
					}
					return color;
				},
			};

			todo.push( p );

			setDetalle( todo );
		});
	}, [id]);

	useEffect(() => {
		cambiarThumb();
	});

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
					<div className="thumbnails">
						<Thumbnails data={res.imagen} nombre={res.nombre} />
					</div>
					<div className="principal">
						<img className="imagenprincipal" src={res.imagen.principal} alt={res.nombre} />
					</div>
					<div className="informacion">
						<h2>{res.nombre}</h2>
						<div className="valoracion">Valoracion: <strong>{res.valoracion}</strong></div>
						<p className="categoria">{res.categoria}</p>
						<p className="precio">$ {res.precio()}</p>
						<Tallas data={res.tallas()} />
						<BarraComprar clase="desktop" />
						<FechaEntrega />
						<BarraComprar clase="mobile" />
					</div>
				</section>
				<Descripcion descripcion={res.descripcion} />
				<Comentarios data={res.comentarios.comentario} />
			</>
		);
	}
	return (<Loading />);
}
export default Detalle;
