import { useEffect, useState } from "react";
import $ from "jquery";
import { getWishlist } from "../../Helpers/Wishlist";

import "./AgregarQuitarWISHLIST.css";

function AgregarQuitarWISHLIST( props ) {
	const [elwishid, setElwishid] = useState();
	const { id } = props;
	let losid = getWishlist();
	losid = JSON.parse(losid);

	function Agregaquita() {
		console.debug( "click" );
	}

	useEffect(() => {
		for ( let count = 0; count <= losid.length - 1; count++ ) {
			if ( Number(id) === Number(losid[count]) ) {
				setElwishid(true);
			}
		}
	}, [id, losid]);

	return (
		<button type="button" onClick={Agregaquita} className="estadoWish">
			{
				elwishid
					? <span className="corazon rojo">&nbsp;</span>
					: <span className="corazon">&nbsp;</span>
			}
		</button>
	);
}
export default AgregarQuitarWISHLIST;
