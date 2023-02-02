/*eslint-disable */
var p = {
	nombre: $(".product-intro__head-name").html(),
	precio: $(".product-intro__head-price.j-expose__product-intro__head-price span").html().replaceAll(".", "").replaceAll("$", ""),
	entrega: $(".product-intro__freeshipping-time").html(),
	imagenes: () => {
		const imagenes = [];

		$.each($(".product-intro__thumbs-inner > div"), function () {
			let imagen = $(this).find("> img").attr("src");
			imagen = imagen.replaceAll("220x293", "600x");
			imagenes.push(imagen);
		});

		return imagenes;
	},
	descripcion: () => {
		const descripcion = [];
		$.each( $(".product-intro__description-table .product-intro__description-table-item"), function(){
			const key = $(this).find(".key").text();
			const val = $(this).find(".val").text();
			descripcion.push({ key: key, val: val });
		});
		const ladescripcion = JSON.stringify(descripcion);
		return ladescripcion;
	},
	tallas: () => {
		const tallas = [];

		$.each($(".product-intro__size-choose > span"), function () {
			const talla = $(this).find(".product-intro__size-radio-inner").text();
			tallas.push( talla );
		});

		return tallas;
	},
	url: location.href,
	valoracion: $(".rate-num-small").html(),
	categoria: $( $(".bread-crumb__item")[2] ).text(),
	comentario: {
		cantidad: () => {
			let elarray = [];
			let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
			let cantidad = $(".product-intro__head-reviews-text").html();
			
			for ( let count = 0; count <= cantidad.split("").length - 1; count++ ) {
				const letra = cantidad.split("")[count];
			
				for (let contador = 0; contador <= numeros.length - 1; contador++ ) {
					letra == numeros[contador] ? elarray.push(letra) : "";
				}

			}
			elarray = elarray.filter( ela => ela != " " );
			elarray = String(elarray).replaceAll(",", "");
			
			return elarray;
		},
		comentarios: () => {
			let comentarios = $(".common-reviews__list.common-reviews__list.j-expose__common-reviews__list").html();
			return comentarios;
		},
	},
};
/* eslint-enable */

$("body").prepend(`
<textarea class='data'>
${p.nombre}
${p.precio}
${p.entrega}
${p.imagenes()}
${p.descripcion()}
${p.tallas()}
${p.url}
${p.valoracion}
${p.categoria}
${p.comentario.cantidad()}
${p.comentario.comentarios()}
</textarea>
`);

console.log( p.descripcion() );

const textoACopiar = $("textarea.data");
textoACopiar.focus();
textoACopiar.select();
document.execCommand("copy");

$("textarea.data").remove();
