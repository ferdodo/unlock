import { enqueueSnackbar } from "cookies-ds";

export function disclaim() {
	if (
		new Date().toJSON().slice(0,10) === '2023-12-27'
		|| new Date().toJSON().slice(0,10) === '2023-12-28'
	) {
		setTimeout(function() {
			enqueueSnackbar({ message: "Maj: Les déplacements des blocs ont été améliorés" });
			enqueueSnackbar({ message: "D'éventuels bugs ou changements peuvent encore survenir" });
			enqueueSnackbar({ message: "Merci ❤️" });
		});
	}
}
