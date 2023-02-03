import { NavLink } from "react-router-dom";

import "./Menu.css";

function Menu() {
	return (
		<nav>
			<ul>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/">inicio</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/tienda">tienda</NavLink>
				</li>
			</ul>
		</nav>
	);
}
export default Menu;
