import { useState, useEffect } from "react";
import { getProductosCarro } from "../../Helpers/Carro";

function Carrovacio() {
	return (<p>No tienes productos en el carrito</p>);
}

function Productoscarro() {
	return (
		<ul>
			<li>Polera</li>
			<li>Pantalon</li>
		</ul>
	);
}

function Carro() {
	const [productosencarro, setproductosencarro] = useState();

	useEffect(() => {
		getProductosCarro();
	}, []);

	return (
		<section id="carro">
			<h1>Carro de Compras</h1>
			<div>
				{
					productosencarro ? <Productoscarro /> : <Carrovacio />
				}
			</div>
		</section>
	);
}
export default Carro;
