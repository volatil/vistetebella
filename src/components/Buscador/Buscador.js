import { traeCategorias } from "../../Helpers/Helpers";
import "./Buscador.css";

function Buscador() {
	const lostest = ["Edge", "Firefox", "Chrome", "Opera", "Safari"];
	const categorias = traeCategorias();

	return (
		<section id="buscador">
			<form method="get" action="/resultados/">
				<input list="data" type="text" name="q" placeholder="Buscar" />
				<button type="submit">Buscar</button>
				<datalist id="data">
					{/* {
						categorias.map((categoria) => {
							return ( <option value={categoria} key={categoria}>{categoria}</option> );
						})
					} */}
					{/* <option value="Edge">Edge</option>
					<option value="Firefox">Firefox</option>
					<option value="Chrome">Chrome</option>
					<option value="Opera">Opera</option>
					<option value="Safari">Safari</option> */}
				</datalist>
			</form>
		</section>
	);
}
export default Buscador;
