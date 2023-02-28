import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { isMobile, deployMenu, traeCategorias } from "../../Helpers/Helpers";

import carrito from "../../assets/svg/carrito.svg";

import "./Menu.css";

function MenuDesktop() {
	return (
		<nav className="desktop">
			<ul>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : null )} to="/tienda">tienda</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : null )} to="/wishlist">Wishlist</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "carrito tamoactivo" : "carrito" )} to="/carro">
						<img src={carrito} alt="Carrito" />
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

function MenuMobile() {
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
