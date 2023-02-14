import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isMobile, deployMenu, traeCategorias } from "../../Helpers/Helpers";

import "./Menu.css";

function MenuDesktop() {
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

function MenuMobile( props ) {
	// const { losmenu } = props;
	// const algo = losmenu;
	const algo = traeCategorias();
	console.debug( algo );
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
			<ul>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/tienda">tienda</NavLink>
				</li>
				<ul>
					<li>CATEGORIAS</li>
					{
						algo.map((elme) => {
							return (
								<li key={elme}>
									<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to={`/categoria/${elme}`}>{elme}</NavLink>
								</li>
							);
						})
					}
				</ul>
			</ul>
		</nav>
	);
}

function Menu() {
	// const [menu, setMenu] = useState();
	useEffect(() => {
		deployMenu();
		// setMenu( traeCategorias() );
	}, []);
	return (
		isMobile() ? <MenuMobile /> : <MenuDesktop />
	);
}
export default Menu;
