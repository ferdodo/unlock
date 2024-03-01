function getBox(width: number, height: number) {
    return {
        string: "+",
        style: "font-size: 1px; padding: " + Math.floor(height/2) + "px " + Math.floor(width/2) + "px; line-height: " + height + "px;"
    };
}



export function logBase64PngImage(hexstring: string): void {
	const base64 = hexToBase64(hexstring);
    const url = `data:image/png;base64,${base64}`;
    const scale = 0.5;
    var img = new Image();
    const width = 96;
    const height = 96;

    img.onload = function() {
        var dim = getBox(width * scale, height * scale);
        console.log("%c" + dim.string, dim.style + "background: url(" + url + "); background-size: " + (width * scale) + "px " + (height * scale) + "px; color: transparent;");
    };

    img.src = url;

}

function hexToBase64(hexstring: string) {
    let hex = hexstring.toString();
    let bytes = [];
    for (let i = 0; i < hex.length - 1; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    let base64 = btoa(String.fromCharCode.apply(String, bytes));
    return base64;
}
