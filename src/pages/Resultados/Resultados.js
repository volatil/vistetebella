import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { NOMBRETIENDA } from "../../Helpers/Const";
import {
	paramBusqueda,
	precio,
	totalResultados,
	nomeabandones,
} from "../../Helpers/Helpers";
import eljson from "../../assets/json/inventario.json";

import Producto from "../../components/Producto/Producto";

import bannerSuperior from "../../assets/imagenes/202302100319Gift_Card_Banner_Valentines2_2.jfif";

function Resultados() {
	const [elproducto, setElproducto] = useState();
	const [losresultados, setLosresultados] = useState();

	useEffect(() => {
		nomeabandones();
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

		setLosresultados( totalResultados({ cantidad: data.length, busqueda: paramBusqueda("q") }) );
	}, []);

	if ( elproducto ) {
		return (
			<>
				<Helmet>
					<title>Busqueda de {paramBusqueda("q")} || {NOMBRETIENDA}</title>
				</Helmet>
				<img style={{ width: "100%" }} src={bannerSuperior} alt="Resultados" />
				<p className="losresultados">{ losresultados }</p>
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
