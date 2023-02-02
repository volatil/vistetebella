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
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/productos">Productos</NavLink>
				</li>
			</ul>
		</nav>
	);
}
export default Menu;
