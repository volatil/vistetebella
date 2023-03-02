import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { NOMBRETIENDA } from "../../Helpers/Const";
import Loading from "../../components/Loading/Loading";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Relacionados from "../../components/Relacionados/Relacionados";
import AgregarQuitarWISHLIST from "../../components/AgregarQuitarWISHLIST/AgregarQuitarWISHLIST";

import "./Detalle.css";

import {
	armonizarURL,
	cambiarThumb,
	lafechaEntrega,
	tabs,
	isMobile,
	traeData,
	nomeabandones,
} from "../../Helpers/Helpers";

import { clickAgregar } from "../../Helpers/Carro";

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
			<p>Comprar</p>
		</nav>
	);
}

function Valoracion({ valoracion }) {
	function laclase( recibe ) {
		let lavalora = recibe.replaceAll(".", "_");
		console.debug( lavalora );
		if ( lavalora.includes("_") ) {
			lavalora = lavalora.split("_")[0];
			return lavalora;
		}
		return lavalora;
	}

	return (
		<div className="valoracion">
			<span className={`icono estrella${laclase(valoracion)}`} />
			<strong>{valoracion}</strong>
		</div>
	);
}

function Detalle() {
	const [detalle, setDetalle] = useState(null);
	const id = useParams().id;

	useEffect(() => {
		setDetalle( traeData() );
	}, []);

	useEffect(() => {
		armonizarURL(3);
		lafechaEntrega();
		cambiarThumb();
		tabs();
		clickAgregar( id );
	});

	if ( detalle ) {
		const res = detalle[id - 1];

		return (
			<>
				<Helmet>
					<title>{ res.nombre } || { NOMBRETIENDA }</title>
					{ nomeabandones( `${ res.nombre } || ${ NOMBRETIENDA }` ) }
					<meta property="og:image" content={res.imagenprincipal} />
					<meta property="twitter:image" content={res.imagenprincipal} />
				</Helmet>

				<section key={res.id} id="detalle">

					{ !isMobile() && <Thumbnails imagenes={res.imagen.todas()} nombre={res.nombre} /> }

					<div className="principal">
						<AgregarQuitarWISHLIST id={id} />
						<img className="imagenprincipal" src={res.imagen.principal} alt={res.nombre} />
					</div>

					{ isMobile() && <Thumbnails imagenes={res.imagen.todas()} nombre={res.nombre} /> }

					<div className="informacion">
						{ !isMobile() && <Breadcrumb categoria={res.categoria} nombre={res.nombre} /> }
						<h2>{res.nombre}</h2>
						<Valoracion valoracion={res.valoracion} />
						<p className="precio">$ {res.precio}</p>
						<Tallas data={res.tallas()} />
						{ !isMobile() && <BarraComprar clase="desktop" /> }
						<FechaEntrega />
						{ isMobile() && <BarraComprar clase="mobile" /> }
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

				<Relacionados idactual={res.id} />

			</>
		);
	}
	return (<Loading />);
}
export default Detalle;
