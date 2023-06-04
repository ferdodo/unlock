
export function boxIncludes(
	aX: number,
	aY: number,
	aW: number,
	aH: number,
	bX: number,
	bY: number,
	bW: number,
	bH: number
) {
	return aX <= bX
		&& aY <= bY
		&& (aX + aW) >= (bX + bW)
		&& (aY + aH) >= (bY + bH);
}
