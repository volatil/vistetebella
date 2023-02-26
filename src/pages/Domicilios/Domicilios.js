import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import $ from "jquery";

import Button from "../../components/Button/Button";
import domicilios from "../../assets/svg/domicilios.svg";

import { NOMBRETIENDA } from "../../Helpers/Const";
import { nomeabandones } from "../../Helpers/Helpers";

import work from "../../assets/svg/work.svg";
import house from "../../assets/svg/house.svg";
import menupuntos from "../../assets/svg/menu_puntos.svg";

import "./Domicilios.css";

const regiones = ["Antofagasta", "Arica y Parinacota", "Atacama", "Aysén", "Biobío", "Coquimbo", "La Araucanía", "Libertador B. O'Higgins", "Los Lagos", "Los Ríos", "Magallanes", "Maule", "Ñuble", "Metropolitana", "Tarapacá", "Valparaíso"];
const comunas = {
	Antofagasta: ["Antofagasta", "Calama", "Codelco Radomiro Tomic", "Maria Elena", "Mejillones", "Ollague", "San Pedro De Atacama", "Sierra Gorda", "Taltal", "Tocopilla"],
	"Arica y Parinacota": ["Arica", "Camarones", "General Lagos", "Putre"],
	Atacama: ["Alto Del Carmen", "Caldera", "Chañaral", "Copiapo", "Diego De Almagro", "El Salvador", "Estacion Paipote", "Freirina", "Fuerte Baquedano", "Huasco", "Paipote", "Tierra Amarilla", "Vallenar"],
	Aysén: ["Aysén", "Balmaceda", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "La Junta", "Lago Verde", "O'Higgins", "Puerto Aguirre", "Puerto Aysen", "Puerto Chacabuco", "Puerto Cisnes", "Puyuhuapi", "Río Ibánez", "Tortel", "Villa Manihuales"],
	Biobío: ["Alto Bíobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Cholguan", "Concepcion", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Huepil", "Laja", "Lebu", "Los Alamos", "Los Angeles", "Lota", "Mulchen", "Nacimiento", "Negrete", "Nueva Aldea", "Penco", "Pueblo Seco", "Quilaco", "Quilleco", "Quiriquina", "San Pedro De La Paz", "San Rosendo", "Santa Barbara", "Santa Juana", "Talcahuano", "Tirua", "Tome", "Tucapel", "Yumbel"],
	Coquimbo: ["Andacollo", "Canela", "Combarbala", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"],
	"La Araucanía": ["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautin", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Mininco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquen", "Pucon", "Puren", "Quepe", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguen", "Victoria", "Vilcún", "Villarrica"],
	"Libertador B. O'Higgins": ["Bucalemu", "Chepica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lo Miranda", "Lolol", "Machali", "Malloa", "Marchigue", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Pelequen", "Peralillo", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta De Tilcoco", "Rancagua", "Rengo", "Requinoa", "Rosario", "San Fernando", "San Francisco De Mostazal", "San Vicente", "Santa Amelia", "Santa Cruz"],
	"Los Lagos": ["Achao", "Ancud", "Calbuco", "Castro", "Chaiten", "Chonchi", "Cochamo", "Curaco De Velez", "Dalcahue", "Entre Lagos", "Fresia", "Frutillar", "Futaleufu", "Hornopiren", "Hualaihué", "Lago Ranco", "Llanquihue", "Los Muermos", "Maullin", "Osorno", "Palena", "Pargua", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldon", "Purranque", "Puyehue", "Queilen", "Quellon", "Quemchi", "Quinchao", "Rio Negro", "San Juan de la Costa", "San Pablo"],
	"Los Ríos": ["Corral", "Futrono", "Isla Teja", "La Union", "Lago Ranco", "Lanco", "Los Lagos", "Mafil", "Mariquina", "Paillaco", "Panguipulli", "Rio Bueno", "San Jose de la Mariquina", "Valdivia"],
	Magallanes: ["Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera", "Puerto Williams", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres Del Paine"],
	Maule: ["Cauquenes", "Chanco", "Colbun", "Constitucion", "Cumpeo", "Curepto", "Curico", "Empedrado", "Hualañe", "Itahue", "Licanten", "Linares", "Longavi", "Lontue", "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Romeral", "Río Claro", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquen", "Villa Alegre", "Yerbas Buenas"],
	Ñuble: ["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay", "Ñiquén"],
	Metropolitana: ["Alhue", "Alto Jahuel", "Batuco", "Buin", "Calera De Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacavi", "El Bosque", "El Monte", "El Paico", "Estacion Central", "Huechuraba", "Independencia", "Isla De Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Longovilo", "Lonquen", "Macul", "Maipú", "Malloco", "Maria Pinto", "Melipilla", "Nos", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San Jose De Maipo", "San Jose De Melipilla", "San Miguel", "San Pedro", "San Pedro Quinta Region", "San Ramón", "Santiago Centro", "Talagante", "Til-Til", "Vitacura", "Ñuñoa"],
	Tarapacá: ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"],
	Valparaíso: ["Algarrobo", "Artificio", "Barrancas", "Cabildo", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Con-Con", "El Belloto", "El Melon", "El Quisco", "El Tabito", "El Tabo", "Hijuelas", "Isla De Pascua", "Isla Negra", "Juan Fernández", "La Calera", "La Cruz", "La Ligua", "Las Cruces", "Limache", "Llay-Llay", "Llo Lleo", "Los Andes", "Nogales", "Olmue", "Panquehue", "Papudo", "Penablanca", "Petorca", "Placilla Quinta Region", "Puchuncavi", "Putaendo", "Quillota", "Quilpue", "Quintero", "Renaca", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "San Francisco de Limache", "San Sebastian", "Santa Maria", "Santo Domingo", "Valparaiso", "Villa Alemana", "Viña Del Mar", "Zapallar"],
};

$("body").on("click", ".menupuntitos > ul > li", function () {
	const texto = $(this).text();
	if ( texto === "eliminar" ) {
		const posicion = $(this).parent().parent().parent()
			.attr("data-posicion");
		const todaslasdirecciones = JSON.parse(localStorage.getItem("vistetebella_domicilio"));
		todaslasdirecciones.splice(Number(posicion), 1);
		localStorage.setItem("vistetebella_domicilio", JSON.stringify(todaslasdirecciones));
		$(`.datosdomicilio > div[data-posicion=${posicion}]`).hide();
	}
});

function EDITARdireccion() {
	let losdomicilios = localStorage.getItem("vistetebella_domicilio");
	losdomicilios = JSON.parse(losdomicilios);

	// Despliega los puntitos para editar o eliminar
	$("body").on("click", ".menupuntitos", function () {
		$(this).find("ul").toggle();
		console.debug("Desplegando puntitos");
	});

	return (
		<div className="bloqueDireccion editardireccion">
			<div className="titulo">
				<h6>Elige dónde recibir tus compras</h6>
				<p>Podrás ver costos y tiempos de entrega precisos en todo lo que busques.</p>
			</div>
			<div className="datosdomicilio">
				{
					losdomicilios?.map((eldomi, numero) => {
						return (
							<div data-posicion={numero} key={eldomi.referencia}>
								<p className="titulo">
									<img src={eldomi.casatrabajo === "casa" ? house : work} alt={eldomi.casatrabajo} />
									<strong>{eldomi.calle} {eldomi.numero}, {eldomi.referencia}</strong>
								</p>
								<p>{eldomi.region}, {eldomi.comuna}</p>
								<p>{eldomi.nombre} {eldomi.apellido} - {eldomi.telefono}</p>
								<div className="menupuntitos">
									<img src={menupuntos} alt="mini menu" />
									<ul>
										{/* <li className="editar">editar</li> */}
										<li className="eliminar">eliminar</li>
									</ul>
								</div>
							</div>
						);
					})
				}
			</div>
		</div>
	);
}

function AGREGARdireccion({ children, todaslascomunas }) {
	const campoDisable = !todaslascomunas;

	// Click en el texto del text=radio
	$(".doblecampo.casatrabajo > div > div p").on("click", function () {
		$(this).prev().click();
	});

	// TEXTAREA con maximo de texto
	$(".referencia textarea").on("keyup", function () {
		const cantidadLetras = $(this).val().length;
		$(".referencia > span").html(`${cantidadLetras}/128`);
	});

	return (
		<div className="bloqueDireccion agregardireccion">
			<div className="titulo">
				<h6>Agregar Domicilio</h6>
				<p>Podrás ver costos y tiempos de entrega precisos en todo lo que busques.</p>
			</div>
			<div className="datosdomicilio">
				<div className="nombre">
					<p className="label">nombre y apellido</p>
					<input className="input_nombre" type="text" />
					<span className="descripcion">tal cual figure en la cédula de identidad.</span>
				</div>
				<div className="doblecampo">
					<div>
						<p className="label">región</p>
						<select className="select_region">
							{
								regiones.map((region, index) => {
									if ( index === 0 ) {
										return (
											<option data-posicion={index} key={region} value="">Elige una Región</option>
										);
									}
									return (
										<option data-posicion={index} key={region} value={region}>{region}</option>
									);
								})
							}
						</select>
					</div>
					<div>
						<p className="label">comuna</p>
						<select disabled={campoDisable} className="select_comuna">
							{
								todaslascomunas?.map((com) => {
									return (
										<option key={com} value={com}>{com}</option>
									);
								})
							}
						</select>
					</div>
				</div>
				<div className="doblecampo">
					<div>
						<p className="label">calle</p>
						<input className="input_calle" type="text" />
						<span className="descripcion">escribe solo el nombre de la calle o avenida</span>
					</div>
					<div>
						<p className="label">número</p>
						<input className="input_numero" type="number" />
					</div>
				</div>
				<div className="doblecampo casatrabajo">
					<p>¿es casa o trabajo?</p>
					<div>
						<div>
							<input className="trabajo" type="radio" name="casatrabajo" />
							<p><img src={work} alt="trabajo" />trabajo</p>
						</div>
						<div>
							<input className="casa" type="radio" name="casatrabajo" />
							<p><img src={house} alt="casa" />casa</p>
						</div>
					</div>
				</div>
				<div className="telefono">
					<p className="label">teléfono de contacto</p>
					<input className="input_telefono" type="tel" />
				</div>
				<div className="referencia">
					<p className="label">referencias adicionales de esta dirección</p>
					<textarea className="textarea_referencia" maxLength="128" type="text" placeholder="Piso o departamento, descripción de la fachada, puntos de referencia, indicaciones de seguridad, etc." />
					<span>0/128</span>
				</div>
				{children}
			</div>
		</div>
	);
}

function Domicilios() {
	const [estadoboton, setestadoboton] = useState("disabled");
	const [isdireccion, setisdireccion] = useState();
	const [lascomunas, setlascomunas] = useState();

	useEffect(() => {
		$("body").on("change", "select.select_region", function () {
			const region = $(this).val();
			setlascomunas(comunas[region]);
		});

		// Verifica si hay domicilio en el localStorage
		if ( localStorage.getItem("vistetebella_domicilio") ) {
			setisdireccion(true);
		} else {
			setisdireccion(false);
		}

		// Agrega direccion al localStorage
		$("body").on("click", ".agregardireccion #elboton.primario", () => {
			const domicilioNuevo = {
				nombre: $("input.input_nombre").val(),
				region: $("select.select_region").val(),
				comuna: $("select.select_comuna").val(),
				calle: $("input.input_calle").val(),
				numero: $("input.input_numero").val(),
				casatrabajo: $("#domicilios .agregardireccion .datosdomicilio .doblecampo.casatrabajo > div input:checked").attr("class"),
				telefono: $("input.input_telefono").val(),
				referencia: $("textarea.textarea_referencia").val(),
			};

			if ( localStorage.getItem("vistetebella_domicilio") ) {
				const domicilioAnterior = JSON.parse(localStorage.getItem("vistetebella_domicilio"));
				domicilioAnterior.push( domicilioNuevo );
				localStorage.setItem("vistetebella_domicilio", JSON.stringify(domicilioAnterior));
				setisdireccion(true);
			} else {
				localStorage.setItem("vistetebella_domicilio", JSON.stringify([domicilioNuevo]));
				setisdireccion(true);
			}
		});

		// Despliega el agregar domicilio para AGREGAR OTRO MAS
		$("body").on("click", "#elboton.agregar", () => {
			setisdireccion(false);
		});

		$("body").on("change", ".datosdomicilio", () => {
			const domicilioNuevo = {
				nombre: $("input.input_nombre").val(),
				region: $("select.select_region").val(),
				comuna: $("select.select_comuna").val(),
				calle: $("input.input_calle").val(),
				numero: $("input.input_numero").val(),
				casatrabajo: $("#domicilios .agregardireccion .datosdomicilio .doblecampo.casatrabajo > div input:checked").attr("class"),
				telefono: $("input.input_telefono").val(),
				referencia: $("textarea.textarea_referencia").val(),
			};

			if (
				domicilioNuevo.nombre
				&& domicilioNuevo.region
				&& domicilioNuevo.comuna
				&& domicilioNuevo.calle
				&& domicilioNuevo.numero
				&& domicilioNuevo.casatrabajo
				&& domicilioNuevo.telefono
			) {
				setestadoboton("primario");
			} else {
				setestadoboton("disabled");
			}
		});
	}, []);

	return (
		<>
			<Helmet>
				<title>Domicilios || {NOMBRETIENDA}</title>
				{ nomeabandones( `Domicilios || ${NOMBRETIENDA}` ) }
			</Helmet>
			<div id="domicilios">
				<div className="titulosuperior">
					<img src={domicilios} alt="Direcciones de Envio" />
					<h2>Domicilios</h2>
				</div>
				{
					isdireccion
						? (
							<>
								<EDITARdireccion />
								<Button estado="primario agregar" texto="Agregar Domicilio" estilo="marginTop: 10px" />
							</>
						)
						: (
							<AGREGARdireccion todaslascomunas={lascomunas}>
								<Button estado={estadoboton} texto="Aceptar" />
							</AGREGARdireccion>
						)
				}
			</div>
		</>
	);
}
export default Domicilios;
