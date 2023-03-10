import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";
import { useLocation } from "react-router-dom";

import { Modal, showCompartirRedes, hideCompartirRedes } from "../../components/Modal/Modal";

import { traeCategorias } from "../../Helpers/Helpers";

import { NOMBRETIENDA } from "../../Helpers/Const";

import "../../components/Modal/Modal.css";

function HtmlModal({ url, mensaje }) {
	return (
		<>
			<h1>ojala funcione esto</h1>
			<p>o no pasa nada, no funciona nomas</p>
			<strong>y a mimir</strong>
			<div className="elementos">
				<a rel="noreferrer" target="_blank" href={`https://twitter.com/intent/tweet?url=${url}&text=${mensaje}`}>twitter</a>
				<br />
				<a rel="noreferrer" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?spm=a2g0o.detail.share.1.349c34fe7InlUD&u=${url}`}>facebook</a>
				<br />
				<a rel="noreferrer" target="_blank" href="AAAA">Copiar Link</a>
			</div>
		</>
	);
}

function Dev() {
	useEffect(() => {
		showCompartirRedes();
		hideCompartirRedes();
	}, []);

	return (
		<>
			<Helmet>
				<title>DEV Area || {NOMBRETIENDA}</title>
			</Helmet>
			<h1 style={{ textAlign: "center", fontSize: "3em", letterSpacing: "0.05em" }}>DEEEV!</h1>
			<div id="contacto" style={{ display: "flex", flexWrap: "wrap" }}>
				<Modal
					nombreboton="mostrar modal"
					titulo="hola soy el titulo"
					subtitulo="soy la bajada"
					html={<HtmlModal url={location.href} mensaje="soy la pagina /DEV" />}
				/>
			</div>
		</>
	);
}
export default Dev;
