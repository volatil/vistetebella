import { COMETATIENDA, COMETAMELI, IVA } from "./CONST";

export function armonizarURL() {
	let fixurl = location.pathname.split("/")[3];
	fixurl = decodeURIComponent(fixurl);
	fixurl = fixurl.replaceAll(" ", "-");
	fixurl = fixurl.toLowerCase();
	window.history.pushState(null, null, fixurl);
}

export function precio( neto ) {
	// SUMAR NETO + COMETA MIA
	const total1 = Number(neto) + Number(COMETATIENDA);
	// console.debug( total1 );
	// AGREGA Y CALCULA EL % DE MELI
	const total2 = Math.ceil((Number(total1) * Number(COMETAMELI)) / 10);

	// SUMA LA COMETA MELI + PRECIO FINAL TIENDA
	const total3 = total1 + total2;

	// PRECIO FINAL TIENDA + IVA
	const total4 = Math.ceil((total1 * IVA) / 10);
	const total5 = (total3 + total4).toLocaleString("es-CL");

	return total5;
}
