import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import eljson from "../../assets/json/inventario.json";

import { NOMBRETIENDA } from "../../assets/js/CONST";
import Loading from "../../components/Loading/Loading";

import "./Detalle.css";

import {
	armonizarURL,
	precio,
	cambiarThumb,
	lafechaEntrega,
	tabs,
	isMobile,
	humanizaString,
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

function Thumbnails({ imagenes, nombre }) {
	return (
		<div className="thumbnails">
			{ imagenes.map(( imagen ) => {
				return (
					<img data-test={imagen.laid} key={imagen.laid} src={imagen.imagen} alt={nombre} />
				);
			}) }
		</div>
	);
}

function Descripcion({ descripcion }) {
	return (
		<ul>
			{
				JSON.parse(descripcion)?.map((algo) => {
					return (<li key={algo.key}><strong>{algo.key}</strong> <span>{algo.val}</span></li>);
				})
			}
		</ul>
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
		<>
			{
				JSON.parse(data).map((user) => {
					return (
						<div key={user.nombre} className="bloque">
							<strong className="nombre">{user.nombre}: </strong>
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
		</>
	);
}

function BarraComprar({ clase }) {
	return (
		<nav className={`barracomprar ${clase}`}>
			<a href="#asdasd" title="Comprar">comprar</a>
		</nav>
	);
}

function Breadcrumb({ categoria }) {
	return (
		<section id="breadcrumb">
			<ul>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/tienda">tienda</NavLink>
				</li>
				<span>/</span>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to={`/categoria/${categoria}`}>
						<strong>{categoria}</strong>
					</NavLink>
				</li>
			</ul>
		</section>
	);
}

function Detalle() {
	const [detalle, setDetalle] = useState(null);
	const id = useLocation().pathname.split("/")[2];

	useEffect(() => {
		const data = [];

		const resumen = eljson.values[id];
		const p = {
			id: resumen[0],
			nombre: resumen[1],
			precio: precio(resumen[2]),
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
			categoria: resumen[9],
		};
		data.push( p );
		setDetalle(data);
	}, [id]);

	useEffect(() => {
		armonizarURL(3);
		lafechaEntrega();
		cambiarThumb();
		tabs();
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

				<Breadcrumb categoria={res.categoria} />

				<section key={res.id} id="detalle">

					{ !isMobile() && <Thumbnails imagenes={res.imagen.todas()} nombre={res.nombre} /> }

					<div className="principal">
						<img className="imagenprincipal" src={res.imagen.principal} alt={res.nombre} />
					</div>

					{ isMobile() && <Thumbnails imagenes={res.imagen.todas()} nombre={res.nombre} /> }

					<div className="informacion">
						<h2>{res.nombre}</h2>
						<div className="valoracion">Valoracion: <strong>{res.valoracion}</strong></div>
						<p className="precio">$ {res.precio}</p>
						<Tallas data={res.tallas()} />
						<BarraComprar clase="desktop" />
						<FechaEntrega />
						<BarraComprar clase="mobile" />
					</div>

				</section>

				<section id="tabsDetalle">
					<ul className="tabs-titulo">
						<li data-titulo="descripcion" className="activo">descripcion</li>
						<li data-titulo="comentarios">comentarios</li>
					</ul>
					<div className="tabs-contenido">
						<div data-contenido="descripcion">
							<Descripcion descripcion={res.descripcion} />
						</div>
						<div data-contenido="comentarios">
							<Comentarios data={res.comentarios.comentario} />
						</div>
					</div>
				</section>

			</>
		);
	}
	return (<Loading />);
}
export default Detalle;
