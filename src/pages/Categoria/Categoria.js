import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { NOMBRETIENDA } from "../../assets/js/CONST";

import Loading from "../../components/Loading/Loading";
import Producto from "../../components/Producto/Producto";

import {
	armonizarURL,
	precio,
	// isMobile,
	humanizaString,
} from "../../Helpers/Helpers";
import eljson from "../../assets/json/inventario.json";

function Categoria() {
	const categoria = useLocation().pathname.split("/")[2];
	const [elproducto, setElproducto] = useState();
	const [loading, setLoading] = useState();
	const categoriaHumanizada = humanizaString(categoria);

	useEffect(() => {
		setLoading(true);
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

			let tempCategoria = categoria;
			tempCategoria = tempCategoria.replaceAll("-", " ").replaceAll("%20", " ");
			tempCategoria = tempCategoria.toLowerCase();
			let tempPCategoria = p.categoria;
			tempPCategoria = tempPCategoria.toLowerCase();

			if ( tempCategoria === tempPCategoria ) {
				data.push( p );
			}
		}
		setElproducto(data);
		setLoading(false);

		armonizarURL(2);
	}, [categoria]);

	if ( elproducto ) {
		return (
			<>
				<Helmet>
					<title>{categoriaHumanizada} || { NOMBRETIENDA }</title>
				</Helmet>
				<p>Categoria: <strong>{categoriaHumanizada}</strong></p>
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
	return (<Loading />);
}
export default Categoria;