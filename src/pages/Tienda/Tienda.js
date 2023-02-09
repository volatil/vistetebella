import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NOMBRETIENDA } from "../../assets/js/CONST";

import Loading from "../../components/Loading/Loading";
import Producto from "../../components/Producto/Producto";

import { precio, totalResultados, paramBusqueda } from "../../Helpers/Helpers";
import eljson from "../../assets/json/inventario.json";

function Tienda() {
	const [elproducto, setElproducto] = useState();
	const [losresultados, setLosresultados] = useState();

	useEffect(() => {
		const data = [];
		for ( let count = eljson.values.length - 1; count >= 1; count-- ) {
			const resumen = eljson.values[count];

			const p = {
				id: resumen[0],
				nombre: resumen[1].replaceAll("SHEIN ", ""),
				precio: () => {
					return precio( resumen[2] );
				},
				fechaentrega: resumen[3],
				imagen: resumen[4].split(",//")[0],
				color: () => {
					let color = resumen[11];
					if ( !color ) {
						color = "no especifica";
					}
					return color;
				},
			};

			data.push( p );
		}
		setElproducto(data);
		setLosresultados( totalResultados({ cantidad: data.length, busqueda: paramBusqueda("q") }) );
	}, []);

	if ( elproducto ) {
		return (
			<>
				<Helmet>
					<title>Tienda || { NOMBRETIENDA }</title>
				</Helmet>
				<img style={{ width: "100%" }} src="https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw9d21349f/Homepage/2023/DESKTOP.jpg" alt={NOMBRETIENDA} />
				<p className="losresultados">{ losresultados }</p>
				<section id="grilla">
					{
						elproducto?.map((prod) => {
							return (
								<Producto
									key={prod.id}
									id={prod.id}
									nombre={prod.nombre}
									precio={prod.precio()}
									color={prod.color()}
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
export default Tienda;
