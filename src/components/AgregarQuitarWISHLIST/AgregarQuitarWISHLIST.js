import { useEffect, useState } from "react";
import { getWishlist } from "../../Helpers/Wishlist";

import corazonRojo from "../../assets/svg/corazon_rojo.svg";
import corazonNegro from "../../assets/svg/corazon_negro.svg";

import "./AgregarQuitarWISHLIST.css";

function AgregarQuitarWISHLIST( props ) {
	const [elwishid, setElwishid] = useState();
	const { id } = props;
	let losid = getWishlist();
	losid = JSON.parse(losid);
	// console.debug( `Me pasaron el id: ${id}` );

	useEffect(() => {
		for ( let count = 0; count <= losid.length - 1; count++ ) {
			// console.debug( `id -> ${losid[count]}` );
			if ( Number(id) === Number(losid[count]) ) {
				// console.debug(`[${id}]si estoy bien en el ID`);
				setElwishid(true);
			// } else {
			// 	// console.debug(`Este es el id: ${id} y en la DB esta el ${losid[count]}`);
			// 	setElwishid(false);
			}
		}
	}, [id, losid]);
	return (
		<p className="estadoWish">
			{
				elwishid
					? <span className="corazon rojo">&nbsp;</span>
					: <span className="corazon">&nbsp;</span>
			}
		</p>
	);
}
export default AgregarQuitarWISHLIST;
