import { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { NavLink } from "react-router-dom";

import { getProductosCarro, eliminarProducto } from "../../Helpers/Carro";
import { nomeabandones, traeData } from "../../Helpers/Helpers";
import { NOMBRETIENDA } from "../../Helpers/Const";

import Button from "../../components/Button/Button";
import carrito from "../../assets/svg/carrito.svg";
import basurero from "../../assets/svg/basurero.svg";

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
				<li className="producto">Detalle Producto</li>
				<li>Cantidad</li>
				<li>Precio</li>
			</ul>
			<ul className="listaProductos">
				{
					data?.map(( producto, posicion ) => {
						const prod = {
							id: traeData()[producto.id - 1].id,
							nombre: traeData()[producto.id - 1].nombre,
							precio: traeData()[producto.id - 1].precio,
							imagen: traeData()[producto.id - 1].imagen.principal,
							colordescripcion: traeData()[producto.id - 1].colordescripcion(),
						};

						function fixcantidad( lacantidad ) {
							if ( lacantidad === "1" ) {
								return (
									<>
										<span className="cantidad">1</span>
										<span> unidad</span>
									</>
								);
							}
							return (
								<>
									<span className="cantidad">{lacantidad}</span>
									<span> unidades</span>
								</>
							);
						}

						return (
							<li data-posicion={posicion} key={prod.id + producto.cantidad + producto.talla}>
								<div className="producto">
									<NavLink className="imagen" to={`/producto/${producto.id}/${prod.nombre}`}>
										<img src={prod.imagen} alt={prod.nombre} />
									</NavLink>
									<div className="detalle">
										<NavLink className="nombre" to={`/producto/${producto.id}/${prod.nombre}`}>
											<p>
												<strong>{prod.nombre}</strong>
											</p>
										</NavLink>
										<div className="detallemenor">
											<p>Talla: <strong>{producto.talla}</strong></p>
											<p className="color">Color: <strong>{prod.colordescripcion}</strong></p>
										</div>
										<div className="eliminar">
											<img src={basurero} alt="Eliminar" />
											<p>Quitar del carro</p>
										</div>
									</div>
								</div>
								<div className="unidades">
									<p>{ fixcantidad(producto.cantidad) }</p>
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

	useEffect(() => {
		eliminarProducto();
	});

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
