export function testConsole( nombre ) {
	console.debug( `Hola ${nombre}!` );
	console.debug( `Holaaa ${nombre}!` );
	// return (<div>HOLA {nombre}</div>);
}

export function despedir( nombre ) {
	console.debug( `Chao ${nombre}` );
}

export function armonizarURL( param ) {
	console.debug( `Param: ${param}` );
	let fixurl = location.pathname.split("/")[3];
	fixurl = decodeURIComponent(fixurl);
	fixurl = fixurl.replaceAll(" ", "-");
	fixurl = fixurl.toLowerCase();
	window.history.pushState(null, null, fixurl);
}
