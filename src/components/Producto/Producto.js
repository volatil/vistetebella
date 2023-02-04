import { NavLink } from "react-router-dom";
import { NOMBRETIENDA } from "../../assets/js/CONST";

import "./Producto.css";

function Producto({
	id, nombre, precio, imagen, color,
}) {
	return (
		<NavLink key={id} className="producto" to={`/detalle/${id}/${nombre}`} data-color={color} title={nombre}>
			<div className="imagen">
				<img src={imagen} alt={NOMBRETIENDA} />
			</div>
			<h2>{nombre}</h2>
			<p className="precio">$ {precio}</p>
		</NavLink>
	);
}
export default Producto;
