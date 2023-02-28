import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { getProductosCarro } from "../../Helpers/Carro";
import { nomeabandones, traeData } from "../../Helpers/Helpers";
import { NOMBRETIENDA } from "../../Helpers/Const";

function Carrovacio() {
	return (<p>No tienes productos en el carrito</p>);
}

function Productoscarro({ data }) {
	return (
		<ul>
			{
				data?.map(( producto ) => {
					console.debug( producto );
					const prod = {
						id: traeData()[producto.id - 1].id,
						nombre: traeData()[producto.id - 1].nombre,
						precio: traeData()[producto.id - 1].precio,
						color: traeData()[producto.id - 1].color(),
						imagen: traeData()[producto.id - 1].imagen.principal,
					};

					return (
						<div key={prod.id}>
							<h2>ID: {producto.id} TALLA: {producto.talla}</h2>
							<img src={prod.imagen} alt={prod.nombre} />
							<p>Nombre: ${prod.nombre}</p>
						</div>
					);
				})
			}
		</ul>
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
				<title>Carro de Compras || {NOMBRETIENDA}</title>
				{ nomeabandones( `Carro de Compras || ${NOMBRETIENDA}` ) }
			</Helmet>
			<section id="carro">
				<h1>Carro de Compras</h1>
				<div>
					{
						productosencarro ? <Productoscarro data={productosencarro} /> : <Carrovacio />
					}
				</div>
			</section>
		</>
	);
}
export default Carro;
