import { NavLink } from "react-router-dom";
import { NOMBRETIENDA } from "../../Helpers/Const";
import "./Footer.css";
import logo from "../../assets/imagenes/logo.svg";

function Footer() {
	return (
		<footer>
			<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/">
				<img src={logo} alt={NOMBRETIENDA} />
			</NavLink>
		</footer>
	);
}
export default Footer;
