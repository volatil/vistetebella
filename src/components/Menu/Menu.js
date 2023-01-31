import { NavLink } from "react-router-dom";

import "./Menu.css";

function Menu() {
	return (
		<nav>
			<ul>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/">Inicio</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/grilla">Grilla</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/soyunerror">Error404</NavLink>
				</li>
			</ul>
		</nav>
	);
}
export default Menu;
