import $ from "jquery";

const keyStorage = "vistetebella_carro";

export function eliminarProducto() {
	$("section#carro > div.lista > ul.listaProductos > li > span.eliminar").on("click", function () {
		const posicion = $(this).parent().attr("data-posicion");
		$(this).parent().hide();
		const carro = JSON.parse( localStorage.getItem( "vistetebella_carro" ) );
		carro.splice(posicion, 1);
		localStorage.setItem( "vistetebella_carro", JSON.stringify(carro) );
	});
}

export function agregarAlCarro({ id, talla, cantidad }) {
	const prod = {
		id,
		talla,
		cantidad,
	};
	console.debug( prod );
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
			cantidad: $("section#detalle .informacion div#cantidad select").val(),
		};
		if ( prod.talla === "vacio" ) {
			console.debug("Debes seleccionar una talla");
		} else {
			agregarAlCarro({ id: prod.id, talla: prod.talla, cantidad: prod.cantidad });
		}
	});
}

export function getProductosCarro() {
	if ( localStorage.getItem( keyStorage ) ) {
		const carro = JSON.parse( localStorage.getItem( keyStorage ) );
		return carro;
	}

	return false;
}
