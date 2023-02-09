import loadingGIF from "../../assets/imagenes/loading.gif";
import "./Loading.css";

function Loading() {
	return (
		<img id="loading" src={loadingGIF} alt="Cargando ..." />
	);
}
export default Loading;
