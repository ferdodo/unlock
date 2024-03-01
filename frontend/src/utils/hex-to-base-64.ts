export function hexToBase64(hexString: string): string {
	let base64 = "";

	for (let i = 0; i < hexString.length; i++) {
		base64 += !(i - 1 & 1) ? String.fromCharCode(parseInt(hexString.substring(i - 1, i + 1), 16)) : ""
	}

    return btoa(base64);
}

