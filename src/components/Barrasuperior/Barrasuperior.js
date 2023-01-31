import { NavLink } from "react-router-dom";
import "./Barrasuperior.css";

function Barrasuperior() {
	return (
		<section id="barrasuperior">
			<NavLink to="/">
				<p><strong>DESPACHO GRATIS</strong> en compras sobre <strong>$ 15.000</strong></p>
			</NavLink>
		</section>
	);
}
export default Barrasuperior;
