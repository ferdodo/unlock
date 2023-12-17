import { enqueueSnackbar } from "cookies-ds";

export function disclaim() {
	if (
		new Date().toJSON().slice(0,10) === '2023-12-02'
		|| new Date().toJSON().slice(0,10) === '2023-12-03'
		|| new Date().toJSON().slice(0,10) === '2023-12-04'
		|| new Date().toJSON().slice(0,10) === '2023-12-05'
	) {
		setTimeout(function() {
			enqueueSnackbar({ message: "Maintenance temporaire" });
			enqueueSnackbar({ message: "le puzzle peut temporairement changer plusieurs fois par jour" });
			enqueueSnackbar({ message: "Le chargement de la page sera plus rapide :)" });
			enqueueSnackbar({ message: "La difficulte augmente un peu" });
			enqueueSnackbar({ message: "Il peut y avoir des dysfonctionnements imprevus xD" });
			enqueueSnackbar({ message: "Merci ❤️" });
		});
	}
}
