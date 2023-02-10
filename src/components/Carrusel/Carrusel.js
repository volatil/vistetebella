import { NavLink } from "react-router-dom";
import { NOMBRETIENDA } from "../../assets/js/CONST";
import { getAnchoPantalla } from "../../Helpers/Helpers";

import "./Carrusel.css";

function Carrusel() {
	const imagenes = [
		"https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwb12b5c43/Homepage/2023/02_FEB/0202/SALE/0202_WGA_70OFF_D_M.jpg",
		"https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwe56bd58c/Homepage/2023/02_FEB/0202/VDAY/0202_WGA_VDAY_D_M.jpg",
		"https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwa7e96629/Homepage/2023/01_JAN/0119/VDAY/VDAY_DATE_NIGHT_D_M.jpg",
		"https://cdn.shopify.com/s/files/1/2789/5142/files/Group_24_44cc67a2-d1be-43d0-9176-3aa3185af93f_1920x.jpg?v=1672884098",
		"https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw2248d8e8/ESSENTIALS/2023/01%20January/0112/Essentials%20Pre%20Spring%20LP%20Launch/ESSENTIAL_D_M.jpg",
		"https://media.boohoo.com/i/boohooamplience/230206_70off_desktop_US_2",
	];
	const random = Math.floor( Math.random() * imagenes.length );

	return (
		<section id="carrusel">
			<NavLink to="/tienda/" title={NOMBRETIENDA}>
				<img src={imagenes[random]} alt={NOMBRETIENDA} />
			</NavLink>
		</section>
	);
}
export default Carrusel;
