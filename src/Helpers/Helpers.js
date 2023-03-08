import $ from "jquery";
import eljson from "../assets/json/inventario.json";
import {
	COMETATIENDA,
	COMETAMELI,
	IVA,
	PORCENTAJEGANANCIA,
} from "./Const";

// quita los caracteres feos para tener una amigable url
export function armonizarURL(pos) {
	let fixurl = location.pathname.split("/")[pos];
	fixurl = decodeURIComponent(fixurl);
	fixurl = fixurl.replaceAll(" ", "-");
	fixurl = fixurl.toLowerCase();
	window.history.replaceState(null, null, fixurl);
}

// calcular el precio si vendiera en MERCADOLIBRE
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

// calcular el precio si vendiera por TRANSBANK
export function precioTransbank( neto ) {
	// Por un producto de $10.000, recibo $9.882
	// Comision Transbank: 0,99%
	// IVA: 0,19%

	// PLAZOS
	// Débito y prepago -> 24 Horas
	// Tarjetas de crédito -> 48 Horas
}

// calcular el precio
export function precio({ neto }) {
	const porcentajeFIX = Number(100) + Number(PORCENTAJEGANANCIA);
	let ganancia = (porcentajeFIX * neto) / 100;
	ganancia = Number(ganancia.toFixed(0)).toLocaleString("es-CL");
	return ganancia;
}

// calcula la fecha de entrega, minimo 14 dias maximo 18 dias
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

// hace los cambios de imagen entre los thumb y la principal en el detalle de producto
export function cambiarThumb() {
	$( $(".thumbnails img")[0] ).addClass("activo");
	$(".thumbnails img").on("click", function () {
		const src = $(this).attr("src");
		$(".imagenprincipal").attr("src", src);

		$(".thumbnails img").removeClass("activo");
		$(this).addClass("activo");
	});
}

// cambio de tabs en el detalle de producto
export function tabs() {
	$("section#tabsDetalle > .tabs-titulo > li").on("click", function () {
		$("section#tabsDetalle > .tabs-titulo > li").removeClass("activo");
		$(this).addClass("activo");

		const nombreTab = $(this).attr("data-titulo");
		$("section#tabsDetalle > .tabs-contenido > div").hide();
		$(`section#tabsDetalle > .tabs-contenido > div[data-contenido=${nombreTab}]`).show();
	});
}

// checa is estas en un ancho de pantalla mobile o no (limite 850px)
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

// trae parametro en la url
export function paramBusqueda( param ) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const parametro = urlParams.get( param );
	return parametro;
}

// simplifica la traida de data del json
export function traeData() {
	const data = [];
	for ( let count = 1; count <= eljson.values.length - 1; count++ ) {
		const resumen = eljson.values[count];

		const p = {
			id: resumen[0],
			nombre: resumen[1].replaceAll("SHEIN ", ""),
			precio: precio({ neto: resumen[2] }),
			imagen: {
				principal: resumen[4].split(",//")[0],
				todas: () => {
					const arrtodas = [];
					const todas = resumen[4];
					for ( let elcount1 = 0; elcount1 <= todas.split(",//").length - 2; elcount1++ ) {
						const laimagen = todas.split(",//")[elcount1].replaceAll("//", "");
						const elid = laimagen.split("_thumbnail")[0].split("/")[laimagen.split("_thumbnail")[0].split("/").length - 1];
						arrtodas.push({ laid: elid, imagen: `https://${laimagen}` });
					}
					return arrtodas;
				},
			},
			descripcion: resumen[5],
			tallas: () => {
				const arrtallas = [];
				const tallas = resumen[6];
				for ( let elcount2 = 0; elcount2 <= tallas.split(",").length - 1; elcount2++ ) {
					arrtallas.push( tallas.split(",")[elcount2] );
				}
				return arrtallas;
			},
			url: resumen[7],
			valoracion: resumen[8],
			comentarios: {
				comentario: resumen[10],
			},
			color: () => {
				let color = resumen[11];
				if ( !color ) {
					color = "No especificado";
				}
				return color;
			},
			categoria: resumen[9],
		};
		data.push( p );
	}
	return data;
}

// Trae todas las categorias sin repetir
export function traeCategorias() {
	const todo = traeData();
	let categorias = [];
	for ( let count = 0; count <= todo.length - 1; count++ ) {
		const lacat = todo[count].categoria;
		categorias.push(lacat);
	}
	categorias = [...new Set(categorias)];
	return categorias;
}

export function getAnchoPantalla() {
	const elancho = $("body").width();
	return elancho;
}

// Sirve para ver cuando resultados filtró
export function totalResultados( props ) {
	let htmlResultados = "";
	if ( props.cantidad >= 2 ) {
		htmlResultados = `Encontramos ${props.cantidad} resultados.`;
	} else if ( props.cantidad === 1 ) {
		htmlResultados = `Encontramos ${props.cantidad} resultado.`;
	} else {
		htmlResultados = `No encontramos resultados para ${props.busqueda}`;
	}
	return htmlResultados;
}

// MENU => efecto X al clickear
export function deployMenu() {
	$("nav.mobile").on("click", () => {
		if ( $("body").is(".menuactivo") ) {
			$("body").removeClass("menuactivo");
		} else {
			$("body").addClass("menuactivo");
		}
	});
}

// PSSSST! HEY! no te vayas
export function nomeabandones( param ) {
	const frase = "PSSSST! HEY! no te vayas!";
	const real = param;
	window.addEventListener("blur", () => {
		document.title = frase;
	});
	window.addEventListener("focus", () => {
		document.title = real;
	});
}

export function quitaDelArrayUnaKey({ array, keyPorQuitar }) {
	for ( let count = 0; count <= array.length - 1; count++ ) {
		if ( array[count] === keyPorQuitar ) {
			array.splice(count, 1);
		}
	}
}

export function quitaDelArrayLosRepetidos({ array }) {
	const nuevoarray = [...new Set(array)];
	return nuevoarray;
}
