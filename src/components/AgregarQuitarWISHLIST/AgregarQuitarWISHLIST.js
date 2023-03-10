import { useEffect, useState } from "react";
import $ from "jquery";
import { getWishlist, AgregaQuita } from "../../Helpers/Wishlist";

import "./AgregarQuitarWISHLIST.css";

function AgregarQuitarWISHLIST( props ) {
	const [elwishid, setElwishid] = useState();
	const { id } = props;

	useEffect(() => {
		function revisaEstadoWishlist() {
			let losid = getWishlist();
			losid = JSON.parse(losid);

			if ( String(losid) === "false" ) {
				setElwishid(false);
			} else {
				for ( let count = 0; count <= losid.length - 1; count++ ) {
					if ( Number(id) === Number(losid[count]) ) {
						setElwishid(true);
						break;
					} else {
						setElwishid(false);
					}
				}
			}
		}
		revisaEstadoWishlist();

		$("button.estadoWish").on("click", () => {
			AgregaQuita(id);
			revisaEstadoWishlist();
		});
	}, [id]);

	return (
		<button type="button" className="estadoWish">
			{
				elwishid
					? <span className="corazon rojo" />
					: <span className="corazon" />
			}
		</button>
	);
}
export default AgregarQuitarWISHLIST;
