import { NavLink } from "react-router-dom";
import { NOMBRETIENDA } from "../../assets/js/CONST";

import "./Producto.css";

function Producto({
	id, nombre, precio, imagen, color,
}) {
	return (
		<NavLink key={id} className="producto" to={`/producto/${id}/${nombre}`} data-color={color} title={nombre}>
			<div className="imagen">
				<img src={imagen} alt={NOMBRETIENDA} />
			</div>
			<div className="contenido">
				<h2>{nombre}</h2>
				<p className="precio">$ {precio}</p>
			</div>
		</NavLink>
	);
}
export default Producto;
