import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import $ from "jquery";
import direccionenvio from "../../assets/svg/direccionenvio.svg";
import "./DireccionesEnvio.css";

function DireccionesEnvio() {
	const [direccionAgregada, setDireccionAgregada] = useState();

	useEffect(() => {
		if ( localStorage.getItem("vistetebella_domicilio") ) {
			setDireccionAgregada(true);
		} else {
			setDireccionAgregada(false);
		}
	}, []);

	return (
		<div id="direccionesenvio">
			<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : null )} to="/domicilios">
				<img src={direccionenvio} alt="Direcciones de Envio" />
				{
					direccionAgregada
						? <p>cambiar dirección envío</p>
						: <p>Ingresa tu dirección de envío</p>
				}
			</NavLink>
		</div>
	);
}
export default DireccionesEnvio;
