import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { getProductosCarro } from "../../Helpers/Carro";
import { nomeabandones, traeData } from "../../Helpers/Helpers";
import { NOMBRETIENDA } from "../../Helpers/Const";

import Button from "../../components/Button/Button";
import carrito from "../../assets/svg/carrito.svg";
import simbolocerrar from "../../assets/svg/simbolocerrar.svg";

import "./Carro.css";

function Carrovacio() {
	return (<p>No tienes productos en el carrito</p>);
}

function Productoscarro({ data }) {
	function precioTotal() {
		let precio = 0;
		for ( let count = 0; count <= data.length - 1; count++ ) {
			precio += Number( traeData()[Number(data[count].id)].precio.replaceAll(".", "") );
		}
		precio = `$ ${precio.toLocaleString("es-CL")}`;
		return precio;
	}

	return (
		<>
			<ul className="barrasuperior">
				<li className="producto">Producto</li>
				<li>Talla</li>
				<li>Cantidad</li>
				<li>Precio</li>
			</ul>
			<ul className="listaProductos">
				{
					data?.map(( producto ) => {
						const prod = {
							id: traeData()[producto.id - 1].id,
							nombre: traeData()[producto.id - 1].nombre,
							precio: traeData()[producto.id - 1].precio,
							imagen: traeData()[producto.id - 1].imagen.principal,
						};

						return (
							<li key={prod.id}>
								<div className="producto">
									<span className="eliminar">
										<img src={simbolocerrar} alt="Eliminar" />
									</span>
									<img src={prod.imagen} alt={prod.nombre} />
									<p>{prod.nombre}</p>
								</div>
								<div className="talla">
									<p>{producto.talla}</p>
								</div>
								<div className="unidades">
									<p>1 unidad</p>
								</div>
								<div className="precio">
									<p>$ {prod.precio}</p>
								</div>
							</li>
						);
					})
				}
				<li className="numeros">
					<div className="total">
						<p>Total: <strong>{precioTotal()}</strong></p>
					</div>
				</li>
				<Button estado="primario" texto="Comprar" />
			</ul>
		</>
	);
}

function Carro() {
	const [productosencarro, setproductosencarro] = useState();

	useEffect(() => {
		setproductosencarro( getProductosCarro() );
	}, []);

	return (
		<>
			<Helmet>
				<title>Carrito de Compras || {NOMBRETIENDA}</title>
				{ nomeabandones( `Carro de Compras || ${NOMBRETIENDA}` ) }
			</Helmet>
			<section id="carro">
				<h2><img src={carrito} alt="Carrito" /> Carrito de Compras</h2>
				<div className="lista">
					{
						productosencarro ? <Productoscarro data={productosencarro} /> : <Carrovacio />
					}
				</div>
			</section>
		</>
	);
}
export default Carro;
