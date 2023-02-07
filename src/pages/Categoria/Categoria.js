import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { DB, NOMBRETIENDA } from "../../assets/js/CONST";
import {
	armonizarURL,
	devuelveAlHome,
	precio,
	cambiarThumb,
	lafechaEntrega,
	tabs,
	isMobile,
	humanizaString,
} from "../../Helpers/Helpers";

function Categoria() {
	const categoria = useLocation().pathname.split("/")[2];
	const corrigeTitle = () => {
		const eltitle = categoria;
		return humanizaString(eltitle);
	};

	useEffect(() => {
		armonizarURL(2);
	});

	return (
		<>
			<Helmet>
				<title>{corrigeTitle(categoria)} || { NOMBRETIENDA }</title>
			</Helmet>
			<section id="categoria">
				<p>Categoria: <strong>{humanizaString(categoria)}</strong></p>
			</section>
		</>
	);
}
export default Categoria;
