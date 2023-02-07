import { Helmet } from "react-helmet";

import { NOMBRETIENDA } from "../../assets/js/CONST";

function getSearch( param ) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const parametro = urlParams.get( param );
	return parametro;
}

function Resultados() {
	return (
		<>
			<Helmet>
				<title>Busqueda de {getSearch("q")} || {NOMBRETIENDA}</title>
			</Helmet>
			<h2>Resultados para: {getSearch("q")}</h2>
		</>
	);
}
export default Resultados;
