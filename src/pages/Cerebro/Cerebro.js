import { Helmet } from "react-helmet";
import { NOMBRETIENDA } from "../../Helpers/Const";

import RevisaLinksRepetidos from "./components/RevisaLinksRepetidos";

import "./Cerebro.css";

function Cerebro() {
	return (
		<>
			<Helmet>
				<title>Cerebro || { NOMBRETIENDA }</title>
			</Helmet>
			<section id="cerebro">
				<h1>CEREBRO</h1>
				<RevisaLinksRepetidos />
			</section>
		</>
	);
}
export default Cerebro;
