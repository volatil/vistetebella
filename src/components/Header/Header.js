import Logo from "../Logo/Logo";
import Buscador from "../Buscador/Buscador";
import Menu from "../Menu/Menu";

import { isMobile } from "../../Helpers/Helpers";

import "./Header.css";

function Header() {
	return (
		<header>
			{
				isMobile()
					? (<><div><Logo /><Menu /></div> <Buscador /></>)
					: (<><Logo /><Buscador /> <Menu /> </>)
			}
		</header>
	);
}
export default Header;
