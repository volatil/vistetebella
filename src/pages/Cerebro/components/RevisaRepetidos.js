import { useEffect, useState } from "react";
import { DB } from "../../../assets/js/CONST";
import "./RevisaRepetidos.css";

function RevisaRepetidos() {
	const [losrepetidos, setLosrepetidos] = useState();
	const [cantidad, setCantidad] = useState();

	useEffect(() => {
		fetch( DB ).then( (x) => x.json() ).then( (x) => {
			const lasurls = [];
			for ( let count = 1; count <= x.values.length - 1; count++ ) {
				const p = {
					link: x.values[count][7],
				};
				lasurls.push( p.link );
			}

			const repetidos = function ( array ) {
				return array.filter((currentValue, currentIndex) => array.indexOf(currentValue) !== currentIndex);
			};
			console.debug( lasurls );
			const algo = repetidos(lasurls);
			const lacan = algo.length;
			setLosrepetidos( algo );
			setCantidad( lacan );
		} );
	}, []);

	return (
		<div className="cerebrito repetidos">
			<strong>Links Repetidos: </strong>
			{
				cantidad >= 1 ? (
					losrepetidos.map((repetido) => {
						return (
							<span key={repetido}>{repetido}</span>
						);
					})
				)
					: <span>no hay repetidos</span>
			}
		</div>
	);
}
export default RevisaRepetidos;
