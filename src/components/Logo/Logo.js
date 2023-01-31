import { NavLink } from "react-router-dom";
import { NOMBRETIENDA } from "../../assets/js/CONST";

import "./Logo.css";
import logo from "../../assets/imagenes/logo.svg";


function Logo() {
	return (
		<section id="logo">
			<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/" >
				<img src={logo} alt={NOMBRETIENDA} />
			</NavLink>
		</section>
	)
}
export default Logo;