export function getDB() {
	const existeDB = Boolean( localStorage.getItem("vistetebella") );
	if ( existeDB ) {
		const DB = localStorage.getItem("vistetebella");
		return DB;
	}
	localStorage.setItem("vistetebella", "");
	const DB = localStorage.getItem("vistetebella");
	return DB;
}

export function nada() {}
