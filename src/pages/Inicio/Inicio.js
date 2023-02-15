import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NOMBRETIENDA } from "../../assets/js/CONST";

import Carrusel from "../../components/Carrusel/Carrusel";
import { traeData, nomeabandones } from "../../Helpers/Helpers";

import "./Inicio.css";
import Producto from "../../components/Producto/Producto";

function Inicio() {
	const [elproducto, setElproducto] = useState();

	useEffect(() => {
		setElproducto( traeData() );
		nomeabandones();
	}, []);

	return (
		<>
			<Helmet>
				<title>Bienvenido || { NOMBRETIENDA }</title>
			</Helmet>
			<section id="inicio">
				<Carrusel />
				<h3
					style={{
						textTransform: "uppercase", textAlign: "center", fontSize: "2.7em", margin: "0",
					}}
				>
					Los más vistos
				</h3>
				<section id="grilla">
					{
						elproducto?.map( ( elprod ) => {
							const algo = elprod.id;
							const loselegidos = ["5", "55", "32", "28", "7", "1", "8", "60", "58", "57"];
							for ( let contador = 0; contador <= loselegidos.length - 1; contador++ ) {
								if ( algo === loselegidos[contador] ) {
									return (
										<Producto
											key={elprod.id}
											id={elprod.id}
											nombre={elprod.nombre}
											imagen={elprod.imagen.principal}
											precio={elprod.precio}
											color={elprod.color()}
										/>
									);
								}
							}
							return (null);
						})
					}
				</section>
				<Carrusel />
			</section>
		</>
	);
}
export default Inicio;
