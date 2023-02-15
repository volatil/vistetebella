import { NavLink } from "react-router-dom";
import { NOMBRETIENDA } from "../../Helpers/Const";

import logo from "../../assets/imagenes/logo.svg";

function Logo() {
	return (
		<section id="logo">
			<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/">
				<img src={logo} alt={NOMBRETIENDA} />
			</NavLink>
		</section>
	);
}
export default Logo;
