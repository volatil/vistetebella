import { useEffect } from "react";
import "./Relacionados.css";
import { traeData } from "../../Helpers/Helpers";

function Relacionados() {
	useEffect(() => {
		const ladata = traeData();
	}, []);

	return (
		<section id="relacionados">
			<h2>Relacionados</h2>
		</section>
	);
}
export default Relacionados;
