import { Helmet } from "react-helmet";
import { NOMBRETIENDA } from "../../assets/js/CONST";
import Carrusel from "../../components/Carrusel/Carrusel";
import "./Inicio.css";

function Inicio() {
	return (
		<>
			<Helmet>
				<title>Bienvenido || { NOMBRETIENDA }</title>
			</Helmet>
			<section id="inicio">
				<Carrusel />
			</section>
		</>
	);
}
export default Inicio;
