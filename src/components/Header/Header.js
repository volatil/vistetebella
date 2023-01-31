import Logo from "../Logo/Logo";
import Buscador from "../Buscador/Buscador";
import Menu from "../Menu/Menu";

import "./Header.css";

function Header() {
	return (
		<header>
			<Logo />
			<Buscador />
			<Menu />
		</header>
	)
}
export default Header;