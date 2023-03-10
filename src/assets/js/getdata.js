const p = {
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
		$.each( $(".product-intro__description-table .product-intro__description-table-item"), function () {
			const key = $(this).find(".key").text();
			const val = $(this).find(".val").text();
			descripcion.push({ key, val });
		});
		const ladescripcion = JSON.stringify(descripcion);
		return ladescripcion;
	},
	tallas: () => {
		const tallas = [];

		$.each($(".product-intro__size-choose > span"), function () {
			if ( !$(this).html().includes("product-intro__size-radio_soldout") ) {
				const talla = $(this).find(".product-intro__size-radio-inner").text();
				tallas.push( talla );
			}
		});

		return tallas;
	},
	url: location.href,
	valoracion: $(".rate-num-small").html(),
	categoria: $( $(".bread-crumb__item")[2] ).text(),
	comentario: {
		comentarios: () => {
			const comentarios = $(".common-reviews__list.common-reviews__list.j-expose__common-reviews__list").html();
			const arrcoment = [];
			$.each( $(".common-reviews__list.j-expose__common-reviews__list > .j-expose__common-reviews__list-item"), function () {
				const usuario = {
					nombre: $(this).find(".nikename").text(),
					comentario: $(this).find(".rate-des").text(),
					foto: () => {
						const arrfotos = [];
						$.each( $(this).find(".common-reviews__list-item-pic > .pic-item"), function () {
							const attr = $(this).find("img").attr("src");
							arrfotos.push(attr);
						});
						return arrfotos;
					},
				};
				arrcoment.push({ nombre: usuario.nombre, comentario: usuario.comentario, foto: usuario.foto() });
			});
			const loscomentarios = JSON.stringify( arrcoment );
			return loscomentarios;
		},
	},
	color: $(".color-block > span").text().length >= 1 ? $(".color-block > span").text().toLowerCase() : "no especifica",
};

$("body").prepend(`
<textarea class='data'>
${p.nombre}\n
${p.precio}\n
${p.entrega}\n
${p.imagenes()}\n
${p.descripcion()}\n
${p.tallas()}\n
${p.url}\n
${p.valoracion}\n
${p.categoria}\n
${p.comentario.comentarios()}\n
${p.color}\n
</textarea>
`);

const textoACopiar = $("textarea.data");
textoACopiar.focus();
textoACopiar.select();
document.execCommand("copy");

$("textarea.data").remove();
