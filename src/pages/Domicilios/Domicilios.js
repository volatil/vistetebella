import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import $ from "jquery";

import Button from "../../components/Button/Button";
import domicilios from "../../assets/svg/domicilios.svg";

import { NOMBRETIENDA } from "../../Helpers/Const";
import { nomeabandones } from "../../Helpers/Helpers";

import work from "../../assets/svg/work.svg";
import house from "../../assets/svg/house.svg";
import menupuntos from "../../assets/svg/menu_puntos.svg";

import "./Domicilios.css";

function EDITARdireccion({ children }) {
	let losdomicilios = localStorage.getItem("vistetebella_domicilio");
	losdomicilios = JSON.parse(losdomicilios);
	// console.debug( losdomicilios );

	// Despliega los puntitos para editar o eliminar
	$("body").on("click", ".menupuntitos", function () {
		console.debug( "CLICK menupuntitos 2.2" );
		$(this).find("ul").toggle();
	});
	$("body").on("click", ".menupuntitos > ul > li", function () {
		const texto = $(this).text();
		if ( texto === "eliminar" ) {
			const posicion = $(this).parent().parent().parent()
				.attr("data-posicion");
			// console.debug( `[${posicion}] ${texto}` );
			const todaslasdirecciones = JSON.parse(localStorage.getItem("vistetebella_domicilio"));
			// console.debug( todaslasdirecciones );
			todaslasdirecciones.splice(Number(posicion), 1);
			// console.debug( todaslasdirecciones );
			localStorage.setItem("vistetebella_domicilio", JSON.stringify(todaslasdirecciones));

			// const domicilioAnterior = JSON.parse(localStorage.getItem("vistetebella_domicilio"));
			// domicilioAnterior.push( domicilioNuevo );
			// localStorage.setItem("vistetebella_domicilio", JSON.stringify(domicilioAnterior));
		}
	});

	return (
		<div className="bloqueDireccion editardireccion">
			<div className="titulo">
				<h6>Elige dónde recibir tus compras</h6>
				<p>Podrás ver costos y tiempos de entrega precisos en todo lo que busques.</p>
			</div>
			<div className="datosdomicilio">
				{
					losdomicilios?.map((eldomi, numero) => {
						return (
							<div data-posicion={numero} key={eldomi.referencia}>
								<p className="titulo">
									<img src={eldomi.casatrabajo === "casa" ? house : work} alt={eldomi.casatrabajo} />
									<strong>{eldomi.calle} {eldomi.numero}, {eldomi.referencia}</strong>
								</p>
								<p>{eldomi.region}, {eldomi.comuna}</p>
								<p>{eldomi.nombre} {eldomi.apellido} - {eldomi.telefono}</p>
								<div className="menupuntitos">
									<img src={menupuntos} alt="mini menu" />
									<ul>
										{/* <li className="editar">editar</li> */}
										<li className="eliminar">eliminar</li>
									</ul>
								</div>
							</div>
						);
					})
				}
			</div>
		</div>
	);
}

function AGREGARdireccion({ children }) {
	// Click en el texto del text=radio
	$(".doblecampo.casatrabajo > div > div p").on("click", function () {
		$(this).prev().click();
	});

	// TEXTAREA con maximo de texto
	$(".referencia textarea").on("keyup", function () {
		const cantidadLetras = $(this).val().length;
		$(".referencia > span").html(`${cantidadLetras}/128`);
	});

	return (
		<div className="bloqueDireccion agregardireccion">
			<div className="titulo">
				<h6>Agregar Domicilio</h6>
				<p>Podrás ver costos y tiempos de entrega precisos en todo lo que busques.</p>
			</div>
			<div className="datosdomicilio">
				<div className="nombre">
					<p className="label">nombre y apellido</p>
					<input className="input_nombre" type="text" />
					<span className="descripcion">tal cual figure en la cédula de identidad.</span>
				</div>
				<div className="doblecampo">
					<div>
						<p className="label">región</p>
						<select className="select_region">
							<option value="">Elija una opción</option>
							<option value="Aysén">Aysén</option>
							<option value="Antofagasta">Antofagasta</option>
							<option value="Arica y Parinacota">Arica y Parinacota</option>
							<option value="Atacama">Atacama</option>
							<option value="Biobío">Biobío</option>
							<option value="Coquimbo">Coquimbo</option>
							<option value="La Araucanía">La Araucanía</option>
							<option value="Libertador B. OHiggins">Libertador B. OHiggins</option>
							<option value="Los Lagos">Los Lagos</option>
							<option value="Los Ríos">Los Ríos</option>
							<option value="Magallanes">Magallanes</option>
							<option value="Maule">Maule</option>
							<option value="RM (Metropolitana)">RM (Metropolitana)</option>
							<option value="Tarapacá">Tarapacá</option>
							<option value="Valparaíso">Valparaíso</option>
							<option value="Ñuble">Ñuble</option>
						</select>
					</div>
					<div>
						<p className="label">comuna</p>
						<select className="select_comuna">
							<option value="">Elija una opción</option>
							<option value="Aysén">Aysén</option>
							<option value="Balmaceda">Balmaceda</option>
							<option value="Chile Chico">Chile Chico</option>
							<option value="Cisnes">Cisnes</option>
							<option value="Cochrane">Cochrane</option>
							<option value="Coyhaique">Coyhaique</option>
							<option value="Guaitecas">Guaitecas</option>
							<option value="La Junta">La Junta</option>
							<option value="Lago Verde">Lago Verde</option>
							<option value="OHiggins">OHiggins</option>
							<option value="Puerto Aguirre">Puerto Aguirre</option>
							<option value="Puerto Aysen">Puerto Aysen</option>
							<option value="Puerto Chacabuco">Puerto Chacabuco</option>
							<option value="Puerto Cisnes">Puerto Cisnes</option>
							<option value="Puyuhuapi">Puyuhuapi</option>
							<option value="Río Ibánez">Río Ibánez</option>
							<option value="Tortel">Tortel</option>
							<option value="Villa Manihuales">Villa Manihuales</option>
						</select>
					</div>
				</div>
				<div className="doblecampo">
					<div>
						<p className="label">calle</p>
						<input className="input_calle" type="text" />
						<span className="descripcion">escribe solo el nombre de la calle o avenida</span>
					</div>
					<div>
						<p className="label">número</p>
						<input className="input_numero" type="number" />
					</div>
				</div>
				<div className="doblecampo casatrabajo">
					<p>¿es casa o trabajo?</p>
					<div>
						<div>
							<input className="trabajo" type="radio" name="casatrabajo" />
							<p><img src={work} alt="trabajo" />trabajo</p>
						</div>
						<div>
							<input className="casa" type="radio" name="casatrabajo" />
							<p><img src={house} alt="casa" />casa</p>
						</div>
					</div>
				</div>
				<div className="telefono">
					<p className="label">teléfono de contacto</p>
					<input className="input_telefono" type="tel" />
				</div>
				<div className="referencia">
					<p className="label">referencias adicionales de esta dirección</p>
					<textarea className="textarea_referencia" maxLength="128" type="text" placeholder="Piso o departamento, descripción de la fachada, puntos de referencia, indicaciones de seguridad, etc." />
					<span>0/128</span>
				</div>
				{children}
			</div>
		</div>
	);
}

