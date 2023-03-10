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
	nombreboton, titulo, html,
}) {
	return (
		<>
			<p className="botonmostrarmodal">{nombreboton}</p>
			<section id="fondomodal" />
			<section id="modal">
				<span>X</span>
				{titulo ? <h4>{titulo}</h4> : ""}
				{html}
			</section>
		</>
	);
}
