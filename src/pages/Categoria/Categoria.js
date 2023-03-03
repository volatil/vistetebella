import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { NOMBRETIENDA } from "../../Helpers/Const";

import Loading from "../../components/Loading/Loading";
import Producto from "../../components/Producto/Producto";

import {
	armonizarURL,
	humanizaString,
	paramBusqueda,
	totalResultados,
	traeData,
	nomeabandones,
} from "../../Helpers/Helpers";
import categoriaArrowRight from "../../assets/imagenes/categoria_arrow_right.png";

function Categoria() {
	const categoria = useLocation().pathname.split("/")[2];
	const [elproducto, setElproducto] = useState();
	const [losresultados, setLosresultados] = useState();
	const categoriaHumanizada = humanizaString(categoria);

	useEffect(() => {
		const data = [];
		for ( let count = traeData().length - 1; count >= 0; count-- ) {
			const categoriaDESDElobuscado = categoria.replaceAll("-", " ").replaceAll("%20", " ").toLowerCase();
			const categoriaDESDEinventario = traeData()[count].categoria.toLowerCase();

			if ( categoriaDESDElobuscado === categoriaDESDEinventario ) {
				data.push( traeData()[count] );
			}
		}
		setElproducto( data );

		armonizarURL(2);
		setLosresultados( totalResultados({ cantidad: data.length, busqueda: paramBusqueda("q") }) );
	}, [categoria]);

	if ( elproducto ) {
		return (
			<>
				<Helmet>
					<title>{categoriaHumanizada} || { NOMBRETIENDA }</title>
					{ nomeabandones( `${categoriaHumanizada} || ${ NOMBRETIENDA }` ) }
				</Helmet>
				<p style={{ marginLeft: "20px" }}><img style={{ width: "13px" }} src={categoriaArrowRight} alt="Categoria" /> <strong style={{ textTransform: "uppercase" }}>{categoriaHumanizada}</strong></p>
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
	return (<Loading />);
}
export default Categoria;
