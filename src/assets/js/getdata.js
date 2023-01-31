/*eslint-disable */
var p = {
	nombre: $(".product-intro__head-name").html(),
	precio: $(".product-intro__head-price.j-expose__product-intro__head-price span").html(),
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

		$.each($(".product-intro__description-table > div"), function () {
			const key = $(this).find(".key").html();
			const val = $(this).find(".val").html().split(" <span dir=")[0];
			const elhtml = `<li class='key'>${key}</li><li class='val'>${val}</li>`;
			descripcion.push(elhtml);
		});

		return descripcion;
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
		
	},
};
/* eslint-enable */

$("body").prepend(` <textarea class='data'>[\n"${p.nombre}",\n"${p.precio}",\n"${p.entrega}",\n"${p.imagenes()}",\n"${p.descripcion()}",\n"${p.tallas()}",\n"${p.url}",\n"${p.comentario.cantidad()}"\n],</textarea>`);

const textoACopiar = $("textarea.data");
textoACopiar.focus();
textoACopiar.select();
document.execCommand("copy");

$("textarea.data").remove();
