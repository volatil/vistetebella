import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { NOMBRETIENDA } from "../../Helpers/Const";
import Loading from "../../components/Loading/Loading";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Relacionados from "../../components/Relacionados/Relacionados";
import AgregarQuitarWISHLIST from "../../components/AgregarQuitarWISHLIST/AgregarQuitarWISHLIST";

import regla from "../../assets/svg/regla.svg";
import cuadromedidas from "../../assets/imagenes/cuadromedidas.PNG";
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
import { showGuiaTallas, hideGuiaTallas, cambiarUnidadMedida } from "../../Helpers/Detalle";

function CompartirEnRedes() {
	return (
		<>
			<button type="button" className="compartirenredes">
				<span className="compartir" />
			</button>
			<section id="fondocompartirenredes" />
			<section id="modalcompartirenredes">
				<span>X</span>
				<h4>Compartir</h4>
				<div className="elementos">
					<ul>
						<li className="AAAAAAAAAAAAA">AAAAAAAAAAAAA</li>
						<li className="AAAAAAAAAAAAA">AAAAAAAAAAAAA</li>
						<li className="AAAAAAAAAAAAA">AAAAAAAAAAAAA</li>
						<li className="AAAAAAAAAAAAA">AAAAAAAAAAAAA</li>
					</ul>
				</div>
			</section>
		</>
	);
}

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

function Guiadetallas() {
	return (
		<>
			<div className="botonguiadetallas">
				<img src={regla} alt="Guía de Tallas" />
				<p>Guía de Tallas</p>
			</div>
			<section id="fondoguiadetallas" />
			<section id="guiadetallas">
				<span>X</span>
				<h4>Guia de tallas</h4>
				<div className="cambiarMedida">
					<p>Cambiar medida:</p>
					<ul>
						<li className="activo">cm</li>
						<li>in</li>
					</ul>
				</div>
				<table data-medida="cm" cellSpacing="0" cellPadding="0">
					<tbody>
						<tr>
							<td>Talla</td>
							<td>Contorno caderas</td>
							<td>Contorno cintura</td>
							<td>Pecho</td>
						</tr>
						<tr>
							<td>XS</td>
							<td>87 - 91</td>
							<td>62 - 66</td>
							<td>82 - 86</td>
						</tr>
						<tr>
							<td>S</td>
							<td>91 - 95</td>
							<td>66 - 70</td>
							<td>86 - 90</td>
						</tr>
						<tr>
							<td>M</td>
							<td>95 - 99</td>
							<td>70 - 74</td>
							<td>90 - 94</td>
						</tr>
						<tr>
							<td>L</td>
							<td>99 - 105</td>
							<td>74 - 80</td>
							<td>94 - 100</td>
						</tr>
						<tr>
							<td>XL</td>
							<td>105 - 111</td>
							<td>80 - 86</td>
							<td>100 - 106</td>
						</tr>
					</tbody>
				</table>
				<table data-medida="in" cellSpacing="0" cellPadding="0" style={{ display: "none" }}>
					<tbody>
						<tr>
							<td>Talla</td>
							<td>Contorno caderas</td>
							<td>Contorno cintura</td>
							<td>Pecho</td>
						</tr>
						<tr>
							<td>XS</td>
							<td>34.3 - 35.8</td>
							<td>24.4 - 26</td>
							<td>32.3 - 33.9</td>
						</tr>
						<tr>
							<td>S</td>
							<td>35.8 - 37.4</td>
							<td>26 - 27.6</td>
							<td>33.9 - 35.4</td>
						</tr>
						<tr>
							<td>M</td>
							<td>37.4 - 39</td>
							<td>27.6 - 29.1</td>
							<td>35.4 - 37</td>
						</tr>
						<tr>
							<td>L</td>
							<td>39 - 41.3</td>
							<td>29.1 - 31.5</td>
							<td>37 - 39.4</td>
						</tr>
						<tr>
							<td>XL</td>
							<td>41.3 - 43.7</td>
							<td>31.5 - 33.9</td>
							<td>39.4 - 41.7</td>
						</tr>
					</tbody>
				</table>
				<p>*Dependiendo de su tipo de cuerpo y hábitos de vestir, los tamaños anteriores son sólo de referencia.</p>
				<img src={cuadromedidas} alt="Cuadro de Medidas" />
			</section>
		</>
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

function Cantidad() {
	return (
		<div id="cantidad">
			<select>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
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
		showGuiaTallas();
		hideGuiaTallas();
		cambiarUnidadMedida();
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
						<CompartirEnRedes />
						<img className="imagenprincipal" src={res.imagen.principal} alt={res.nombre} />
					</div>

					{ isMobile() && <Thumbnails imagenes={res.imagen.todas()} nombre={res.nombre} /> }

					<div className="informacion">
						{ !isMobile() && <Breadcrumb categoria={res.categoria} nombre={res.nombre} /> }
						<h2>{res.nombre}</h2>
						<Valoracion valoracion={res.valoracion} />
						<p className="precio">$ {res.precio}</p>
						<p className="colorescondido" style={{ display: "none" }}>{res.colordescripcion()}</p>
						<Guiadetallas />
						<Tallas data={res.tallas()} />
						<Cantidad />
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
