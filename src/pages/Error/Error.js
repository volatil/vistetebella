import Elhelmet from "../../components/Elhelmet/Elhelmet";
import "./Error.css";

function Error() {
	return (
		<>
			<Elhelmet title="La página que está buscando no existe, está mal escrita o no existe" lugar="error" />
			<section id="error">
				<p className="titulo"><span className="azul">40 + 4 =</span> <span className="rojo">404</span></p>
				<p className="bajada">¡La página que está buscando no existe, está mal escrita o no existe!</p>
			</section>
		</>
	);
}
export default Error;
