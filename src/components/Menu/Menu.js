import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { isMobile, deployMenu, traeCategorias } from "../../Helpers/Helpers";

import "./Menu.css";

function MenuDesktop() {
	return (
		<nav className="desktop">
			<ul>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/">inicio</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/tienda">tienda</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/wishlist">wishlist</NavLink>
				</li>
			</ul>
		</nav>
	);
}

function MenuMobile( props ) {
	const categorias = traeCategorias();
	return (
		<nav className="mobile">
			<div className="elmenu">
				<p>MENU</p>
				<div>
					<span>&nbsp;</span>
					<span>&nbsp;</span>
					<span>&nbsp;</span>
				</div>
			</div>
			<div className="losmenus">
				<div>
					<p>CATEGORIAS</p>
					<ul>
						{
							categorias.map((lacategoria) => {
								return (
									<li key={lacategoria}>
										<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to={`/categoria/${lacategoria}`}>{lacategoria}</NavLink>
									</li>
								);
							})
						}
						<li>
							<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/tienda"><strong>VER TODO</strong></NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

function Menu() {
	useEffect(() => {
		deployMenu();
	}, []);
	return (
		isMobile() ? <MenuMobile /> : <MenuDesktop />
	);
}
export default Menu;
