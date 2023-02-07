import "./Buscador.css";

function Buscador() {
	return (
		<section id="buscador">
			<form method="get" action="/resultados/">
				<input type="text" name="q" placeholder="Buscar" />
				<button type="submit">Buscar</button>
			</form>
		</section>
	);
}
export default Buscador;
