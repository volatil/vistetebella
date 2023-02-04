import { Helmet } from "react-helmet";
import { NOMBRETIENDA } from "../../assets/js/CONST";

import RevisaRepetidos from "./components/RevisaRepetidos";

import "./Cerebro.css";

function Cerebro() {
	return (
		<>
			<Helmet>
				<title>Cerebro || { NOMBRETIENDA }</title>
			</Helmet>
			<section id="cerebro">
				<h1>CEREBRO</h1>
				<RevisaRepetidos />
			</section>
		</>
	);
}
export default Cerebro;
