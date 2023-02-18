import "./Button.css";

function Button({ texto, estado }) {
	return (
		<div className={`elboton ${estado}`}>
			<p>{texto}</p>
		</div>
	);
}
export default Button;
