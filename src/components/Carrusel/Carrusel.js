import {NOMBRETIENDA} from "../../assets/js/CONST";

import "./Carrusel.css";

function Carrusel() {

	const imagenes = [
		"https://cdn.shopify.com/s/files/1/2789/5142/files/Group_23_e2822453-89b5-4daa-aefa-5f57be3ae0db_1920x.jpg?v=1672882067",
		"https://cdn.shopify.com/s/files/1/2789/5142/files/Group_24_44cc67a2-d1be-43d0-9176-3aa3185af93f_1920x.jpg?v=1672884098",
		"https://cdn.shopify.com/s/files/1/2789/5142/files/Group_22_1_1920x.jpg?v=1672886323",
		"https://templates.hibootstrap.com/xton/default/assets/img/main-banner2.jpg",
	];
	const random = Math.floor( Math.random() * imagenes.length );
	
	return (
		<section id="carrusel">
			<img src={imagenes[random]} alt={NOMBRETIENDA} />
		</section>
	)
}
export default Carrusel;