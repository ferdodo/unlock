export function scorelessShare() {
	const date = new Date();
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const formattedDate = `${year}/${month}/${day}`;
	let text = `Unlock ${formattedDate}`;
	text += `\n\nPuzzle réussi.`
	text += `\n\nhttps://ferdodo.github.io/unlock`;
	navigator.clipboard.writeText(text);
}
