import { useEffect, useState } from "react";
import { DB } from "../../../assets/js/CONST";
import "./RevisaRepetidos.css";

function RevisaRepetidos() {
	const [losrepetidos, setLosrepetidos] = useState();
	const [cantidad, setCantidad] = useState();

	useEffect(() => {
		// fetch( DB ).then( (x) => x.json() ).then( (x) => {
		// console.debug( x );
		const actual = ["bacon", "ipsum", "dolor", "amet", "strip", "steak", "chislic", "andouille", "burgdoggen", "tbone", "strip", "steak", "picanha", "boudin", "short", "loin", "hamburger"];
		// const actual = ["bacon", "ipsum", "dolor", "amet", "strip", "chislic", "andouille", "burgdoggen", "tbone", "steak", "picanha", "boudin", "short", "loin", "hamburger"];

		const repetidos = function ( array ) {
			return array.filter((currentValue, currentIndex) => array.indexOf(currentValue) !== currentIndex);
		};
		const algo = repetidos(actual);
		const lacan = algo.length;
		setLosrepetidos( algo );
		setCantidad( lacan );
		// } );
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
