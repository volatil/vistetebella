import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";
import { useLocation } from "react-router-dom";

import { traeCategorias } from "../../Helpers/Helpers";

import { NOMBRETIENDA } from "../../Helpers/Const";

// function verificaEmail() {
// 	const data = {
// 		nombre: $("form.contacto input[name=nombre]").val(),
// 		correo: $("form.contacto input[name=email]").val(),
// 		mensaje: $("form.contacto textarea").val(),
// 	};

// 	if ( data.nombre.length <= 2 ) {
// 		$("form.contacto input[name=nombre]").addClass("invalido");
// 	} else {
// 		$("form.contacto input[name=nombre]").removeClass("invalido");
// 	}

// 	if ( data.correo.length >= 2 && data.correo.includes("@") && data.correo.includes(".") ) {
// 		$("form.contacto input[name=email]").removeClass("invalido");
// 	} else {
// 		$("form.contacto input[name=email]").addClass("invalido");
// 	}

// 	if ( data.mensaje.length <= 5 ) {
// 		$("form.contacto textarea").addClass("invalido");
// 	} else {
// 		$("form.contacto textarea").removeClass("invalido");
// 	}

// 	const estado = !$("#contacto form").html().includes("invalido");
// 	if ( estado ) {
// 		$("form.contacto input[name=nombre]").val("");
// 		$("form.contacto input[name=email]").val("");
// 		$("form.contacto textarea").val("");
// 		$(".estadoEnvio p.true").show();
// 	} else {
// 		$(".estadoEnvio p.false").show();
// 	}
// 	setTimeout(() => {
// 		$(".estadoEnvio > p").fadeOut();
// 	}, 6000);

// 	return estado;
// }

function Dev() {
	// function enviar() {
	// 	const data = {
	// 		nombre: $("form.contacto input[name=nombre]").val(),
	// 		correo: $("form.contacto input[name=email]").val(),
	// 		mensaje: $("form.contacto textarea").val(),
	// 		todoelmensaje: () => {
	// 			const mensaje = `
	// 				Te envio un mensaje:<br>
	// 				${data.nombre} (${data.correo})<br>
	// 				MENSAJE:<br><br>
	// 				${data.mensaje}
	// 			`;
	// 			return mensaje;
	// 		},
	// 	};

	// 	if ( verificaEmail() ) {
	// 		console.debug( `Correo: ${data.correo}` );
	// 		// eslint-disable-next-line no-undef
	// 		Email.send(
	// 			{
	// 				Host: "smtp.elasticemail.com",
	// 				Username: "contacto@vistetebella.cl",
	// 				Password: "021FE6658F301E3A75261E2F3B166069F5FC",
	// 				From: `${data.correo}, contacto@vistetebella.cl`, // de
	// 				To: "contacto@vistetebella.cl", // para
	// 				Subject: `Formulario de contacto desde ${location.href}`,
	// 				Body: data.todoelmensaje(),
	// 			},
	// 		);
	// 		console.debug( "Enviando ..." );
	// 	} else {
	// 		console.debug("Fallo el envio");
	// 	}
	// }

	return (
		<>
			<Helmet>
				<title>DEV Area || {NOMBRETIENDA}</title>
				{/* <script src="https://smtpjs.com/v3/smtp.js" /> */}
			</Helmet>
			<h1 style={{ textAlign: "center", fontSize: "3em", letterSpacing: "0.05em" }}>DEEEV!</h1>
			<div id="contacto" style={{ display: "flex", flexWrap: "wrap" }}>
				{/* <form className="contacto" method="POST">
					<input name="nombre" type="text" placeholder="Nombre" />
					<input name="email" type="email" placeholder="Email" />
					<textarea name="mensaje" placeholder="Mensaje" />
					<button type="button" onClick={enviar}>Enviar</button>
					<div className="estadoEnvio">
						<p style={{ display: "none" }} className="true">Mensaje enviado.</p>
						<p style={{ display: "none" }} className="false">Debes completar los campos.</p>
					</div>
				</form> */}
			</div>
		</>
	);
}
export default Dev;
