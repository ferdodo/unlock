export function hexToBase64(hexString: string): string {
	let base64 = "";

	for (let i = 1; i < hexString.length + 1; i += 2) {
		base64 += String.fromCharCode(parseInt(hexString.substring(i - 1, i + 1), 16));
	}

	return btoa(base64);
}
