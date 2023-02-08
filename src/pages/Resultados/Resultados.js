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
				descripcion: resumen[5],
				categoria: resumen[9],
				comentarios: {
					comentario: resumen[10],
				},
				color: () => {
					let color = resumen[11];
					if ( !color ) {
						color = "no especifica";
					}
					return color;
				},
			};

			const filtroBusqueda = `${p.nombre.toLowerCase()} ${p.categoria.toLowerCase()} ${p.color().toLowerCase()} ${p.comentarios.comentario.toLowerCase()} ${p.descripcion.toLowerCase()}`;
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
				<img style={{ width: "100%" }} src="https://media.boohoo.com/i/boohooamplience/Gift_Card_Banner_Valentines2_2" alt="Resultados" />
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
