import { NavLink } from "react-router-dom";
import { NOMBRETIENDA } from "../../assets/js/CONST";
// import { homeBreadcrumb } from "../../assets/svg/breadcrumb_home.svg";
import homeBreadcrumb from "../../assets/svg/breadcrumb_home.svg";

import "./Breadcrumb.css";

function Breadcrumb( props ) {
	const { categoria, nombre } = props;

	return (
		<section id="breadcrumb">
			<ul>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/">
						<img src={homeBreadcrumb} alt={NOMBRETIENDA} />
					</NavLink>
				</li>
				<span>/</span>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to="/tienda">tienda</NavLink>
				</li>
				<span>/</span>
				<li>
					<NavLink className={({ isActive }) => (isActive ? "tamoactivo" : "none")} to={`/categoria/${categoria}`}>
						{categoria}
					</NavLink>
				</li>
				<span>/</span>
				<li>
					<strong>{nombre}</strong>
				</li>
			</ul>
		</section>
	);
}
export default Breadcrumb;
