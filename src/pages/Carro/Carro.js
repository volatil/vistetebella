import { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { NavLink } from "react-router-dom";

import { getProductosCarro, eliminarProducto, modificaCantidadUnidades } from "../../Helpers/Carro";
import { isMobile, nomeabandones, traeData } from "../../Helpers/Helpers";
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

						function modificaCantidad( cantidad ) {
							const html = (
								<div className="cambiaCantidad">
									<div className="cantidades">
										<button type="button" className="restar">-</button>
										<input value={cantidad} disabled />
										<button type="button" className="sumar">+</button>
									</div>
									<div className="advertencia" />
								</div>
							);
							return html;
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
								{
									isMobile()
										? (
											<div>
												<div className="unidades">{ modificaCantidad( producto.cantidad ) }</div>
												<div className="precio">
													<p>$ {prod.precio}</p>
												</div>
											</div>
										)
										: (
											<>
												<div className="unidades">{ modificaCantidad( producto.cantidad ) }</div>
												<div className="precio">
													<p>$ {prod.precio}</p>
												</div>
											</>
										)
								}
								{/* <div className="unidades">{ modificaCantidad( producto.cantidad ) }</div>
								<div className="precio">
									<p>$ {prod.precio}</p>
								</div> */}
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
		modificaCantidadUnidades();
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
