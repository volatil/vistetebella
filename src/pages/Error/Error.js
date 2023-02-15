import { Helmet } from "react-helmet";
import { NOMBRETIENDA } from "../../Helpers/Const";
import "./Error.css";

function Error() {
	return (
		<>
			<Helmet>
				<title>¡La página que está buscando no existe, está mal escrita o no existe! || { NOMBRETIENDA }</title>
			</Helmet>
			<section id="error">
				<p className="titulo"><span className="azul">40 + 4 =</span> <span className="rojo">404</span></p>
				<p className="bajada">¡La página que está buscando no existe, está mal escrita o no existe!</p>
			</section>
		</>
	);
}
export default Error;
