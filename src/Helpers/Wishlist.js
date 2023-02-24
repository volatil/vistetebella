const keyStorage = "vistetebella_wishlist";

export function getWishlist() {
	const existeDB = Boolean( localStorage.getItem( keyStorage ) );
	if ( existeDB ) {
		const DB = localStorage.getItem( keyStorage );
		return DB;
	}
	localStorage.setItem( keyStorage, false);
	const DB = localStorage.getItem( keyStorage );
	return DB;
}

export function AgregaQuita( id ) {
	const losid = getWishlist();

	if ( String(losid) === "false" ) {
		const listaid = [id];
		localStorage.setItem( keyStorage, `[${listaid}]` );
	} else if ( losid.includes( Number(id) ) ) {
		if ( JSON.parse(losid).length === 1 ) {
			localStorage.setItem( keyStorage, false );
		} else {
			const lalistaid = JSON.parse( getWishlist() );
			for ( let i = 0; i < lalistaid.length; i++ ) {
				if ( lalistaid[i] === Number(id) ) {
					lalistaid.splice(i, 1);
				}
			}
			localStorage.setItem( keyStorage, `[${lalistaid}]` );
		}
	} else {
		let listaid = JSON.parse( getWishlist() );
		listaid.push( Number( id ) );
		listaid = [...new Set(listaid)];
		localStorage.setItem( keyStorage, `[${listaid}]` );
	}
}
