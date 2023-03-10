import $ from "jquery";

export function showCompartirRedes() {
	$(".botonmostrarmodal").on("click", () => {
		console.debug( "CLICK mostrar" );
		$("#modal").fadeIn();
		$("#fondomodal").toggle();
	});
}

export function hideCompartirRedes() {
	$("#fondomodal, #modal > span").on("click", () => {
		console.debug( "CLICK esconder" );
		$("#modal").fadeOut();
		setTimeout(() => {
			$("#fondomodal").toggle();
		}, 200);
	});
}

export function Modal({
	nombreboton, titulo, subtitulo, html,
}) {
	return (
		<>
			<p className="botonmostrarmodal">{nombreboton}</p>
			<section id="fondomodal" />
			<section id="modal">
				<span>X</span>
				{titulo ? <h4>{titulo}</h4> : ""}
				{subtitulo ? <h5>{subtitulo}</h5> : ""}
				<div className="elementos">
					<h2>CONTENIDO</h2>
					{html}
				</div>
			</section>
		</>
	);
}
