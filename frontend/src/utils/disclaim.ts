export function disclaim() {
	if (
		new Date().toJSON().slice(0,10) === '2023-12-27'
		|| new Date().toJSON().slice(0,10) === '2023-12-28'
	) {
		setTimeout(function() {
			console.log({ message: "Maj: Les déplacements des blocs ont été améliorés" });
			console.log({ message: "D'éventuels bugs ou changements peuvent encore survenir" });
			console.log({ message: "Merci ❤️" });
		});
	}
}
