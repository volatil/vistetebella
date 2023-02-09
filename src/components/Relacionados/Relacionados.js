import { useEffect, useState } from "react";

import Producto from "../Producto/Producto";

import { traeData } from "../../Helpers/Helpers";

import "./Relacionados.css";

function Relacionados() {
	const [elproducto, setElproducto] = useState();
	useEffect(() => {
		setElproducto( traeData() );
	}, []);

	return (
		<section id="relacionados">
			<h2>Relacionados</h2>
			<section id="grilla" className="relacionados">
				{
					elproducto?.map( ( elprod ) => {
						const algo = elprod.id;
						const loselegidos = ["2", "5", "23", "32", "11"];
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
		</section>
	);
}
export default Relacionados;
