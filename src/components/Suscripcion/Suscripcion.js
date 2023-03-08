import $ from "jquery";
import { Helmet } from "react-helmet";

function Subscripcion() {
	function verificaEmail() {
		const data = {
			// nombre: $("form.contacto input[name=nombre]").val(),
			correo: $("form.contacto input[name=email]").val(),
			// mensaje: $("form.contacto textarea").val(),
		};

		// if ( data.nombre.length <= 2 ) {
		// 	$("form.contacto input[name=nombre]").addClass("novalido");
		// } else {
		// 	$("form.contacto input[name=nombre]").removeClass("novalido");
		// }

		if ( data.correo.length >= 2 && data.correo.includes("@") && data.correo.includes(".") ) {
			$("form.contacto input[name=email]").removeClass("novalido");
		} else {
			$("form.contacto input[name=email]").addClass("novalido");
		}

		// if ( data.mensaje.length <= 5 ) {
		// 	$("form.contacto textarea").addClass("novalido");
		// } else {
		// 	$("form.contacto textarea").removeClass("novalido");
		// }

		const estado = !$("#contacto form").html().includes("novalido");
		if ( estado ) {
			// $("form.contacto input[name=nombre]").val("");
			$("form.contacto input[name=email]").val("");
			// $("form.contacto textarea").val("");
			$(".estadoEnvio p.true").show();
		} else {
			$(".estadoEnvio p.false").show();
		}
		setTimeout(() => {
			$(".estadoEnvio > p").fadeOut();
		}, 6000);

		return estado;
	}

	function enviar() {
		const data = {
			// nombre: $("form.contacto input[name=nombre]").val(),
			correo: $("form.contacto input[name=email]").val(),
			// mensaje: $("form.contacto textarea").val(),
			todoelmensaje: () => {
				const mensaje = `Subscribir a: ${data.correo}`;
				return mensaje;
			},
		};

		if ( verificaEmail() ) {
			console.debug( `Correo: ${data.correo}` );
			// eslint-disable-next-line no-undef
			Email.send(
				{
					Host: "smtp.elasticemail.com",
					Username: "contacto@vistetebella.cl",
					Password: "021FE6658F301E3A75261E2F3B166069F5FC",
					From: "contacto@vistetebella.cl", // de
					// From: `${data.correo}, contacto@vistetebella.cl`, // de
					To: "contacto@vistetebella.cl", // para
					Subject: `Formulario de contacto desde ${location.href}`,
					Body: data.todoelmensaje(),
				},
			);
			console.debug( "Enviando ..." );
		} else {
			console.debug("Fallo el envio");
		}
	}

	return (
		<>
			<Helmet>
				<script src="https://smtpjs.com/v3/smtp.js" />
			</Helmet>
			<p>Suscríbete para recibir ofertas y promociones</p>
			<div id="contacto" style={{ display: "flex", flexWrap: "wrap" }}>
				<form className="contacto" method="POST">
					{/* <input name="nombre" type="text" placeholder="Nombre" /> */}
					<input name="email" type="email" placeholder="Email" />
					{/* <textarea name="mensaje" placeholder="Mensaje" /> */}
					<button type="button" onClick={enviar}>Recibir ofertas</button>
					<div className="estadoEnvio">
						<p style={{ display: "none" }} className="true">Correo Suscrito</p>
						<p style={{ display: "none" }} className="false">Correo invalido</p>
					</div>
				</form>
			</div>
		</>
	);
}
export default Subscripcion;
