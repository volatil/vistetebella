import { useEffect, useState } from "react";

function Resultado() {
	return (
		<>
			<p>Data:</p>
			<ul>
				<li>1</li>
				<li>2</li>
			</ul>
		</>
	);
}

function Cerebro() {
	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "49b818a040mshf7bff155e7eed08p15e822jsnb5e060191afe",
				"X-RapidAPI-Host": "unofficial-shein.p.rapidapi.com",
			},
		};

		fetch("https://unofficial-shein.p.rapidapi.com/products/detail?goods_id=972598&language=es&country=CL&currency=CLP", options)
			.then((response) => response.json())
			.then((response) => {
				console.debug(response);
			});
	}, []);

	return (
		<>
			<h1>CEREBRO</h1>
			<section id="cerebro">
				<Resultado />
			</section>
		</>
	);
}
export default Cerebro;
