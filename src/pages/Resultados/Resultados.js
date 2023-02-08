import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { NOMBRETIENDA } from "../../assets/js/CONST";
import { paramBusqueda, precio } from "../../Helpers/Helpers";
import eljson from "../../assets/json/inventario.json";

import Producto from "../../components/Producto/Producto";

function Resultados() {
	const [elproducto, setElproducto] = useState();

	useEffect(() => {
		const data = [];

		for ( let count = eljson.values.length - 1; count >= 1; count-- ) {
			const resumen = eljson.values[count];

			const p = {
				id: resumen[0],
				nombre: resumen[1].replaceAll("SHEIN ", ""),
				precio: precio( resumen[2] ),
				fechaentrega: resumen[3],
				imagen: resumen[4].split(",//")[0],
				categoria: resumen[9],
				color: () => {
					let color = resumen[11];
					if ( !color ) {
						color = "no especifica";
					}
					return color;
				},
			};

			const filtroBusqueda = `${p.nombre} ${p.categoria} ${p.color()}`;
			if ( filtroBusqueda.includes( paramBusqueda("q") ) ) {
				data.push( p );
			}
			setElproducto( data );
		}
	}, []);

	if ( elproducto ) {
		return (
			<>
				<Helmet>
					<title>Busqueda de {paramBusqueda("q")} || {NOMBRETIENDA}</title>
				</Helmet>
				<h2>Resultados para: {paramBusqueda("q")}</h2>
				<section id="grilla">
					{
						elproducto.map((prod) => {
							return (
								<Producto
									key={prod.id}
									id={prod.id}
									nombre={prod.nombre}
									precio={prod.precio}
									imagen={prod.imagen}
								/>
							);
						})
					}
				</section>
			</>
		);
	}
}
export default Resultados;
