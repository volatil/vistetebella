import Elhelmet from "../../components/Elhelmet/Elhelmet";
import Carrusel from "../../components/Carrusel/Carrusel";
import "./Inicio.css";

function Inicio() {
	return (
		<>
			<Elhelmet title="Bienvenido" lugar="inicio" />
			<section id="inicio">
				<Carrusel />
			</section>
		</>
	);
}
export default Inicio;
