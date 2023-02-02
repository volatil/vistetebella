import { COMETATIENDA, COMETAMELI, IVA } from "./CONST";

export function armonizarURL() {
	let fixurl = location.pathname.split("/")[3];
	fixurl = decodeURIComponent(fixurl);
	fixurl = fixurl.replaceAll(" ", "-");
	fixurl = fixurl.toLowerCase();
	window.history.pushState(null, null, fixurl);
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
