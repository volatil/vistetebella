import { traeData, quitaDelArrayUnaKey, quitaDelArrayLosRepetidos } from "../../Helpers/Helpers";
import "./Buscador.css";

function Buscador() {
	let datacolor = [];
	const datanombre = [];
	const datacategoria = [];
	for ( let count = 0; count <= traeData().length - 1; count++ ) {
		datacolor.push( traeData()[count].color() );
		datanombre.push( traeData()[count].nombre );
		datacategoria.push( traeData()[count].categoria );
	}
	datacolor = quitaDelArrayLosRepetidos({ array: datacolor });
	quitaDelArrayUnaKey({ array: datacolor, keyPorQuitar: "no especifica" });
	const todosLosArray = [...new Set(datacolor), ...new Set(datanombre), ...new Set(datacategoria)];

	return (
		<section id="buscador">
			<form method="get" action="/resultados/">
				<input list="data" type="text" name="q" placeholder="Buscar" />
				<button type="submit">Buscar</button>
				<datalist id="data">
					{
						todosLosArray.map((elcolor) => {
							return ( <option value={elcolor} key={elcolor}>{elcolor}</option> );
						})
					}
				</datalist>
			</form>
		</section>
	);
}
export default Buscador;
