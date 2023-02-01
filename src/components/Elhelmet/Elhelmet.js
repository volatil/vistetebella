import { Helmet } from "react-helmet";
import { NOMBRETIENDA } from "../../assets/js/CONST";

function Elhelmet({ title, lugar }) {
	if ( lugar === "error" ) {
		return (
			<Helmet>
				<title>{title} || { NOMBRETIENDA }</title>
			</Helmet>
		);
	}
	if ( lugar === "inicio" ) {
		return (
			<Helmet>
				<title>{title} || { NOMBRETIENDA }</title>
			</Helmet>
		);
	}
	if ( lugar === "grilla" ) {
		return (
			<Helmet>
				<title>{title} || { NOMBRETIENDA }</title>
			</Helmet>
		);
	}
	if ( lugar === "detalle" ) {
		return (
			<Helmet>
				<title>{title} || { NOMBRETIENDA }</title>
			</Helmet>
		);
	}
}
export default Elhelmet;
