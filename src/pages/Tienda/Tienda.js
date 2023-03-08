import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NOMBRETIENDA } from "../../Helpers/Const";

import Loading from "../../components/Loading/Loading";
import Producto from "../../components/Producto/Producto";

import {
	totalResultados,
	paramBusqueda,
	nomeabandones,
	traeData,
} from "../../Helpers/Helpers";

import bannerSuperior from "../../assets/imagenes/202302100320sale.jpg";

function Tienda() {
	const [elproducto, setElproducto] = useState();
	const [losresultados, setLosresultados] = useState();

	useEffect(() => {
		setElproducto( traeData() );
		setLosresultados( totalResultados({ cantidad: traeData().length, busqueda: paramBusqueda("q") }) );
	}, []);

	if ( elproducto ) {
		return (
			<>
				<Helmet>
					<title>Tienda || { NOMBRETIENDA }</title>
					{ nomeabandones( `Tienda || ${ NOMBRETIENDA }` ) }
				</Helmet>
				<img style={{ width: "100%" }} src={bannerSuperior} alt={NOMBRETIENDA} />
				<p className="losresultados">{ losresultados }</p>
				<section id="grilla">
					{
						elproducto?.map((prod) => {
							const elprod = {
								id: traeData()[prod.id - 1].id,
								nombre: traeData()[prod.id - 1].nombre,
								precio: traeData()[prod.id - 1].precio,
								color: traeData()[prod.id - 1].color(),
								imagen: traeData()[prod.id - 1].imagen.principal,
							};

							return (
								<Producto
									key={elprod.id}
									id={elprod.id}
									nombre={elprod.nombre}
									precio={elprod.precio}
									color={elprod.color}
									imagen={elprod.imagen}
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
