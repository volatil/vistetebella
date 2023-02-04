import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { DB, NOMBRETIENDA } from "../../assets/js/CONST";

import Loading from "../../components/Loading/Loading";
import Producto from "../../components/Producto/Producto";

import { precio } from "../../Helpers/Helpers";

function Tienda() {
	const [elproducto, setElproducto] = useState();
	const [loading, setLoading] = useState();

	useEffect(() => {
		fetch( DB ).then((db) => db.json()).then((db) => {
			setLoading(true);
			const data = [];

			for ( let count = 1; count <= db.values.length - 1; count++ ) {
				const resumen = db.values[count];

				const p = {
					id: resumen[0],
					nombre: resumen[1].replaceAll("SHEIN ", ""),
					precio: () => {
						return precio( resumen[2] );
					},
					fechaentrega: resumen[3],
					imagen: resumen[4].split(",//")[0],
				};

				data.push({
					id: p.id, nombre: p.nombre, precio: p.precio(), fechaentrega: p.fechaentrega, imagen: p.imagen,
				});
			}

			setElproducto(data);
			setLoading(false);
			// setTimeout(() => {
			// 	setLoading(false);
			// }, 200);
		});
	}, []);

	return (
		<>
			<Helmet>
				<title>Tienda || { NOMBRETIENDA }</title>
			</Helmet>
			<section id="grilla">
				{ loading ? <Loading /> : (
					elproducto?.map((prod) => {
						return (
							<Producto
								key={prod.id}
								id={prod.id}
								nombre={prod.nombre}
								precio={prod.precio}
								fechaentrega={prod.fechaentrega}
								imagen={prod.imagen}
							/>
						);
					})
				)}
			</section>
		</>
	);
}
export default Tienda;