function Domicilios() {
	const [estadoboton, setestadoboton] = useState("disabled");
	const [isdireccion, setisdireccion] = useState();

	useEffect(() => {
		// Verifica si hay domicilio en el localStorage
		if ( localStorage.getItem("vistetebella_domicilio") ) {
			setisdireccion(true);
		} else {
			setisdireccion(false);
		}

		// Agrega direccion al localStorage
		$("body").on("click", ".agregardireccion #elboton.primario", () => {
			console.debug( "guardando ..." );
			const domicilioNuevo = {
				nombre: $("input.input_nombre").val(),
				region: $("select.select_region").val(),
				comuna: $("select.select_comuna").val(),
				calle: $("input.input_calle").val(),
				numero: $("input.input_numero").val(),
				casatrabajo: $("#domicilios .agregardireccion .datosdomicilio .doblecampo.casatrabajo > div input:checked").attr("class"),
				telefono: $("input.input_telefono").val(),
				referencia: $("textarea.textarea_referencia").val(),
			};

			if ( localStorage.getItem("vistetebella_domicilio") ) {
				const domicilioAnterior = JSON.parse(localStorage.getItem("vistetebella_domicilio"));
				domicilioAnterior.push( domicilioNuevo );
				localStorage.setItem("vistetebella_domicilio", JSON.stringify(domicilioAnterior));
				setisdireccion(true);
			} else {
				localStorage.setItem("vistetebella_domicilio", JSON.stringify([domicilioNuevo]));
				setisdireccion(true);
			}
		});

		// Despliega el agregar domicilio para AGREGAR OTRO MAS
		$("body").on("click", "#elboton.agregar", () => {
			console.debug( "inicio EDITANDO" );
			setisdireccion(false);
			console.debug( "fin EDITANDO" );
		});

		$("body").on("change", ".datosdomicilio", () => {
			const domicilioNuevo = {
				nombre: $("input.input_nombre").val(),
				region: $("select.select_region").val(),
				comuna: $("select.select_comuna").val(),
				calle: $("input.input_calle").val(),
				numero: $("input.input_numero").val(),
				casatrabajo: $("#domicilios .agregardireccion .datosdomicilio .doblecampo.casatrabajo > div input:checked").attr("class"),
				telefono: $("input.input_telefono").val(),
				referencia: $("textarea.textarea_referencia").val(),
			};

			if (
				domicilioNuevo.nombre
				&& domicilioNuevo.region
				&& domicilioNuevo.comuna
				&& domicilioNuevo.calle
				&& domicilioNuevo.numero
				&& domicilioNuevo.casatrabajo
				&& domicilioNuevo.telefono
			) {
				setestadoboton("primario");
			} else {
				setestadoboton("disabled");
			}
		});
	}, []);

	return (
		<>
			<Helmet>
				<title>Domicilios || {NOMBRETIENDA}</title>
				{ nomeabandones( `Domicilios || ${NOMBRETIENDA}` ) }
			</Helmet>
			<div id="domicilios">
				<div className="titulosuperior">
					<img src={domicilios} alt="Direcciones de Envio" />
					<h2>Domicilios</h2>
				</div>
				{
					isdireccion
						? (
							<>
								<EDITARdireccion />
								<Button estado="primario agregar" texto="Agregar Domicilio" estilo="marginTop: 10px" />
							</>
						)
						: (
							<AGREGARdireccion>
								<Button estado={estadoboton} texto="Aceptar" />
							</AGREGARdireccion>
						)
				}
			</div>
		</>
	);
}
export default Domicilios;
