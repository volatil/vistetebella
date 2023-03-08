import { NavLink } from "react-router-dom";

import Suscripcion from "../Suscripcion/Suscripcion";

import { NOMBRETIENDA } from "../../Helpers/Const";

import logo from "../../assets/imagenes/logo.svg";
import "./Footer.css";

function Footer() {
	return (
		<footer>
			<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/">
				<img src={logo} alt={NOMBRETIENDA} />
			</NavLink>
			<div className="suscripcion">
				<Suscripcion />
			</div>
		</footer>
	);
}
export default Footer;
