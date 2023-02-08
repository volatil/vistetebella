import $ from "jquery";
import { COMETATIENDA, COMETAMELI, IVA } from "../assets/js/CONST";

export function armonizarURL(pos) {
	let fixurl = location.pathname.split("/")[pos];
	fixurl = decodeURIComponent(fixurl);
	fixurl = fixurl.replaceAll(" ", "-");
	fixurl = fixurl.toLowerCase();
	window.history.replaceState(null, null, fixurl);
}

export function precioMeli( neto ) {
	// SUMAR NETO + COMETA MIA
	const total1 = Number(neto) + Number(COMETATIENDA);

	// AGREGA Y CALCULA EL % DE MELI
	const total2 = Math.ceil((Number(total1) * Number(COMETAMELI)) / 10);

	// SUMA LA COMETA MELI + PRECIO FINAL TIENDA
	const total3 = total1 + total2;

	// PRECIO FINAL TIENDA + IVA
	const total4 = Math.ceil((total1 * IVA) / 10);
	const total5 = (total3 + total4).toLocaleString("es-CL");

	console.debug( `
	Precio Neto: $ ${Number(neto).toLocaleString("es-CL")}
	Comision VISTETEBELLA: $ ${Number(COMETATIENDA).toLocaleString("es-CL")}
	Precio Neto + Comision VISTETEBELLA: $ ${Number(total1).toLocaleString("es-CL")}
	Precio Neto + Comision VISTETEBELLA + Comision MERCADOLIBRE: $ ${Number(total3).toLocaleString("es-CL")}
	IVA: $ ${Number(total4).toLocaleString("es-CL")}
	Precio Neto + Comision VISTETEBELLA + Comision MERCADOLIBRE + IVA: $ ${Number(total5).toLocaleString("es-CL")}
	` );

	return total5;
}

export function precioTransbank( neto ) {
	// Por un producto de $10.000, recibo $9.882
	// Comision Transbank: 0,99%
	// IVA: 0,19%

	// PLAZOS
	// Débito y prepago -> 24 Horas
	// Tarjetas de crédito -> 48 Horas
}

export function precio( neto ) {
	let preciofinal = Number( neto ) + Number( COMETATIENDA );
	preciofinal = preciofinal.toLocaleString("es-CL");
	return preciofinal;
}

// export function devuelveAlHome( id ) {
// 	if ( typeof id === "undefined" ) {
// 		setTimeout(() => {
// 			window.location.href = "/";
// 		}, 2000);
// 	}
// }

export function lafechaEntrega() {
	const mesSET = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	const diaSET = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
	const data = [];
	const fechaMaxima = new Date();
	fechaMaxima.setDate(fechaMaxima.getDate() + 18);
	const fechaMinima = new Date();
	fechaMinima.setDate(fechaMinima.getDate() + 14);
	const fecha = {
		maxima: `${diaSET[fechaMaxima.getDay()]} ${fechaMaxima.getDate()} de ${mesSET[fechaMaxima.getMonth()]}`,
		minima: `${diaSET[fechaMinima.getDay()]} ${fechaMinima.getDate()} de ${mesSET[fechaMinima.getMonth()]}`,
	};
	data.push({ minima: fecha.minima, maxima: fecha.maxima });
	return data;
}

export function cambiarThumb() {
	$( $(".thumbnails img")[0] ).addClass("activo");
	$(".thumbnails img").on("click", function () {
		const src = $(this).attr("src");
		$(".imagenprincipal").attr("src", src);

		$(".thumbnails img").removeClass("activo");
		$(this).addClass("activo");
	});
}

export function tabs() {
	$("section#tabsDetalle > .tabs-titulo > li").on("click", function () {
		$("section#tabsDetalle > .tabs-titulo > li").removeClass("activo");
		$(this).addClass("activo");

		const nombreTab = $(this).attr("data-titulo");
		$("section#tabsDetalle > .tabs-contenido > div").hide();
		$(`section#tabsDetalle > .tabs-contenido > div[data-contenido=${nombreTab}]`).show();
	});
}

export function isMobile() {
	const anchoPantalla = $("body").width();
	if ( anchoPantalla <= 850 ) {
		return true;
	}
	return false;
}

export function humanizaString( string ) {
	let elstring = string;
	elstring = decodeURIComponent(elstring);
	elstring = elstring.replaceAll("%20", " ");
	elstring = elstring.replaceAll("-", " ");
	elstring = elstring.toLowerCase();
	return elstring;
}

export function paramBusqueda( param ) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const parametro = urlParams.get( param );
	return parametro;
}
