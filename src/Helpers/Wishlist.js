export function getWishlist() {
	const existeDB = Boolean( localStorage.getItem("vistetebella") );
	if ( existeDB ) {
		const DB = localStorage.getItem("vistetebella");
		return DB;
	}
	localStorage.setItem("vistetebella", false);
	const DB = localStorage.getItem("vistetebella");
	console.debug( DB );
	return DB;
}

export function nada() {}
