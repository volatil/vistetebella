import $ from "jquery";

const keyStorage = "vistetebella_carro";

export function agregarAlCarro({ id, talla }) {
	console.debug(`Click! ID: ${id} Talla: ${talla}`);
	const prod = {
		id,
		talla,
	};
	// AGREGANDO
	if ( localStorage.getItem( keyStorage ) ) {
		const carroAnterior = JSON.parse( localStorage.getItem( keyStorage ) );
		carroAnterior.push( prod );
		localStorage.setItem( keyStorage, JSON.stringify( carroAnterior ) );
	} else {
		localStorage.setItem( keyStorage, JSON.stringify([prod]) );
	}
}

export function clickAgregar( elid ) {
	$(".barracomprar").on("click", () => {
		const prod = {
			id: elid,
			talla: $("section#detalle .informacion div.tallas select").val(),
		};
		if ( prod.talla === "vacio" ) {
			console.debug("Debes seleccionar una talla");
		} else {
			agregarAlCarro({ id: prod.id, talla: prod.talla });
		}
	});
}

export function getProductosCarro() {
	if ( localStorage.getItem( keyStorage ) ) {
		// asdasd
	} else {
		localStorage.setItem( keyStorage, false);
	}
}
