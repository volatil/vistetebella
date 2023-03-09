import $ from "jquery";

const keyStorage = "vistetebella_carro";

export function refrescarCantidadProductosEnCarro() {
	if ( localStorage.getItem( keyStorage ) ) {
		let carro = JSON.parse( localStorage.getItem( keyStorage ) );
		carro = carro.length;
		$("nav.desktop > ul > li.carrito > a span.cantidad").html( carro );
	} else {
		$("nav.desktop > ul > li.carrito > a span.cantidad").html("?");
	}
}

export function eliminarProducto() {
	$("section#carro > div.lista > ul.listaProductos > li > .producto div.eliminar").on("click", function () {
		const posicion = $(this).parent().parent().parent()
			.attr("data-posicion");
		console.debug( `Posicion -> ${posicion}` );
		$(this).parent().parent().parent()
			.hide();
		const carro = JSON.parse( localStorage.getItem( "vistetebella_carro" ) );
		carro.splice(posicion, 1);
		localStorage.setItem( "vistetebella_carro", JSON.stringify(carro) );
		refrescarCantidadProductosEnCarro();
	});
}

export function agregarAlCarro({
	id, talla, cantidad, color,
}) {
	const prod = {
		id,
		talla,
		cantidad,
		color,
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
			color: $("section#detalle .informacion p.colorescondido").html(),
		};
		if ( prod.talla === "vacio" ) {
			console.debug("Debes seleccionar una talla");
		} else {
			agregarAlCarro({
				id: prod.id, talla: prod.talla, cantidad: prod.cantidad, color: prod.color,
			});
			refrescarCantidadProductosEnCarro();
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
