import { Helmet } from "react-helmet";
import { NOMBRETIENDA } from "../../assets/js/CONST";
import Carrusel from "../../components/Carrusel/Carrusel";
import "./Inicio.css";

function Inicio() {
	return (
		<>
			<Helmet>
				<title>Bienvenido || { NOMBRETIENDA }</title>
			</Helmet>
			<section id="inicio">
				<Carrusel />
			</section>
			<video width="750" height="500" controls>
				<source src="./Videos/video1.mp4" type="video/mp4"/>
			</video>
			{/* <video width="750" height="500" controls >
				<source src="movie.mp4" type="video/mp4">
				<source src="movie.ogg" type="video/ogg">
				Your browser does not support the video tag.
			</video> */}
		</>
	);
}
export default Inicio;
