import React from "react";
import ReactDOM from "react-dom/client";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Barrasuperior from "./components/Barrasuperior/Barrasuperior";
import Inicio from "./pages/Inicio/Inicio";
import Tienda from "./pages/Tienda/Tienda";
import Detalle from "./pages/Detalle/Detalle";
import Error from "./pages/Error/Error";

import Categoria from "./pages/Categoria/Categoria";
import Resultados from "./pages/Resultados/Resultados";

import Dev from "./pages/Dev/Dev";
import Cerebro from "./pages/Cerebro/Cerebro";

import "./index.css";

import reportWebVitals from "./reportWebVitals";
import Footer from "./components/Footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Barrasuperior />
		<Header />
		<Routes>
			<Route exact path="/" element={<Inicio />} />
			<Route path="/tienda" element={<Tienda />} />
			<Route path="/producto/:id/:nombre" element={<Detalle />} />
			<Route path="*" element={<Error />} />

			<Route path="/categoria/:categoria" element={<Categoria />} />
			<Route path="/resultados/" element={<Resultados />} />

			<Route path="/dev/:categoria" element={<Dev />} />
			<Route path="/cerebro" element={<Cerebro />} />
		</Routes>
		<Footer />
	</Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
