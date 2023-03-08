import { traeData, quitaDelArrayUnaKey, quitaDelArrayLosRepetidos } from "../../Helpers/Helpers";
import "./Buscador.css";

function Buscador() {
	let datacolor = [];
	const datanombre = [];
	const datacategoria = [];
	for ( let count = 0; count <= traeData().length - 1; count++ ) {
		datacategoria.push( traeData()[count].categoria.toLowerCase() );
		datanombre.push( traeData()[count].nombre.toLowerCase() );
		datacolor.push( traeData()[count].color() );
	}
	datacolor = quitaDelArrayLosRepetidos({ array: datacolor });
	quitaDelArrayUnaKey({ array: datacolor, keyPorQuitar: "no especifica" });
	const todosLosArray = [...new Set(datacategoria), ...new Set(datanombre), ...new Set(datacolor)];

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
