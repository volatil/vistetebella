import $ from "jquery";

export function showCompartirRedes() {
	$(".botonmostrarmodal").on("click", () => {
		$("#modal").fadeIn();
		$("#fondomodal").toggle();
	});
}

export function hideCompartirRedes() {
	$("#fondomodal, #modal > span").on("click", () => {
		$("#modal").fadeOut();
		setTimeout(() => {
			$("#fondomodal").toggle();
		}, 200);
	});
}

export function Modal({
	htmlboton, titulo, html,
}) {
	return (
		<>
			{htmlboton}
			<section id="fondomodal" />
			<section id="modal">
				<span>X</span>
				{titulo ? <h4>{titulo}</h4> : ""}
				{html}
			</section>
		</>
	);
}
