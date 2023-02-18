import { useEffect, useState } from "react";
import $ from "jquery";
import Button from "../Button/Button";
import direccionenvio from "../../assets/svg/direccionenvio.svg";
import simbolocerrar from "../../assets/svg/simbolocerrar.svg";
import "./DireccionesEnvio.css";

function CONdireccion() {
	return (
		<>
			<div>
				<h6 className="titulo">Elige dónde recibir tus compras</h6>
				<p>Podrás ver costos y tiempos de entrega precisos en todo lo que busques.</p>
			</div>
			{/* <div></div> */}
		</>
	);
}

function SINdireccion({ children }) {
	return (
		<>
			<img className="cerrarmodal" src={simbolocerrar} alt="cerrar" />
			<div className="titulo">
				<h6>Elige dónde recibir tus compras</h6>
				<p>Podrás ver costos y tiempos de entrega precisos en todo lo que busques.</p>
			</div>
			<div className="lugar">
				<div className="seleccionar region">
					<p>región</p>
					<select>
						<option value="no">Elija una opción</option>
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
				<div className="seleccionar comuna">
					<p>comuna</p>
					<select>
						<option value="no">Elija una opción</option>
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
				<div className="campoboton">
					{children}
				</div>
			</div>
		</>
	);
}

function DireccionesEnvio() {
	const [direccionAgregada, setDireccionAgregada] = useState();
	const [estadoboton, setestadoboton] = useState("disabled");
	const [muestraModal, setmuestraModal] = useState();

	useEffect(() => {
		setDireccionAgregada(true);

		$("body").on("change", ".seleccionar > select", () => {
			$.each( $(".seleccionar > select"), () => {
				const selectVal = {
					region: $(".seleccionar.region > select").val(),
					comuna: $(".seleccionar.comuna > select").val(),
				};

				if ( selectVal.region !== "no" && selectVal.comuna !== "no" ) {
					setestadoboton("enable");
				} else {
					setestadoboton("disabled");
				}
			});
		});

		$("body").on("click", "img.cerrarmodal, .modaldireccionenvio-fondo", () => {
			setmuestraModal(false);
			setestadoboton("disabled");
		});

		$("#direccionesenvio").on("click", () => {
			setmuestraModal(true);
		});
	}, []);

	return (
		<>
			<div id="direccionesenvio">
				<img src={direccionenvio} alt="Direcciones de Envio" />
				{ direccionAgregada ? <p>cambiar dirección envío</p> : <p>Ingresa tu dirección de envío</p> }
			</div>
			{
				muestraModal
					? (
						<>
							<div className="modaldireccionenvio-fondo" />
							<div className="modaldireccionenvio-contenido">
								<SINdireccion>
									<Button texto="Aceptar" estado={estadoboton} />
								</SINdireccion>
							</div>
						</>
					)
					: "asdasd"
			}
		</>
	);
}
export default DireccionesEnvio;
