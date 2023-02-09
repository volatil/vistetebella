import { useEffect, useState } from "react";
import $ from "jquery";

import Producto from "../Producto/Producto";

import { traeData } from "../../Helpers/Helpers";

import "./Relacionados.css";

function skrol() {
	$("#grilla.relacionados").on("click", () => {
		$("html,body").animate({
			/* eslint-disable */
			scrollTop: $("#detalle").offset().top
			/* eslint-enable */
		}, "slow");
	});
}

function Relacionados( props ) {
	const { idactual } = props;
	const [elproducto, setElproducto] = useState();
	const [elarr, setElarr] = useState();

	useEffect(() => {
		setElproducto( traeData() );

		const elmaximo = traeData().length;
		const elminimo = Number(elmaximo) - 5;
		if ( idactual >= elminimo && idactual <= elmaximo ) {
			const loselegidos = [Number(idactual) - 1, Number(idactual) - 2, Number(idactual) - 3, Number(idactual) - 4, Number(idactual) - 5];
			setElarr( loselegidos );
		} else {
			const loselegidos = [Number(idactual) + 1, Number(idactual) + 2, Number(idactual) + 3, Number(idactual) + 4, Number(idactual) + 5];
			setElarr( loselegidos );
		}

		skrol();
	}, [idactual]);

	return (
		<section id="relacionados">
			<h2>Relacionados</h2>
			<section id="grilla" className="relacionados">
				{
					elproducto?.map( ( elprod ) => {
						const elaid = elprod.id;
						for ( let contador = 0; contador <= elarr.length - 1; contador++ ) {
							if ( elaid === String(elarr[contador]) ) {
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
