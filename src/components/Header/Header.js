import Logo from "../Logo/Logo";
import DireccionesEnvio from "../DIreccionesEnvio/DireccionesEnvio";
import Buscador from "../Buscador/Buscador";
import Menu from "../Menu/Menu";

import { isMobile } from "../../Helpers/Helpers";

import "./Header.css";

function Header() {
	return (
		<header>
			{
				isMobile()
					? (
						<>
							<div>
								<Logo />
								<Menu />
							</div>
							<Buscador />
						</>
					)
					: (
						<>
							<Logo />
							<DireccionesEnvio />
							<Buscador />
							<Menu />
						</>
					)
			}
		</header>
	);
}
export default Header;
