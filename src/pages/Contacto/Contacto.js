import $ from "jquery";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NOMBRETIENDA } from "../../assets/js/CONST";
import "./Contacto.css";

function Formulario1() {
	const token = {
		test: "3f08998306c8475e98b9692d9cb867b3", // pauloguajardot@gmail.com
	};
	return (
		<form target="_blank" action={`https://formsubmit.co/${token.test}`} method="POST">
			<input type="text" name="name" className="form-control" placeholder="Nombre" required />
			<input type="email" name="email" className="form-control" placeholder="Correo" required />
			<textarea placeholder="Mensaje" className="form-control" name="message" rows="10" required />
			<input type="hidden" name="_template" value="box" />
			<input type="hidden" name="_next" value="http://localhost:4857/enviado" />
			<button type="submit" className="btn btn-lg btn-dark btn-block">Enviar</button>
		</form>
	);
}

function Contacto() {
	const [correoenviado, setCorreoenviado] = useState();

	function enviar() {
		const data = {
			nombre: $("form.contacto input[name=nombre]").val(),
			correo: $("form.contacto input[name=email]").val(),
			mensaje: $("form.contacto textarea").val(),
			todoelmensaje: () => {
				const mensaje = `
					Te envio un mensaje:<br>
					${data.nombre} (${data.correo})<br>
					MENSAJE:<br><br>
					${data.mensaje}
				`;
				return mensaje;
			},
		};
		// eslint-disable-next-line no-undef
		Email.send(
			{
				Host: "smtp.elasticemail.com",
				Username: "pauloguajardot@gmail.com",
				Password: "EB60EFFBD0B46F5D82325D1867E3AAFC8639",
				From: "pauloguajardot@gmail.com", // de
				To: "paulo@buscalibre.com", // para
				Subject: `Formulario de contacto de ${location.href}`,
				Body: data.todoelmensaje(),
			},
			console.debug( "Enviando ..." ),
			setCorreoenviado(true),
		).then(
			null,
		);
	}

	return (
		<>
			<Helmet>
				<title>Contacto || { NOMBRETIENDA }</title>
				<script src="https://smtpjs.com/v3/smtp.js" />
			</Helmet>
			<section id="contacto">
				<h2>Formulario de <strong>Contacto</strong></h2>
				<form className="contacto" method="POST">
					<input name="nombre" type="text" placeholder="nombre" />
					<input name="email" type="email" placeholder="email" />
					<textarea name="mensaje" placeholder="Mensaje" />
					<button type="button" onClick={enviar}>Enviar</button>
				</form>
				{ correoenviado === true ? (<p style={{ background: "green" }}>Mensaje enviado</p>) : "" }
			</section>
		</>
	);
}

export default Contacto;
