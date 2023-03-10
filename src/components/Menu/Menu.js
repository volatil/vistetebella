import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { refrescarCantidadProductosEnCarro } from "../../Helpers/Carro";
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
				<li className="carrito">
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : null )} to="/carro">
						<img src={carrito} alt="Carrito" />
						<span className="cantidad" />
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
					<span />
					<span />
					<span />
				</div>
			</div>
			<div className="losmenus">
				<div>
					<ul>
						<li>
							<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : null )} to="/tienda">Tienda</NavLink>
						</li>
						<li>
							<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : null )} to="/wishlist">Wishlist</NavLink>
						</li>
						<li>
							<NavLink className={({ isActive }) => (isActive ? "carrito tamoactivo" : "carrito" )} to="/carro">
								Carro
							</NavLink>
						</li>
					</ul>
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
		refrescarCantidadProductosEnCarro();
	}, []);
	return (
		isMobile() ? <MenuMobile /> : <MenuDesktop />
	);
}
export default Menu;
