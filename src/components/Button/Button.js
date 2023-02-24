import "./Button.css";

function Button({ texto, estado }) {
	return (
		<div id="elboton" className={estado}>
			<p>{texto}</p>
		</div>
	);
}
export default Button;
