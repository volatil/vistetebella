import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Navigate
} from "react-router-dom";

import Header from './components/Header/Header';
import Barrasuperior from './components/Barrasuperior/Barrasuperior';
import Inicio from './pages/Inicio/Inicio';
import Grilla from './components/Grilla/Grilla';
import Detalle from './pages/Detalle/Detalle';
import Error from './pages/Error/Error';

import './index.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	//<React.StrictMode>
		<Router>
			<Barrasuperior />
			<Header />
			<Routes>
				<Route exact path="/" element={<Inicio />} />
				<Route path="/grilla" element={<Grilla />} />
				<Route path="/detalle/:id/:nombre" element={<Detalle />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</Router>
	//</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
