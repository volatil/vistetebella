import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { NOMBRETIENDA } from "../../Helpers/Const";
import {
	paramBusqueda,
	totalResultados,
	nomeabandones,
	traeData,
} from "../../Helpers/Helpers";

import Producto from "../../components/Producto/Producto";

import bannerSuperior from "../../assets/imagenes/202302100319Gift_Card_Banner_Valentines2_2.jfif";

function Resultados() {
	const [elproducto, setElproducto] = useState();
	const [losresultados, setLosresultados] = useState();

	useEffect(() => {
		const data = [];

		for ( let count = traeData().length - 1; count >= 0; count-- ) {
			const filtroBusqueda = `${traeData()[count].nombre.toLowerCase()} ${traeData()[count].categoria.toLowerCase()} ${traeData()[count].color().toLowerCase()} ${traeData()[count].comentarios.comentario.toLowerCase()} ${traeData()[count].descripcion.toLowerCase()}`;
			if ( filtroBusqueda.includes( paramBusqueda("q") ) ) {
				data.push( traeData()[count] );
			}
		}
		setElproducto( data );

		setLosresultados( totalResultados({ cantidad: data.length, busqueda: paramBusqueda("q") }) );
	}, []);

	if ( elproducto ) {
		return (
			<>
				<Helmet>
					<title>Busqueda de {paramBusqueda("q")} || {NOMBRETIENDA}</title>
					{ nomeabandones( `Busqueda de ${paramBusqueda("q")} || ${NOMBRETIENDA}` ) }
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
									imagen={prod.imagen.principal}
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
