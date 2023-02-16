export function getWishlist() {
	const existeDB = Boolean( localStorage.getItem("vistetebella") );
	if ( existeDB ) {
		const DB = localStorage.getItem("vistetebella");
		return DB;
	}
	localStorage.setItem("vistetebella", false);
	const DB = localStorage.getItem("vistetebella");
	return DB;
}

export function AgregaQuita( id ) {
	const losid = getWishlist();

	if ( String(losid) === "false" ) {
		const listaid = [id];
		localStorage.setItem( "vistetebella", `[${listaid}]` );
	} else if ( losid.includes( Number(id) ) ) {
		if ( JSON.parse(losid).length === 1 ) {
			localStorage.setItem( "vistetebella", false );
		} else {
			const lalistaid = JSON.parse( getWishlist() );
			for ( let i = 0; i < lalistaid.length; i++ ) {
				if ( lalistaid[i] === Number(id) ) {
					lalistaid.splice(i, 1);
				}
			}
			localStorage.setItem( "vistetebella", `[${lalistaid}]` );
		}
	} else {
		let listaid = JSON.parse( getWishlist() );
		listaid.push( Number( id ) );
		listaid = [...new Set(listaid)];
		localStorage.setItem( "vistetebella", `[${listaid}]` );
	}
}
