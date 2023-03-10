import $ from "jquery";

export function showGuiaTallas() {
	$(".botonguiadetallas").on("click", () => {
		$("#guiadetallas").fadeIn();
		$("#fondoguiadetallas").toggle();
	});
}

export function hideGuiaTallas() {
	$("#fondoguiadetallas, section#detalle .informacion #guiadetallas > span").on("click", () => {
		$("#guiadetallas").fadeOut();
		setTimeout(() => {
			$("#fondoguiadetallas").toggle();
		}, 200);
	});
}

// export function showCompartirRedes() {
// 	$(".compartirenredes").on("click", () => {
// 		$("#modalcompartirenredes").fadeIn();
// 		$("#fondocompartirenredes").toggle();
// 	});
// }

// export function hideCompartirRedes() {
// 	$("#fondocompartirenredes, section#detalle .principal #modalcompartirenredes > span").on("click", () => {
// 		$("#modalcompartirenredes").fadeOut();
// 		setTimeout(() => {
// 			$("#fondocompartirenredes").toggle();
// 		}, 200);
// 	});
// }

export function cambiarUnidadMedida() {
	$("section#detalle .informacion #guiadetallas .cambiarMedida ul li").on("click", function () {
		const unidad = $(this).html();

		$("section#detalle .informacion #guiadetallas .cambiarMedida ul li").removeClass("activo");
		$(this).addClass("activo");

		$("#guiadetallas table").hide();
		$(`#guiadetallas table[data-medida=${unidad}]`).show();
	});
}
