import $ from "jquery";

const keyStorage = "vistetebella_carro";

export function agregarAlCarro() {
	$(".barracomprar").on("click", () => {
		const talla = $("section#detalle .informacion div.tallas select").val();
		if ( talla === "vacio" ) {
			console.debug("Debes seleccionar una talla");
		} else {
			console.debug(`Click! Talla: ${talla}`);
		}
	});
}

export function getProductos() {
	if ( localStorage.getItem( keyStorage ) ) {
		// asdasd
	} else {
		localStorage.setItem( keyStorage, false);
	}
}
